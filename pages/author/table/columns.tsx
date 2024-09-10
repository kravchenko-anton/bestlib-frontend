import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import type { ColumnDef } from '@tanstack/react-table';

import Image from 'next/image';
import { getFileUrl } from '@/utils/get-file-url';
import { AuthorCatalogOutputDataInner } from '@/api-client';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from '@/icons/more-horizontal';
import { acceptToast, infoToast } from '@/utils/toast';

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
					className='z-40 mx-auto cursor-pointer rounded'
					src={getFileUrl(row.original.photo)}
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
			<DropdownMenu>
				<DropdownMenuTrigger className='focus-visible:outline-0'>
					<MoreHorizontal
						height={40}
						width={40}
						className='bg-muted border-bordered rounded border-[1px] p-2'
					/>
				</DropdownMenuTrigger>
				<DropdownMenuContent align='end'>
					<DropdownMenuItem
						onClick={() =>
							acceptToast('Are you sure you want to delete this book?', {
								action: {
									label: 'Delete',
									onClick: () => {
										if (removeLoading) return infoToast('Please wait')
										remove(row.original.id)
									}
								}
							})
						}>
						Delete
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		)
	}
]
