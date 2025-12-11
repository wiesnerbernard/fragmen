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
// When running from dist/src/cli.js, this resolves to dist/package.json if we use '../package.json'.
// To ensure we read the root package.json in both src and dist, use '../../package.json' here and adjust bin to dist/src/cli.js
const packageJson = require('../../package.json') as { version: string };
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

    console.log(chalk.green('\n✓ Configuration saved!'));
    console.log(chalk.gray(`Created ${CONFIG_FILE}\n`));
    console.log(chalk.bold('Next steps:'));
    console.log(
      chalk.gray('  1. Run'),
      chalk.cyan('fragmen list'),
      chalk.gray('to see available utilities')
    );
    console.log(
      chalk.gray('  2. Run'),
      chalk.cyan('fragmen add <category/utility-name>'),
      chalk.gray('to add a utility')
    );
    console.log(
      chalk.gray('\nExample:'),
      chalk.cyan('fragmen add promise/delay'),
      chalk.gray('\n')
    );
  });

program
  .command('add <category/utility-name>')
  .description(
    'Add a utility to your project (e.g., promise/delay, string/capitalize)'
  )
  .action(async (slug: string) => {
    console.log(`Locating utility: ${slug}...`);

    // Validate format
    if (!slug.includes('/')) {
      console.error(chalk.red('\nError: Utility name must include category.'));
      console.log(chalk.yellow('\nFormat: category/utility-name'));
      console.log(chalk.gray('Examples:'));
      console.log(chalk.gray('  • fragmen add promise/delay'));
      console.log(chalk.gray('  • fragmen add string/capitalize'));
      console.log(chalk.gray('  • fragmen add array/chunk'));
      console.log(
        chalk.cyan('\nTip: Run "fragmen list" to see all available utilities\n')
      );
      process.exit(1);
    }

    // Load configuration
    const config = await loadConfig();

    // Find the fragmen in your registry
    // Use ESM-compatible __dirname
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const sourcePath = path.join(
      __dirname,
      '..',
      '..',
      'registry',
      ...slug.split('/'),
      'index.ts'
    );

    if (!(await fs.pathExists(sourcePath))) {
      console.error(chalk.red(`\nUtility "${slug}" not found.`));
      console.log(
        chalk.yellow('\nMake sure you use the format: category/utility-name')
      );
      console.log(
        chalk.cyan('\nRun "fragmen list" to see all available utilities\n')
      );
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

    console.log(chalk.green('\n✓ Success!'));
    console.log(`Added ${chalk.cyan(slug)} to ${chalk.magenta(destPath)}`);
    console.log(
      chalk.gray(
        `\nYou can now import it:\nimport { ... } from '@/lib/utils/${slug.replace('/', '-')}'\n`
      )
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
  .command('list [category]')
  .description('List all available utilities or filter by category')
  .action(async (categoryFilter?: string) => {
    try {
      // Get the directory where this CLI file is located (dist/src/cli.js)
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = path.dirname(__filename);
      const registryPath = path.join(__dirname, '../../registry');

      if (!fs.existsSync(registryPath)) {
        console.error(chalk.red('Registry not found'));
        process.exit(1);
      }

      const allCategories = fs
        .readdirSync(registryPath, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name)
        .sort();

      // Filter categories if a filter is provided
      let categories = allCategories;
      if (categoryFilter) {
        const matchingCategory = allCategories.find(
          cat => cat.toLowerCase() === categoryFilter.toLowerCase()
        );

        if (!matchingCategory) {
          console.error(chalk.red(`\nCategory "${categoryFilter}" not found.`));
          console.log(chalk.yellow('\nAvailable categories:'));
          allCategories.forEach(cat => console.log(chalk.gray(`  • ${cat}`)));
          console.log();
          process.exit(1);
        }

        categories = [matchingCategory];
        console.log(chalk.cyan.bold(`\n📦 ${matchingCategory} Utilities\n`));
      } else {
        console.log(chalk.cyan.bold('\n📦 Available Utilities\n'));
      }

      let totalCount = 0;

      for (const category of categories) {
        const categoryPath = path.join(registryPath, category);
        const utilities = fs
          .readdirSync(categoryPath, { withFileTypes: true })
          .filter(dirent => dirent.isDirectory())
          .map(dirent => dirent.name)
          .sort();

        totalCount += utilities.length;

        console.log(chalk.yellow.bold(`${category}/ (${utilities.length})`));
        for (const utility of utilities) {
          console.log(chalk.gray(`  • ${category}/${utility}`));
        }
        console.log();
      }

      if (!categoryFilter) {
        console.log(chalk.green(`Total: ${totalCount} utilities`));
        console.log(
          chalk.gray('\nFilter by category:'),
          chalk.cyan('fragmen list <category>')
        );
        console.log(
          chalk.gray('Example:'),
          chalk.cyan('fragmen list promise'),
          chalk.gray('or'),
          chalk.cyan('fragmen list string')
        );
      } else {
        console.log(
          chalk.green(`${totalCount} utilities in ${categoryFilter}`)
        );
      }

      console.log(
        chalk.gray('\nTo add a utility, use:'),
        chalk.cyan('fragmen add <category/utility-name>')
      );
      console.log(
        chalk.gray('Example:'),
        chalk.cyan('fragmen add promise/delay'),
        chalk.gray('\n')
      );
    } catch (error) {
      console.error(
        chalk.red(
          `Failed to list utilities: ${error instanceof Error ? error.message : String(error)}`
        )
      );
      process.exit(1);
    }
  });

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
