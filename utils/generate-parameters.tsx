export type GenerateParametersType = Record<string, any>

export const generateParameters = (
	link: string,
	parameters: GenerateParametersType
) => `${link}?${new URLSearchParams(parameters).toString()}`
