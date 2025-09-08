#!/usr/bin/env node

import { Command } from 'commander';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import prompts from 'prompts';

const program = new Command();

// Configuration file name
const CONFIG_FILE = 'fragmen.json';

// Schema versioning - update this when you make breaking changes
const SCHEMA_VERSION = 'v1.0.0'; // or 'main' for latest
const SCHEMA_URL = `https://cdn.jsdelivr.net/gh/wiesnerbernard/fragmen@${SCHEMA_VERSION}/fragmen.schema.json`;

// Load configuration from fragmen.json or use defaults
async function loadConfig() {
  const configPath = path.join(process.cwd(), CONFIG_FILE);
  if (await fs.pathExists(configPath)) {
    return await fs.readJson(configPath);
  }
  return {
    $schema: SCHEMA_URL,
    baseDir: 'lib/utils',
    language: 'ts',
    moduleSystem: 'esm',
  };
}

program
  .name('fragmen')
  .description('Add high-quality utility functions to your project.');

program
  .command('init')
  .description('Initialize fragmen configuration')
  .action(async () => {
    console.log("🚀 Welcome to Fragmen! Let's set up your configuration.\n");

    const questions: prompts.PromptObject[] = [
      {
        type: 'text',
        name: 'baseDir',
        message: 'Where should utility functions be copied?',
        initial: 'lib/utils',
      },
      {
        type: 'select',
        name: 'language',
        message: 'Which language are you using?',
        choices: [
          { title: 'TypeScript', value: 'ts' },
          { title: 'JavaScript', value: 'js' },
        ],
        initial: 0,
      },
      {
        type: 'select',
        name: 'moduleSystem',
        message: 'Which module system?',
        choices: [
          { title: 'ESM (import/export)', value: 'esm' },
          { title: 'CommonJS (require/module.exports)', value: 'cjs' },
        ],
        initial: 0,
      },
    ];

    const response = await prompts(questions);

    // Check if user cancelled
    if (Object.keys(response).length !== questions.length) {
      console.log('\n❌ Configuration cancelled.');
      process.exit(1);
    }

    const configPath = path.join(process.cwd(), CONFIG_FILE);
    const configWithSchema = {
      $schema: SCHEMA_URL,
      ...response,
    };
    await fs.writeJson(configPath, configWithSchema, { spaces: 2 });

    console.log(`\n✅ Configuration saved to ${CONFIG_FILE}`);
    console.log(
      '🎉 You can now use `fragmen add <utility>` to add utilities to your project!'
    );
  });

program
  .command('add <slug>')
  .description('Add a new fragmen to your project')
  .action(async (slug: string) => {
    console.log(`🔎 Locating fragmen: ${slug}...`);

    // Load configuration
    const config = await loadConfig();

    // Find the fragmen in your registry
    // Use ESM-compatible __dirname
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const sourcePath = path.join(
      __dirname,
      '..',
      'registry',
      ...slug.split('/'),
      'index.ts'
    );

    if (!(await fs.pathExists(sourcePath))) {
      console.error(`❌ Fragmen "${slug}" not found.`);
      process.exit(1);
    }

    // Determine the destination using config
    const targetDir = path.resolve(process.cwd(), config.baseDir);
    const fileName = `${slug.replace(/\//g, '-')}.${config.language}`;
    const destPath = path.join(targetDir, fileName);

    // Ensure the destination directory exists
    await fs.ensureDir(path.dirname(destPath));

    // Copy the file
    await fs.copy(sourcePath, destPath);

    console.log(`✅ Fragmen "${slug}" added to ${destPath}`);
  });

program.parse(process.argv);
