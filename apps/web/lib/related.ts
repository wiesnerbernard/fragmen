/**
 * Find related utilities based on tags, category, and functionality
 */
export function findRelatedUtilities(
  currentItem: { category: string; name: string; tags: string[] },
  allItems: Array<{ category: string; name: string; slug: string; tags: string[]; description: string }>,
  limit = 6
): Array<{ category: string; name: string; slug: string; tags: string[]; description: string; score: number }> {
  return allItems
    .filter(item => item.slug !== `${currentItem.category}/${currentItem.name}`)
    .map(item => {
      let score = 0;
      
      // Same category gets points
      if (item.category === currentItem.category) {
        score += 3;
      }
      
      // Shared tags get points
      const sharedTags = item.tags.filter(tag => currentItem.tags.includes(tag));
      score += sharedTags.length * 2;
      
      // Name similarity (simple heuristic)
      if (item.name.includes(currentItem.name) || currentItem.name.includes(item.name)) {
        score += 1;
      }
      
      return { ...item, score };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}
