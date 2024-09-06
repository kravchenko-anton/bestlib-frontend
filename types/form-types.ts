import { Control, FieldPath, FieldValues } from 'react-hook-form';

export interface BaseFieldProperties<T extends FieldValues> {
	control: Control<T>
	name: FieldPath<T>
}