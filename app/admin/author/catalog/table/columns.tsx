import { AuthorCatalogOutputDataInner } from '@/api-client'
import { AuthorUpdate } from '@/app/admin/author/catalog/author-update'
import { Button } from '@/components/ui'
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'
import { getFileUrl } from '@/utils/get-file-url'
import { infoToast } from '@/utils/toast'
import type { ColumnDef } from '@tanstack/react-table'

import Image from 'next/image'

export interface AuthorCatalogProperties{
	remove: (id: string) => void
	removeLoading: boolean
}
export const columns = ({remove,removeLoading}:AuthorCatalogProperties): ColumnDef<(AuthorCatalogOutputDataInner ), unknown>[] => [
	{
		id: 'picture',
		enableHiding: false,
		header: () => <p className='text-md text-center'>Picture</p>,
		cell: ({ row }) => (
				<Image
					alt={row.original.name}
					className='z-40 rounded-full mx-auto cursor-pointer'
					src={getFileUrl(row.original.picture)}
					width={50}
					height={50}
				/>
		)
	},
	{
		id: 'Name',
		header: () => <p className='text-md text-center'>Name</p>,
		cell: ({ row }) => (
			<p className="text-lg text-white">{row.original.name}</p>

		)
	},
	{
		id: 'description',
		header: () => <p className='text-md text-center'>Description</p>,
		cell: ({ row }) => (
			<Drawer>
				<DrawerTrigger asChild>
					<p className='line-clamp-2'>{row.original.description}</p>
				</DrawerTrigger>
				<DrawerContent>
					<span className=' text-justify text-md pb-4 px-4'>
						{row.original.description}
					</span>
				</DrawerContent>
			</Drawer>
		)
	},
	{
		id: 'Actions',
		cell: ({ row }) => (
				<div className='flex items-center gap-2'>

					<AuthorUpdate name={row.original.name}
												picture={row.original.picture}
					              id={row.original.id}
					              description={row.original.description}
					/>
					<Button size='sm' variant='danger' onClick={() => {
						if (removeLoading) return infoToast('Please wait')
						remove(row.original.id)
					}}>
						Delete
					</Button>
				</div>

		)
	}
]
