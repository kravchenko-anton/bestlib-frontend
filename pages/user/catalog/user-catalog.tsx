import Loader from '@/components/ui/loader/loader';
import { type FC, Suspense } from 'react';
import { UserTable } from '@/pages/user/catalog/table/user-table';

export const UserCatalog: FC = () => (
	<Suspense fallback={<Loader />}>
		<UserTable />
	</Suspense>
)

