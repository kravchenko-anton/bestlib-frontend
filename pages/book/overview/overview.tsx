import { Button } from '@/components/ui';
import GenreElement from '@/components/ui/genre-element';
import Loader from '@/components/ui/loader/loader';
import api from '@/services/api';
import { cn } from '@/utils';
import { secureRoutes } from '@/utils/route';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { QueryKeys } from '@/utils/query-keys';
import { getFileUrl } from '@/utils/get-file-url';
import BookStatistic from '@/pages/book/components/book-statistic';
import { RemoveButton } from '@/pages/book/components/remove-button';
import { ActivityChart } from '@/pages/book/components/charts/activity-chart';
import BookOverview from '@/pages/book/components/ebook-tabs';

export interface UpdateBookProperties {
	id: string;
}

const UpdateBook = ({id}:UpdateBookProperties) => {
	const router = useRouter()
	const queryClient = useQueryClient()
	const { data: book } = useQuery({
		queryKey: QueryKeys.book.overview.byId(id),
		queryFn: () => api.book.adminInfoById(id),
		select: data => data.data,
		// 1 hour
		staleTime: 1000 * 60 * 60
	})
	const onUpdateSuccess = async () => {
		await queryClient.invalidateQueries({
			queryKey: QueryKeys.book.overview.byId(id)
		})
	}

	if (!book) return <Loader />

	return (
		<div>
			<div className='mt-4 gap-5 px-2 md:flex'>
				<div>
					<div className='mt-4 px-0.5'>
						<Image
							width={240}
							height={140}
							alt={book.title}
							src={getFileUrl(book.picture)}
							className='bg-muted mb-2 rounded'
						/>
						<BookStatistic
							readingTime={book.readingTime}
							createdAt={book.createdAt}
							_count={book._count}
							updatedAt={book.updatedAt}
						/>
						<div className='mb-4 flex gap-2 md:mt-0'>
							<Button
								size={'sm'}
								className={cn('bg-warning rounded text-white')}
								onClick={() => router.push(secureRoutes.bookUpdateRoute(id))}>
								Edit
							</Button>
							<RemoveButton id={book.id} onSuccess={onUpdateSuccess} />
						</div>
					</div>
				</div>

				<div className='md:w-5/6'>
					<h1 className='mb-1 text-3xl'>{book.title}</h1>

					<div className='flex items-center gap-5'>
						<h1 className='text-gray text-xl'>{book.author.name}</h1>
						<div className='flex items-center gap-2'>
							<p className='text-warning  text-lg'>★ {book.rating}</p>
						</div>
					</div>
					<div className='text-gray mb-2 mt-4 flex items-center gap-2 overflow-auto'>
						{book.genres.map(genre => (
							<GenreElement
								title={genre.name}
								key={genre.id}
								svgUri={genre.icon}
							/>
						))}
					</div>
					<p className='mb-2 text-lg'>{book.description}</p>
					<ActivityChart
						chartData={book.statistics?.map(history => ({
							...history,
							readingTimeMin: Math.round(history.readingTimeMs / 60_000) || 0,
							name: new Date(history.endDate).toLocaleDateString(),
							date: new Date(history.endDate).toLocaleDateString()
						}))}
					/>
				</div>
			</div>
			<BookOverview bookId={book.id} />
		</div>
	)
}
