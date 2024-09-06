import { Button } from '@/components/ui'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '@/components/ui/table'
import type { useReactTable } from '@tanstack/react-table'
import { flexRender } from '@tanstack/react-table'
import Link from 'next/link'
import type { FC } from 'react'

export interface DataTableProperties {
	table: ReturnType<typeof useReactTable<any>>
	totalPages: number
	currentPage: number
	canLoadMore?: boolean
}
const DataTable: FC<DataTableProperties> = ({
	currentPage,
	table,
	canLoadMore,
	totalPages
}) => (
	<>
		<Table>
			<TableHeader>
				{table.getHeaderGroups().map(headerGroup => (
					<TableRow key={headerGroup.id}>
						{headerGroup.headers.map(header => (
							<TableHead key={header.id}>
								{header.isPlaceholder
									? null
									: flexRender(
											header.column.columnDef.header,
											header.getContext()
										)}
							</TableHead>
						))}
					</TableRow>
				))}
			</TableHeader>
			{table.getRowModel().rows?.length ? (
				<TableBody>
					{table.getRowModel().rows.map(row => (
						<TableRow
							key={row.id}
							data-state={row.getIsSelected() && 'selected'}>
							{row.getVisibleCells().map(cell => (
								<TableCell key={cell.id}>
									{flexRender(cell.column.columnDef.cell, {
										...cell.getContext()
									})}
								</TableCell>
							))}
						</TableRow>
					))}
				</TableBody>
			) : null}
		</Table>
		<div className='flex items-center justify-end space-x-2 py-4'>
			<div className='text-muted-foreground flex-1 text-sm'>
				{currentPage} page of {totalPages || 0} pages
			</div>
			<div className='flex space-x-2'>
				<Link href={currentPage >= 1 ? `?page=${currentPage - 1}` : ''}>
					<Button size='sm' disabled={currentPage < 1}>
						Previous
					</Button>
				</Link>
				<a href={canLoadMore ? `?page=${currentPage + 1}` : ''}>
					<Button size='sm' disabled={!canLoadMore}>
						Next
					</Button>
				</a>
			</div>
		</div>
	</>
)

export default DataTable
