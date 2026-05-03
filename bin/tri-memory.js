#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");

const packageJson = require("../package.json");

const AGENTS_FILE = "AGENTS.md";
const TRI_MEMORY_START = "<!-- tri-memory:start -->";
const TRI_MEMORY_END = "<!-- tri-memory:end -->";

const usage = `tri-memory ${packageJson.version}

Usage:
  tri-memory init [target-dir] [--chinese | --lang zh] [--force] [--dry-run]
  tri-memory --help
  tri-memory --version

Options:
  --chinese       Use Chinese templates.
  --lang <lang>   Template language: en or zh.
  --force         Overwrite existing non-AGENTS files.
  --dry-run       Show files that would be created without writing.
  --help          Show help.
  --version       Show version.
`;

function main() {
  const argv = process.argv.slice(2);

  if (argv.length === 0 || argv.includes("--help") || argv.includes("-h")) {
    console.log(usage);
    return;
  }

  if (argv.includes("--version") || argv.includes("-v")) {
    console.log(packageJson.version);
    return;
  }

  const command = argv.shift();

  if (command !== "init") {
    fail(`Unknown command: ${command}`);
  }

  init(parseInitArgs(argv));
}

function parseInitArgs(argv) {
  const options = {
    force: false,
    dryRun: false,
    lang: "en",
    targetDir: "."
  };

  const positional = [];

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];

    if (arg === "--force") {
      options.force = true;
      continue;
    }

    if (arg === "--dry-run") {
      options.dryRun = true;
      continue;
    }

    if (arg === "--chinese") {
      options.lang = "zh";
      continue;
    }

    if (arg === "--english") {
      options.lang = "en";
      continue;
    }

    if (arg === "--lang") {
      const value = argv[index + 1];
      if (!value) {
        fail("Missing value for --lang.");
      }
      options.lang = normalizeLang(value);
      index += 1;
      continue;
    }

    if (arg.startsWith("--lang=")) {
      options.lang = normalizeLang(arg.slice("--lang=".length));
      continue;
    }

    if (arg.startsWith("-")) {
      fail(`Unknown option: ${arg}`);
    }

    positional.push(arg);
  }

  if (positional.length > 1) {
    fail(`Expected at most one target directory, got: ${positional.join(", ")}`);
  }

  if (positional[0]) {
    options.targetDir = positional[0];
  }

  return options;
}

function normalizeLang(value) {
  const lang = String(value).toLowerCase();

  if (["en", "english"].includes(lang)) {
    return "en";
  }

  if (["zh", "cn", "chinese", "中文"].includes(lang)) {
    return "zh";
  }

  fail(`Unsupported language: ${value}. Use en or zh.`);
}

function init(options) {
  const templateRoot = path.join(__dirname, "..", "templates", options.lang);
  const targetRoot = path.resolve(process.cwd(), options.targetDir);

  if (!fs.existsSync(templateRoot)) {
    fail(`Template language not found: ${options.lang}`);
  }

  const files = collectFiles(templateRoot);
  const created = [];
  const skipped = [];
  const updated = [];
  const overwritten = [];

  for (const sourceFile of files) {
    const relativePath = path.relative(templateRoot, sourceFile);
    const targetFile = path.join(targetRoot, relativePath);
    const exists = fs.existsSync(targetFile);

    if (isAgentsFile(relativePath)) {
      const result = upsertAgentsFile({
        sourceFile,
        targetFile,
        exists,
        dryRun: options.dryRun
      });

      created.push(...result.created);
      updated.push(...result.updated);
      skipped.push(...result.skipped);
      continue;
    }

    if (exists && !options.force) {
      skipped.push(relativePath);
      continue;
    }

    if (options.dryRun) {
      (exists ? overwritten : created).push(relativePath);
      continue;
    }

    fs.mkdirSync(path.dirname(targetFile), { recursive: true });
    fs.copyFileSync(sourceFile, targetFile);
    (exists ? overwritten : created).push(relativePath);
  }

  printSummary({
    dryRun: options.dryRun,
    force: options.force,
    lang: options.lang,
    targetRoot,
    created,
    updated,
    overwritten,
    skipped
  });
}

