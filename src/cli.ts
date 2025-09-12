#!/usr/bin/env node

import chalk from 'chalk';
import { spawn } from 'child_process';
import { Command } from 'commander';
import fs from 'fs-extra';
import { createRequire } from 'module';
import path from 'path';
import prompts from 'prompts';
import { fileURLToPath } from 'url';

const program = new Command();

// ESM-compatible require for JSON imports at runtime
const require = createRequire(import.meta.url);
const packageJson = require('../package.json') as { version: string };
const packageVersion = packageJson.version;

// Configuration file name
const CONFIG_FILE = 'fragmen.json';

// Schema versioning - update this when you make breaking changes
const SCHEMA_VERSION = 'main'; // or 'main' for latest
const SCHEMA_URL = `https://cdn.jsdelivr.net/gh/wiesnerbernard/fragmen@${SCHEMA_VERSION}/fragmen.schema.json`;

const capybaraArt = `
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣠⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣸⣝⣧⣀⣠⡶⢿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⢀⣀⣠⠤⠤⠖⠚⠛⠉⢙⠁⠈⢈⠟⢽⢿⣄⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⣴⠋⣍⣠⡄⠀⠀⠀⠶⠶⣿⡷⡆⠘⠀⠈⠀⠉⠻⢦⣀⠀⠀⠀⠀⠀⠀⠀⣀⣀⣀⣀⣤⣤⠦⠦⠦⠤⠤⢤⣤⣤⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⢰⠇⠀⢸⠋⠀⠀⠀⠀⠀⠀⠈⠁⠀⠀⠀⠀⠀⠀⠀⠀⠙⠓⠲⠤⠴⠖⠒⠛⠉⠉⢉⡀⠀⠀⠙⢧⡤⡄⠀⢲⡖⠀⠈⠉⠛⠲⢦⣀⠀⠀⠀⠀⠀⠀
⢸⠀⠀⢸⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⠉⠡⠤⠀⠀⠰⠾⠧⠀⠀⠿⠦⠉⠉⠀⠶⢭⡉⠃⠀⣉⠳⣤⡀⠀⠀⠀
⠸⣆⢠⡾⢦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡘⠇⢠⣄⠀⠦⣌⠛⠂⠻⣆⠀⠀
⠀⠹⣦⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣇⠀⢠⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⠁⠀⠈⣹⠀⠀⡀⠐⣄⠙⣧⡀
⠀⠀⠀⠉⠙⠒⠒⠒⠒⠒⠶⣦⣀⡽⠆⠀⢳⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⢲⠀⠙⠦⠈⠀⢹⡇
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠻⣞⢧⠐⢷⠀⢰⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢦⡀⠈⢳⠀⣿
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⢯⢇⡀⠃⠈⢳⠀⢳⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠃⠀⡈⠀⣻
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢳⡝⠶⢦⡀⣆⠀⠛⠀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠠⠇⢀⡟
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⢦⡠⣄⠙⠀⠸⠄⢻⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⡤⠀⠀⠀⠀⠀⠀⠀⠀⣠⠆⠀⡼⠃
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢳⣌⠠⣄⠰⡆⢸⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⠏⣾⡽⡀⠀⠀⠀⠀⢠⡴⠊⠉⢠⡾⠁⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣄⡈⡀⠀⣾⣥⣤⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡏⣠⠈⢡⡇⠀⠀⡀⠀⠘⠞⣠⡴⠋⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠨⣧⠃⠑⠀⣷⡏⠉⠈⠉⠉⠉⠉⠉⠉⠉⠉⠉⠉⢳⠿⢢⡈⣇⠀⢸⣿⣧⣦⠾⣿⠉⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⠦⠰⢾⢻⡇⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢧⠈⠣⠸⠄⣴⢿⠋⠁⠀⠻⣦⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣸⡀⡆⠸⢸⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢳⡆⢀⣀⡈⢫⣷⠀⢀⣴⠟⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣠⡤⠞⠉⠃⢠⣧⡾⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣾⣧⠎⠉⡽⢋⠏⠀⣼⠏⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣽⡿⣭⣿⣏⡴⠞⠋⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣠⡴⣶⡞⠋⢩⣏⣴⠯⠴⠋⠀⣰⠋⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⠻⠿⠿⣺⡧⠶⠚⠉⠙⠓⠒⠒⠚⠁⠀⠀⠀⠀⠀⠀⠀
`;

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
  .description('Add high-quality utility functions to your project.')
  .version(packageVersion, '-v, --version', 'output the version number');

