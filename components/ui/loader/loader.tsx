import type { FC } from 'react'
import type { LoaderProperties } from './types'
import { cn } from '@/utils'

const Loader: FC<LoaderProperties> = ({
	width = 22,
	height = 22,
	color = 'primary',
	className,
	...rest
}) => (
	<svg
		className={cn('animate-spin', className)}
		fill='none'
		viewBox='0 0 24 24'
		style={{
			color: color,
			width: width,
			height: height
		}}
		{...rest}
	>
		<circle
			className='opacity-25'
			cx='12'
			cy='12'
			r='10'
			stroke='currentColor'
			strokeWidth='4'
		/>
		<path
			className='opacity-75'
			fill='currentColor'
			d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z'
		/>
	</svg>
)

export default Loader
