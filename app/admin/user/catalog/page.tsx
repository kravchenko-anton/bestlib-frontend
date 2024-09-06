'use client'

import { UserTable } from '@/app/admin/user/catalog/_table/user-table'
import Loader from '@/components/ui/loader/loader'
import { Suspense, type FC } from 'react'

const Page: FC = () => (
	<Suspense fallback={<Loader />}>
		<UserTable />
	</Suspense>
)

export default Page
