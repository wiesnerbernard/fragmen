/**
 * Groups the elements of an array based on the result of a callback function.
 * @param array The array to group.
 * @param getKey Function to produce the key for grouping.
 * @returns An object where keys are group names and values are arrays of grouped items.
 */
export function groupBy<T, K extends string | number | symbol>(array: T[], getKey: (item: T) => K): Record<K, T[]> {
	return array.reduce((acc, item) => {
		const key = getKey(item);
		if (!acc[key]) acc[key] = [];
		acc[key].push(item);
		return acc;
	}, {} as Record<K, T[]>);
}
