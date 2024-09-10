export function dirtyValues(
	dirtyFields: object | boolean,
	allValues: object
): object {
	// If *any* item in an array was modified, the entire array must be submitted, because there's no way to indicate
	// "placeholders" for unchanged elements. `dirtyFields` is `true` for leaves.
	if (dirtyFields === true || Array.isArray(dirtyFields)) return allValues
	// Here, we have an object
	return Object.fromEntries(
		Object.keys(dirtyFields).map(key => [
			key,
			// @ts-ignore
			dirtyValues(dirtyFields[key], allValues[key])
		])
	)
}


export function getDirtyFields<T>(defaultValue: T, value: T): Partial<T> {
	return Object.fromEntries(
	// @ts-ignore
		Object.entries(value).filter(([key, value_]) => value_ !== defaultValue[key as keyof T])
	) as Partial<T>;
}