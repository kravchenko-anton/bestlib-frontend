import { Color } from '@/utils/colors'

export const tagArray = [
	{
		tag: 'P',
		color: Color.primary
	},
	{
		tag: 'H1',
		color: '#A44200'
	},
	{
		tag: 'H2',
		color: '#DAC4F7'
	},
	{
		tag: 'H3',
		color: '#AFD0BF'
	},
	{
		tag: 'H4',
		color: '#4F5D75'
	},
	{
		tag: 'H5',
		color: '#BDE4A7'
	},
	{
		tag: 'H6',
		color: '#208AAE'
	},
	{
		tag: 'A',
		color: '#D991BA'
	},
	{
		tag: 'SPAN',
		color: '#8CAE68'
	},
	{
		tag: 'DIV',
		color: '#7D387D'
	},
	{
		tag: 'IMG',
		color: '#2A9D8F'
	},
	{
		tag: 'UL',
		color: '#E9C46A'
	},
	{
		tag: 'OL',
		color: '#F4A261'
	},
	{
		tag: 'LI',
		color: '#E76F51'
	},
	{
		tag: 'SECTION',
		color: '#B83B5E'
	},
	{
		tag: 'ARTICLE',
		color: '#3D5A6C'
	},
	{
		tag: 'EM',
		color: '#540D6E'
	},
	{
		tag: 'BR',
		color: '#FFD166'
	},
	{
		tag: 'I',
		color: '#06D6A0'
	},
	{
		tag: `BLOCKQUOTE`,
		color: '#EE4266'
	}
]

export const useTagColor = (tag: string) => {
	const foundTag = tagArray.find(({ tag: t }) => t === tag)
	return foundTag?.color || "#E63946"
}
