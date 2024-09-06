'use client'
import Sidebar from '@/components/sidebar/sidebar'
import { adminRoute } from '@/providers/secure-route'
import type { FC, PropsWithChildren } from 'react'

const AdminLayout: FC<PropsWithChildren> = ({ children }) => (
	<div className='overflow-hidden xl:flex'>
		<Sidebar />
		<div className=' xl:w-[ calc(100% - 56px ) ] w-full overflow-auto p-2 pt-4 duration-200 ease-linear xl:ml-[56px] xl:p-4'>
			{children}
		</div>
	</div>
)

export default adminRoute(AdminLayout)
