'use client'
import type { Path, PathValue } from 'react-hook-form'
import { Controller } from 'react-hook-form'
import TextArea from './text-area'
import type { FormTextEditorProperties } from './types'

const FormTextEditor = <T extends Record<string, any>>({
	variant = 'foreground',
	className,
	style,
	...properties
}: FormTextEditorProperties<T>) => (
	<Controller
		control={properties.control}
		name={properties.name}
		defaultValue={properties.defaultValue as PathValue<T, Path<T>>}
		render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
			<div className={className} style={style}>
				<TextArea
					variant={variant}
					value={value}
					onBlur={onBlur}
					onChange={onChange}
					{...properties}
				/>
				{!!error && (
					<p className='text-danger mt-0.5 text-xs italic'>{error.message}</p>
				)}
			</div>
		)}
	/>
)

export default FormTextEditor
