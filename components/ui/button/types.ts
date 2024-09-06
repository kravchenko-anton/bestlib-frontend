import type { FC } from 'react';
import type { DefaultButtonProperties } from '../base-components-types';
import { LineColorType, VividPaletteType } from '@/utils/colors';
import { SizeProperties } from '@/types/size-types';

export interface ButtonProperties
	extends DefaultButtonProperties,
		SizeProperties {
	isLoading?: boolean
	disabled?: boolean
	icon?: FC<{ width: number; height: number; color: LineColorType }>
	variant?: VividPaletteType
	children?: string
	fullWidth?: boolean
}
