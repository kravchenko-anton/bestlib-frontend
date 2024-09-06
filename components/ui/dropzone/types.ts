import type { FieldValues } from 'react-hook-form';
import type { DefaultInputProperties } from '../base-components-types';
import { BaseFieldProperties } from '@/types/form-types';
import { ClampPaletteType } from '@/utils/colors';
import { SizeProperties } from '@/types/size-types';

export interface DropzoneProperties
	extends DefaultInputProperties,
		SizeProperties {
	accept?: 'image/*' | '.epub' | '*'
	variant?: ClampPaletteType
	disabled?: boolean
	multiple?: boolean
	onFileDelete?: (file: File, index: number) => void
	onDropFile: (files: File[]) => void
	defaultFiles?: File[]
}

export interface FormDropZoneProperties<T extends FieldValues>
	extends DefaultInputProperties,
		Pick<
			DropzoneProperties,
			| 'size'
			| 'variant'
			| 'multiple'
			| 'accept'
			| 'disabled'
			| 'onFileDelete'
			| 'onDropFile'
			| 'defaultFiles'
		>,
		BaseFieldProperties<T> {}
