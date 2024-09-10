import { Button } from '@/components/ui';
import {
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent
} from '@/components/ui/chart';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import GenreElement from '@/components/ui/genre-element';
import { acceptToast, infoToast } from '@/utils/toast';
import type { ColumnDef } from '@tanstack/react-table';
import type { UserCatalogOutputDataInner } from 'api-client/models';
import * as React from 'react';
import { Area, AreaChart, XAxis } from 'recharts';
import { MoreHorizontal } from '@/icons/more-horizontal';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Color } from '@/utils/colors';
import { NothingFound } from '@/public/illustrations/nothing-found';
import { getFileUrl } from '@/utils/get-file-url';

dayjs.extend(relativeTime)
export const columns = ({
	remove,
	removeLoading
}: {
	remove: (id: string) => void
	removeLoading: boolean
}): ColumnDef<UserCatalogOutputDataInner, unknown>[] => [
	{
		id: 'id',
		enableHiding: false,
		header: () => <p className='text-md text-center'>id</p>,
		cell: ({ row }) => (
			<Drawer>
				<DrawerTrigger asChild>
					<p className='text-center text-2xl'>id</p>
				</DrawerTrigger>
				<DrawerContent>
					<span className='p-6 pb-10 text-justify text-xl'>
						{row.original.id}
					</span>
				</DrawerContent>
			</Drawer>
		)
	},
	{
		id: 'picture',
		header: () => <p className='text-md text-center'>Picture</p>,
		enableHiding: false,
		cell: ({ row }) => (
			<img
				alt={row.original.email}
				src={getFileUrl(row.original.picture)}
				width={50}
				height={50}
				className='mx-auto rounded-md'
			/>
		)
	},
	{
		id: 'Bio',
		enableHiding: false,
		header: () => <p className='text-md text-center'>Info</p>,
		cell: ({ row }) => (
			<div className=' gap-4'>
				<h2 className='text-lg'>{row.original.fullName}</h2>
				<p className='text-xm'>{row.original.email}</p>
				<p className='text-xm'> {row.original.socialId}</p>
				<p>
					location: <b className='font-bold'> {row.original.location}</b>
				</p>
			</div>
		)
	},
	{
		id: 'Joined at',
		enableHiding: false,
		header: () => <p className='text-md text-center'>Joined at</p>,
		cell: ({ row }) => (
			<div className='text-center'>
				<p>{dayjs(row.original.createdAt).fromNow(true)
				}</p>
			</div>
		)
	},

	{
		id: 'Activities',
		enableHiding: false,
		header: () => <p className='text-md text-center'>Activities</p>,
		cell: ({ row }) => (
			<div className='flex items-center justify-center'>
				<Drawer>
					<DrawerTrigger>
						<Button
							size={'md'}
							className='mx-auto'
							variant={
								row.original.statistics.length > 0 ? 'primary' : 'muted'
							}>
							{` ${row.original.statistics.length} Activities `}
						</Button>
					</DrawerTrigger>
					<DrawerContent>
						{row.original.statistics.length > 0 ? (
							<ChartContainer
								config={{}}
								className='aspect-auto h-[250px] w-full'>
								<AreaChart
									data={row?.original.statistics.map(history => ({
										...history,
										readingTimeMin:
											Math.round(history.readingTimeMs / 60_000) || 0,
										name: dayjs(history.endDate).format('MMM DD YYYY'),
										date: history.endDate
									}))}>
									<defs>
										<linearGradient id='color1' x1='0' y1='0' x2='0' y2='1'>
											<stop
												offset='5%'
												stopColor={'#6E6E70'}
												stopOpacity={0.9}
											/>
											<stop
												offset='95%'
												stopColor={'#28282A'}
												stopOpacity={0.1}
											/>
										</linearGradient>
										<linearGradient id='color2' x1='0' y1='0' x2='0' y2='1'>
											<stop
												offset='5%'
												stopColor={Color.success}
												stopOpacity={0.9}
											/>
											<stop
												offset='95%'
												stopColor={'#28282A'}
												stopOpacity={0.1}
											/>
										</linearGradient>
									</defs>
									<XAxis
										dataKey='date'
										tickLine={false}
										axisLine={false}
										tickMargin={8}
										minTickGap={32}
										tickFormatter={value => {
											const date = new Date(value)
											return date.toLocaleDateString('en-US', {
												month: 'short',
												day: 'numeric'
											})
										}}
									/>
									<ChartTooltip
										cursor={false}
										content={
											<ChartTooltipContent
												indicator='dot'
												labelFormatter={value =>
													new Date(value).toLocaleDateString('en-US', {
														month: 'short',
														day: 'numeric'
													})
												}
											/>
										}
									/>
									<Area
										dataKey='readingTimeMin'
										type='natural'
										fill='url(#color1)'
										stroke={'#CBCBCD'}
										stackId='a'
									/>
									<Area
										dataKey='progressDelta'
										type='natural'
										stroke={'#CBCBCD'}
										fill='url(#color2)'
										stackId='a'
									/>
									<ChartLegend content={<ChartLegendContent />} />
								</AreaChart>
							</ChartContainer>
						) : (
							<div className='mx-auto mb-8 mt-4'>
								<NothingFound
									className='mx-auto mb-2'
									width={200}
									height={180}
								/>
								<h1 color={Color.gray}>
									Nothing found, try looking for something else
								</h1>
							</div>
						)}
					</DrawerContent>
				</Drawer>
			</div>
		)
	},

	{
		id: 'Library',
		enableHiding: false,
		header: () => <p className='text-md text-center'>Library</p>,
		cell: ({ row }) => (
			<div className=' items-center flex justify-center  gap-2'>
				<Button size='sm' variant='muted' className='m-1 w-full'>
					{`${row.original._count.savedBooks} Saved`}
				</Button>
				<Button size='sm' variant='muted' className='m-1 w-full'>
					{`${row.original._count.readingBooks} Read`}
				</Button>
				<Button size='sm' variant='muted' className='m-1 w-full'>
					{`${row.original._count.finishedBooks} Finish`}
				</Button>
			</div>
		)
	},
	{
		id: 'genres',
		enableHiding: false,
		header: () => <p className='text-center text-xl'>Genres</p>,
		cell: ({ row }) => (
			<div className='items-center flex justify-center gap-1'>
				{row.original.selectedGenres.map(genre => (
					<GenreElement
						key={genre.name}
						title={genre.name}
						svgUri={genre.icon}
					/>
				))}
			</div>
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
