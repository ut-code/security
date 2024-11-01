function env(name: string): string {
	const s = String(import.meta.env[name]);
	if (typeof s !== "string") {
		throw new Error(
			`Validation failed for ${name}: expected type string, but found type: ${typeof s}. the value: ${s}`,
		);
	}
	if (s.length === 0) {
		throw new Error(
			`Validation failed for ${name}: expected length of string to be more than 0`,
		);
	}
	console.log(`[debug] value of ${name} is "${s}"`);
	return s;
}

export const API_ENDPOINT = env("PUBLIC_API_ENDPOINT");
