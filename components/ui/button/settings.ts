import type { ButtonProperties } from './types'

export const settings: {
	colors: Record<Required<ButtonProperties>['variant'], string>
	size: Record<ButtonProperties['size'], string>
	iconSize: Record<ButtonProperties['size'], number>
} = {
	colors: {
		foreground:
			'bg-foreground border-[1px] border-bordered text-white hover:bg-muted',
		muted:
			'bg-muted border-[1px] border-bordered text-white hover:bg-foreground',
		primary: 'bg-primary text-white border-[1px] border-transparent',
		danger:
			'bg-danger text-white border-[1px] border-transparent hover:bg-danger',
		background:
			'bg-background border-[1px] border-transparent text-white hover:bg-muted',
		success:
			'bg-success text-white border-[1px] border-transparent hover:bg-success',
		warning:
			'bg-warning text-white border-[1px] border-transparent hover:bg-warning'
	},
	size: {
		sm: 'px-2.5 py-1 text-sm',
		md: 'px-4 py-2 text-md',
		lg: 'px-5 py-3 text-lg'
	},
	iconSize: {
		sm: 16,
		md: 18,
		lg: 20
	}
}
