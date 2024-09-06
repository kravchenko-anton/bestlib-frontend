import { cn } from '@/utils'
import type { FC } from 'react'
import { settings } from './settings'
import type { TextAreaProperties } from './types'

const TextArea: FC<TextAreaProperties> = ({
	variant = 'foreground',
	className = '',
	...properties
}) => (
	<textarea
		value={properties.value}
		className={cn(
			'placeholder-gray h-full w-full resize-none rounded p-2 text-white focus:outline-0',
			settings.colors[variant],
			properties.disabled && 'cursor-not-allowed',
			className
		)}
		{...properties}
	/>
)

export default TextArea
