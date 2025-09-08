/**
 * Returns a new array with only unique elements from the input array.
 * @param array The array to filter.
 * @returns An array of unique elements.
 */
export function unique<T>(array: T[]): T[] {
	return Array.from(new Set(array));
}
