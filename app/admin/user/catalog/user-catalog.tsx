import { UserTable } from '@/app/admin/user/catalog/table/user-table'
import Loader from '@/components/ui/loader/loader'
import { type FC, Suspense } from 'react'

export const UserCatalog: FC = () => (
	<Suspense fallback={<Loader />}>
		<UserTable />
	</Suspense>
)

