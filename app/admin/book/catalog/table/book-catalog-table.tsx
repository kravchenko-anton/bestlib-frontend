'use client';
import { BookCatalogOutput } from '@/api-client'
import { columns } from '@/app/admin/book/catalog/table/columns'
import DataTable from '@/components/catalog/data-table'
import DataTableHeader from '@/components/catalog/table-search'
import { Button } from '@/components/ui'
import { generateParameters } from '@/utils/generate-parameters'
import { secureRoutes } from '@/utils/route'
import { getCoreRowModel, useReactTable } from '@tanstack/react-table'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { FC } from 'react'

interface BookCatalogTableProperties {
	books: BookCatalogOutput | undefined
	page: number
	searchTerm: string
}
export const BookCatalogTable: FC<BookCatalogTableProperties> = ({
	books,
	page,
	searchTerm
}) => {
	const router = useRouter()
	const table = useReactTable({
		data: books?.data ?? [],
		columns: columns(),
		getCoreRowModel: getCoreRowModel()
	})

	return (
		<div className='w-full'>
			<DataTableHeader
				title='Books'
				defaultTerm={searchTerm}
				onSearchSubmit={term => {
					router.replace(
						generateParameters(secureRoutes.bookCatalogRoute, {
							searchTerm: term.searchTerm
						})
					)
				}}>
				<Link href={secureRoutes.bookCreateRoute}>
					<Button size='sm' variant='muted'>
						Create
					</Button>
				</Link>
			</DataTableHeader>
			<DataTable
				table={table}
				totalPages={books?.totalPages ?? 0}
				currentPage={page}
				canLoadMore={books?.canLoadMore}
			/>
		</div>
	)
}
