import { columns } from '@/app/admin/user/catalog/table/columns'
import { useQueries } from '@/app/admin/user/catalog/table/useQueries'
import DataTable from '@/components/catalog/data-table'
import DataTableHeader from '@/components/catalog/table-search'
import { useTableParameters } from '@/hooks/useTableParameters'
import { generateParameters } from '@/utils/generate-parameters'
import { secureRoutes } from '@/utils/route'
import { getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { useRouter } from 'next/navigation'

export const UserTable = () => {
	const router = useRouter()
	const { page, searchTerm } = useTableParameters()
	const { users, deleteUser, deleteUserLoading } = useQueries({
		page,
		searchTerm
	})

	const table = useReactTable({
		data: users?.data ?? [],
		columns: columns({
			remove: deleteUser,
			removeLoading: deleteUserLoading
		}),
		getCoreRowModel: getCoreRowModel()
	})

	return (
		<div className='w-full'>
			<DataTableHeader
				title='Users'
				defaultTerm={searchTerm}
				onSearchSubmit={term => {
					router.replace(
						generateParameters(secureRoutes.userCatalogRoute, {
							searchTerm: term.searchTerm
						})
					)
				}}
			/>
			<DataTable
				currentPage={page}
				totalPages={Number(users?.totalPages)}
				canLoadMore={users?.canLoadMore}
				table={table}
			/>
		</div>
	)
}
