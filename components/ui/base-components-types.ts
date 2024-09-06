import type {
	ButtonHTMLAttributes,
	DetailedHTMLProps,
	HTMLAttributes,
	InputHTMLAttributes,
	TextareaHTMLAttributes
} from 'react';

export interface DialogProperties {
	isOpen: boolean
	onClose: () => void
}
export type DefaultButtonProperties = Pick<
	DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
	'onClick' | 'type' | 'disabled' | 'children' | 'className' | 'style'
>

export type DefaultDivProperties = Pick<
	DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
	'onClick' | 'className' | 'style'
>

export type DefaultInputProperties = Pick<
	DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
	| 'onClick'
	| 'onBlur'
	| 'onFocus'
	| 'style'
	| 'placeholder'
	| 'disabled'
	| 'className'
	| 'value'
	| 'onChange'
	| 'defaultValue'
	| 'type'
	| 'min'
	| 'max'
>

export type DefaultTextAreaProperties = Pick<
	DetailedHTMLProps<
		TextareaHTMLAttributes<HTMLTextAreaElement>,
		HTMLTextAreaElement
	>,
	| 'onClick'
	| 'onBlur'
	| 'onFocus'
	| 'style'
	| 'placeholder'
	| 'disabled'
	| 'className'
	| 'value'
	| 'onChange'
	| 'defaultValue'
>
