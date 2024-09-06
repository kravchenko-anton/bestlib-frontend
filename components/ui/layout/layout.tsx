import type { LayoutProperties } from '@/components/ui/layout/types'
import type { FC } from 'react'

const Layout: FC<LayoutProperties> = ({ children, ...properties }) => (
	<div {...properties}> {children}</div>
)

export default Layout
