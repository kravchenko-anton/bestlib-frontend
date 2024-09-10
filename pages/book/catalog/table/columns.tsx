import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import GenreElement from '@/components/ui/genre-element';
import { cn } from '@/utils';
import { secureRoutes } from '@/utils/route';
import type { ColumnDef } from '@tanstack/react-table';

import Image from 'next/image';
import Link from 'next/link';
import dayjs from 'dayjs';
import { getFileUrl } from '@/utils/get-file-url';
import { BookCatalogOutputDataInner } from '@/api-client';

export const columns = (): ColumnDef<BookCatalogOutputDataInner, unknown>[] => [
	{
		id: 'picture',
		enableHiding: false,
		header: () => <p className='text-md text-center'>Picture</p>,
		cell: ({ row }) => (
			<Link href={secureRoutes.bookOverviewRoute(row.original.id)}>
				<Image
					alt={row.original.title}
					className='z-40 mx-auto cursor-pointer rounded'
					src={getFileUrl(row.original.picture)}
					width={40}
					height={30}
				/>
			</Link>
		)
	},
	{
		id: 'Information',
		header: () => <p className='text-md text-center'>Information</p>,
		cell: ({ row }) => (
			<Link href={secureRoutes.bookOverviewRoute(row.original.id)}>
				<button className='items-start justify-start text-left'>
					<h3 className='mb-1 text-xl'>{row.original.title}</h3>
					<p>{row.original.author.name}</p>
				</button>
			</Link>
		)
	},

	{
		id: 'description',
		header: () => <p className='text-md text-center'>Description</p>,
		cell: ({ row }) => (
			<Drawer>
				<DrawerTrigger asChild>
					<p className='line-clamp-2 max-w-[450px] text-md'>{row.original.description}</p>
				</DrawerTrigger>
				<DrawerContent>
					<span className='text-justify text-md pb-4 px-2'>
						{row.original.description}
					</span>
				</DrawerContent>
			</Drawer>
		)
	},

	{
		id: 'visible',
		enableHiding: false,
		header: () => <p className='text-md text-center'>Visible</p>,
		cell: ({ row }) => (
			<p className='text-center text-lg font-light'>
				<b
					className={cn(
						'items-center font-bold',
						row.original.isPublic ? 'text-success' : 'text-danger'
					)}>
					{row.original.isPublic ? 'Public' : 'Hidden'}
				</b>
			</p>
		)
	},
	{
		id: 'rating',
		enableHiding: false,
		header: () => <p className='text-md text-center'>Rating</p>,
		cell: ({ row }) => (
			<p className=' text-center text-xl font-light'>
				<b className='text-warning font-bold'>{row.original.rating}</b>
			</p>
		)
	},
	{
		id: 'reading time',
		enableHiding: false,
		header: () => <p className='text-md text-center'>Reading time</p>,
		cell: ({ row }) => (
			<p className=' text-center text-xl font-light'>
				<b
					className={cn(
						'text-center font-bold',
						row.original.readingTime === 0 ? 'text-danger' : 'text-gray'
					)}>
					{
						dayjs(row.original.readingTime).format(
							"HH[h] mm[m]"
						)
					}
				</b>
			</p>
		)
	},
	{
		id: 'genres',
		enableHiding: false,
		header: () => <p className='text-md text-center'>Genres</p>,
		cell: ({ row }) => (
			<div className=' flex items-center justify-center gap-1'>
				{row.original.genres.map(genre => (
					<GenreElement
						key={genre.id}
						title={genre.name}
						svgUri={genre.icon}
					/>
				))}
			</div>
		)
	}
]
