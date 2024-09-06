'use client'
import type { ReactNode } from 'react'
import type { Path, PathValue } from 'react-hook-form'
import { Controller } from 'react-hook-form'
import Input from './input'
import type { FieldProperties } from './types'

const Field = <T extends Record<string, any>>({
	variant = 'foreground',
	className,
	style,
	icon: Icon,
	...properties
}: FieldProperties<T>): ReactNode | null => (
	<Controller
		control={properties.control}
		name={properties.name}
		defaultValue={properties.defaultValue as PathValue<T, Path<T>>}
		render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
			<div className={className} style={style}>
				<Input
					variant={variant}
					isError={!!error}
					value={value}
					icon={Icon}
					onBlur={onBlur}
					onChange={
						properties.type === 'number'
							? event => onChange(Number(+event.target.value))
							: onChange
					}
					{...properties}
				/>
				{!!error && (
					<p className='text-danger mt-0.5 text-xs italic'>{error.message}</p>
				)}
			</div>
		)}
	/>
)

export default Field
