import fs from 'fs';
import path from 'path';

const REGISTRY_PATH = path.join(process.cwd(), '../../registry');

export interface RegistryItem {
  category: string;
  name: string;
  slug: string;
  code: string;
  description: string;
  examples: string[];
  params: Array<{ name: string; type: string; description: string }>;
  returns: { type: string; description: string };
}

/**
 * Get all category names from the registry
 */
export function getCategories(): string[] {
  try {
    return fs
      .readdirSync(REGISTRY_PATH, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name)
      .sort();
  } catch {
    return [];
  }
}

/**
 * Get all utility names within a category
 */
export function getItemsByCategory(category: string): string[] {
  try {
    const categoryPath = path.join(REGISTRY_PATH, category);
    return fs
      .readdirSync(categoryPath, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name)
      .sort();
  } catch {
    return [];
  }
}

/**
 * Extract JSDoc information from TypeScript code
 */
function extractJSDoc(code: string): {
  description: string;
  examples: string[];
  params: Array<{ name: string; type: string; description: string }>;
  returns: { type: string; description: string };
} {
  const jsdocMatch = code.match(/\/\*\*([\s\S]*?)\*\//);
  if (!jsdocMatch) {
    return {
      description: '',
      examples: [],
      params: [],
      returns: { type: '', description: '' },
    };
  }

  const jsdoc = jsdocMatch[1];
  const lines = jsdoc.split('\n').map(line => line.replace(/^\s*\*\s?/, ''));

  let description = '';
  const examples: string[] = [];
  const params: Array<{ name: string; type: string; description: string }> = [];
  let returns = { type: '', description: '' };

  let inExample = false;
  let currentExample = '';

  for (const line of lines) {
    if (line.startsWith('@example')) {
      inExample = true;
      currentExample = '';
      continue;
    }

    if (line.startsWith('@param')) {
      inExample = false;
      if (currentExample) {
        examples.push(currentExample.trim());
        currentExample = '';
      }

      const paramMatch = line.match(/@param\s+(?:\{([^}]+)\}\s+)?(\w+)\s+(.+)/);
      if (paramMatch) {
        params.push({
          name: paramMatch[2],
          type: paramMatch[1] || 'any',
          description: paramMatch[3],
        });
      }
      continue;
    }

    if (line.startsWith('@returns') || line.startsWith('@return')) {
      inExample = false;
      if (currentExample) {
        examples.push(currentExample.trim());
        currentExample = '';
      }

      const returnsMatch = line.match(/@returns?\s+(?:\{([^}]+)\}\s+)?(.+)/);
      if (returnsMatch) {
        returns = {
          type: returnsMatch[1] || 'unknown',
          description: returnsMatch[2],
        };
      }
      continue;
    }

    if (inExample) {
      currentExample += line + '\n';
    } else if (!line.startsWith('@') && line.trim()) {
      if (!description) {
        description = line;
      } else {
        description += ' ' + line;
      }
    }
  }

  if (currentExample) {
    examples.push(currentExample.trim());
  }

  return { description: description.trim(), examples, params, returns };
}

/**
 * Get a specific registry item by category and name
 */
export function getRegistryItem(
  category: string,
  name: string
): RegistryItem | null {
  try {
    const itemPath = path.join(REGISTRY_PATH, category, name, 'index.ts');
    if (!fs.existsSync(itemPath)) {
      return null;
    }

    const code = fs.readFileSync(itemPath, 'utf-8');
    const { description, examples, params, returns } = extractJSDoc(code);

    return {
      category,
      name,
      slug: `${category}/${name}`,
      code,
      description,
      examples,
      params,
      returns,
    };
  } catch {
    return null;
  }
}

/**
 * Get all registry items across all categories
 */
export function getAllRegistryItems(): RegistryItem[] {
  const items: RegistryItem[] = [];
  const categories = getCategories();

  for (const category of categories) {
    const utilities = getItemsByCategory(category);
    for (const utility of utilities) {
      const item = getRegistryItem(category, utility);
      if (item) {
        items.push(item);
      }
    }
  }

  return items;
}