program
  .command('init')
  .description('Initialize fragmen configuration')
  .action(async () => {
    console.log(chalk.cyan(capybaraArt));
    console.log("\nWelcome to Fragmen! Let's set up your configuration.\n");

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
      console.log(`\n ${chalk.red('Configuration cancelled.')}`);
      process.exit(1);
    }

    const configPath = path.join(process.cwd(), CONFIG_FILE);
    const configWithSchema = {
      $schema: SCHEMA_URL,
      ...response,
    };
    await fs.writeJson(configPath, configWithSchema, { spaces: 2 });

    console.log(`\n ${chalk.green('Configuration saved to')} ${CONFIG_FILE}`);
    console.log(
      `You can now use \`${chalk.cyan('fragmen add <utility>')}\` to add utilities to your project!`
    );
  });

program
  .command('add <slug>')
  .description('Add a new fragmen to your project')
  .action(async (slug: string) => {
    console.log(`Locating fragmen: ${slug}...`);

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
      console.error(chalk.red(`Fragmen "${slug}" not found.`));
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

    console.log(
      `Fragmen ${chalk.cyan(`"${slug}"`)} added to ${chalk.magenta(destPath)}`
    );
  });

// Release command: bump version and optionally push and publish
interface ReleaseOptions {
  push: boolean;
  publish: boolean;
  dryRun: boolean;
  tag?: string;
}

async function runCommand(command: string, args: string[], dryRun: boolean) {
  if (dryRun) {
    console.log(`$ ${command} ${args.join(' ')}`);
    return;
  }
  await new Promise<void>((resolve, reject) => {
    const child = spawn(command, args, { stdio: 'inherit' });
    child.on('close', code => {
      if (code === 0) {
        resolve();
      } else {
        reject(
          new Error(`${command} ${args.join(' ')} exited with code ${code}`)
        );
      }
    });
  });
}

program
  .command('release [type]')
  .description('Bump version and publish to npm (default: patch)')
  .option('--no-push', 'Skip pushing commit and tags')
  .option('--no-publish', 'Skip npm publish')
  .option('-d, --dry-run', 'Show commands without executing')
  .option('-t, --tag <distTag>', 'Publish under given npm dist-tag (e.g. next)')
  .action(async (type = 'patch', options: ReleaseOptions) => {
    const validTypes = [
      'patch',
      'minor',
      'major',
      'prepatch',
      'preminor',
      'premajor',
      'prerelease',
    ];

    if (!validTypes.includes(type)) {
      console.error(
        chalk.red(
          `Invalid release type "${type}". Use one of: ${validTypes.join(', ')}`
        )
      );
      process.exit(1);
    }

    const dryRun = Boolean(options.dryRun);
    const shouldPush = options.push !== false; // --no-push sets push to false
    const shouldPublish = options.publish !== false; // --no-publish sets publish to false

    // 1) npm version <type>
    await runCommand('npm', ['version', type, '-m', 'release: %s'], dryRun);

    // 2) git push && git push --tags (unless skipped)
    if (shouldPush) {
      await runCommand('git', ['push'], dryRun);
      await runCommand('git', ['push', '--tags'], dryRun);
    }

    // 3) npm publish (unless skipped)
    if (shouldPublish) {
      const publishArgs = ['publish'];
      if (options.tag) {
        publishArgs.push('--tag', options.tag);
      }
      if (dryRun) {
        publishArgs.push('--dry-run');
      }
      await runCommand('npm', publishArgs, dryRun);
    }

    if (dryRun) {
      console.log(chalk.green('Dry run complete. No changes were made.'));
    }
  });

program.parse(process.argv);
