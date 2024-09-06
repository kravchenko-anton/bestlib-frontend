import type { FieldValues } from 'react-hook-form';
import type { DefaultTextAreaProperties } from '../base-components-types';
import { BaseFieldProperties } from '@/types/form-types';
import { ClampPaletteType } from '@/utils/colors';

export interface FormTextEditorProperties<T extends FieldValues>
	extends TextAreaProperties,
		BaseFieldProperties<T> {}

export interface TextAreaProperties extends DefaultTextAreaProperties {
	variant?: ClampPaletteType
}
