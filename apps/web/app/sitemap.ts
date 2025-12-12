import { getAllRegistryItems, getCategories } from '@/lib/registry';

export default async function sitemap() {
  const baseUrl = 'https://fragmen.vercel.app';
  const categories = getCategories();
  const items = getAllRegistryItems();

  // Static pages
  const routes = [
    '',
    '/utilities',
    '/favorites',
    '/docs',
    '/changelog',
    '/requests',
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Category pages
  const categoryRoutes = categories.map(category => ({
    url: `${baseUrl}/utilities/${category}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Utility pages
  const utilityRoutes = items.map(item => ({
    url: `${baseUrl}/utilities/${item.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  return [...routes, ...categoryRoutes, ...utilityRoutes];
}
