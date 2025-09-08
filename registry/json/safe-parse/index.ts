/**
 * Safely parses a JSON string, returning undefined if parsing fails.
 * @param str The JSON string to parse.
 * @returns The parsed value or undefined if parsing fails.
 */
export function safeParse<T = unknown>(str: string): T | undefined {
	try {
		return JSON.parse(str) as T;
	} catch {
		return undefined;
	}
}
