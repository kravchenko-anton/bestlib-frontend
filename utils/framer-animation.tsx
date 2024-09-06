import { motion, type MotionProps } from 'framer-motion'
import type { FC, PropsWithChildren } from 'react'

export const tapAnimation = {
	whileHover: {
		scale: 1.1
	},
	whileTap: {
		scale: 0.9
	}
}

export const TapComponent: FC<
	MotionProps & PropsWithChildren<{ className?: string; onClick?: () => void }>
> = ({ children, ...rest }) => (
	<motion.div {...tapAnimation} {...rest}>
		{children}
	</motion.div>
)
