import type { InputHTMLAttributes, SVGProps } from 'react';
import type { Control, FieldPath, FieldValues } from 'react-hook-form';
import type { DefaultInputProperties } from '../base-components-types';
import { ClampPaletteType } from '@/utils/colors';

export interface FieldProperties<T extends FieldValues>
	extends DefaultInputProperties,
		Pick<InputProperties, 'variant' | 'icon'> {
	control: Control<T>
	name: FieldPath<T>
}

export interface InputProperties extends InputHTMLAttributes<HTMLInputElement> {
	placeholder?: string
	isError?: boolean
	icon?: (properties: SVGProps<SVGSVGElement>) => JSX.Element
	variant?: ClampPaletteType
}
