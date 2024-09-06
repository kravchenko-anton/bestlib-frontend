//TODO: проверить во всех вариантах валидацию
export const validateNumberParameter = (parameter: any): number => {
	if (!parameter) return 0
	if (parameter < 0 || parameter > 10_000) throw new Error('Invalid parameter')

	return +parameter
}

export const validateStringParameter = (parameter: any): string => {
	if (!parameter) return ''
	if (typeof parameter !== 'string') throw new Error('Invalid parameter')
	return parameter
}