function isAgentsFile(relativePath) {
  return toPosixPath(relativePath) === AGENTS_FILE;
}

function upsertAgentsFile({ sourceFile, targetFile, exists, dryRun }) {
  const relativePath = AGENTS_FILE;
  const templateContent = fs.readFileSync(sourceFile, "utf8");
  const result = {
    created: [],
    updated: [],
    skipped: []
  };

  if (!exists) {
    if (!dryRun) {
      fs.mkdirSync(path.dirname(targetFile), { recursive: true });
      fs.writeFileSync(targetFile, templateContent, "utf8");
    }
    result.created.push(relativePath);
    return result;
  }

  const currentContent = fs.readFileSync(targetFile, "utf8");
  const memoryBlock = extractTriMemoryBlock(templateContent);
  const nextContent = mergeTriMemoryBlock(currentContent, memoryBlock);

  if (currentContent === nextContent) {
    result.skipped.push(relativePath);
    return result;
  }

  if (!dryRun) {
    fs.writeFileSync(targetFile, nextContent, "utf8");
  }
  result.updated.push(relativePath);
  return result;
}

function extractTriMemoryBlock(content) {
  const startIndex = content.indexOf(TRI_MEMORY_START);
  const endIndex = content.indexOf(TRI_MEMORY_END);

  if (startIndex === -1 || endIndex === -1 || endIndex < startIndex) {
    fail(`Template ${AGENTS_FILE} must contain tri-memory markers.`);
  }

  return content.slice(startIndex, endIndex + TRI_MEMORY_END.length);
}

function mergeTriMemoryBlock(content, memoryBlock) {
  const lineEnding = content.includes("\r\n") ? "\r\n" : "\n";
  const normalizedBlock = memoryBlock.replace(/\r?\n/g, lineEnding);
  const startIndex = content.indexOf(TRI_MEMORY_START);
  const endIndex = content.indexOf(TRI_MEMORY_END);

  if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
    return (
      content.slice(0, startIndex) +
      normalizedBlock +
      content.slice(endIndex + TRI_MEMORY_END.length)
    );
  }

  const trimmedContent = content.replace(/[ \t\r\n]*$/, "");
  return `${trimmedContent}${lineEnding}${lineEnding}${normalizedBlock}${lineEnding}`;
}

function collectFiles(root) {
  const files = [];
  const entries = fs
    .readdirSync(root, { withFileTypes: true })
    .sort((left, right) => left.name.localeCompare(right.name));

  for (const entry of entries) {
    const entryPath = path.join(root, entry.name);

    if (entry.isDirectory()) {
      files.push(...collectFiles(entryPath));
      continue;
    }

    if (entry.isFile()) {
      files.push(entryPath);
    }
  }

  return files;
}

function printSummary(result) {
  const mode = result.dryRun ? "Dry run" : "Initialized";
  console.log(`${mode} tri-memory in ${result.targetRoot}`);
  console.log(`Language: ${result.lang === "zh" ? "Chinese" : "English"}`);

  printList("Created", result.created);
  printList("Updated", result.updated);
  printList("Overwritten", result.overwritten);
  printList("Skipped", result.skipped);

  if (result.skipped.length > 0 && !result.force) {
    console.log("");
    console.log("Use --force to overwrite skipped non-AGENTS files.");
  }
}

function printList(label, values) {
  if (values.length === 0) {
    return;
  }

  console.log("");
  console.log(`${label}:`);
  for (const value of values) {
    console.log(`  - ${toPosixPath(value)}`);
  }
}

function toPosixPath(value) {
  return value.split(path.sep).join("/");
}

function fail(message) {
  console.error(`tri-memory: ${message}`);
  console.error("");
  console.error(usage);
  process.exit(1);
}

main();
