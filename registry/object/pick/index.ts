/**
 * Creates a new object composed of the picked object properties.
 * @param obj The source object.
 * @param keys The property names to pick.
 * @returns A new object with only the picked properties.
 */
export function pick<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
	const result = {} as Pick<T, K>;
	for (const key of keys) {
		if (key in obj) {
			result[key] = obj[key];
		}
	}
	return result;
}
