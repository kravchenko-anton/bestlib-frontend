'use client';
import { AuthorCatalogOutput } from '@/api-client'
import { AuthorCreate } from '@/app/admin/author/catalog/author-create'
import { columns } from '@/app/admin/author/catalog/table/columns'
import DataTable from '@/components/catalog/data-table'
import DataTableHeader from '@/components/catalog/table-search'
import api from '@/services/api'
import { generateParameters } from '@/utils/generate-parameters'
import { MutationKeys, QueryKeys } from '@/utils/query-keys'
import { secureRoutes } from '@/utils/route'
import { successToast } from '@/utils/toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { useRouter } from 'next/navigation'
import type { FC } from 'react'

interface AuthorCatalogTableProperties {
	authors: AuthorCatalogOutput | undefined
	page: number
	searchTerm: string
}
export const AuthorCatalogTable: FC<AuthorCatalogTableProperties> = ({
	authors,
	page,
	searchTerm
}) => {
	const queryClient = useQueryClient()
	const { mutateAsync: deleteAuthor, isPending: deleteAuthorLoading } = useMutation(
		{
			mutationKey: MutationKeys.author.remove,
			mutationFn: (id: string) => api.author.remove(id),
			onError(error: string) {
				console.log('error', error)
			},
			async onSuccess() {
				successToast('Author deleted')
				await queryClient.invalidateQueries({
					queryKey: QueryKeys.users.catalog.key
				})
			}
		}
	)
	const router = useRouter()
	const table = useReactTable({
		data: authors?.data ?? [],
		columns: columns({
			remove: 	id => deleteAuthor(id),
			removeLoading	: deleteAuthorLoading
		}),
		getCoreRowModel: getCoreRowModel()
	})

	return (
		<div className='w-full'>
			<DataTableHeader
				title='Authors'
				defaultTerm={searchTerm}
				onSearchSubmit={term => {
					router.replace(
						generateParameters(secureRoutes.bookCatalogRoute, {
							searchTerm: term.searchTerm
						})
					)
				}}>
				<AuthorCreate/>
			</DataTableHeader>
			<DataTable
				table={table}
				totalPages={authors?.totalPages ?? 0}
				currentPage={page}
				canLoadMore={authors?.canLoadMore}
			/>
		</div>
	)
}
