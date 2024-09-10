// @ts-nocheck TODO: fix this in future
import { Button, Field, FormTextArea } from '@/components/ui';
import Loader from '@/components/ui/loader/loader';
import api from '@/services/api';
import { dirtyValues } from '@/utils/getDirtyValues';
import { errorToast, successToast } from '@/utils/toast';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { type FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Star } from '@/icons/star';
import { MutationKeys, QueryKeys } from '@/utils/query-keys';
import { UpdateBookDto } from 'api-client/models';
import { SelectPicture } from '@/pages/book/components/select-picture';
import SelectGenres from '@/pages/book/components/select-genres';
import EbookComposer from '@/pages/book/components/ebook-creator/editor';

export interface UpdateBookProperties {
	bookId: string;
}

export const UpdateBook: FC<UpdateBookProperties> = ({bookId}) => {
	const queryClient = useQueryClient()
	const {
		control,
		reset,
		handleSubmit,
		formState: { errors, dirtyFields }
	} = useForm<UpdateBookDto>()

	const { data: book } = useQuery({
		queryKey: QueryKeys.book.adminInfoById(bookId),
		queryFn: () => api.book.adminInfoById(bookId),
		select: data => data.data
	})

	const { mutateAsync: update, isPending: updateLoading } = useMutation({
		mutationKey: MutationKeys.book.update,
		mutationFn: (payload: Partial<UpdateBookDto>) =>
			//TODO: пофиксить
			// @ts-ignore
			api.book.update(bookId, payload),
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: QueryKeys.book.adminInfoById(bookId)
			})
			await queryClient.invalidateQueries({
				queryKey: QueryKeys.book.catalog.key
			})
			await queryClient.invalidateQueries({
				queryKey: QueryKeys.book.overview.byId(bookId)
			})
			successToast('Book updated')
		}
	})

	useEffect(() => {
		if (!book || !ebook) return
		reset({
			title: book.title,
			description: book.description,
			rating: book.rating,
			genres: book.genres,
			picture: book.picture,
			ebook: ebook
		})
	}, [reset, book, bookId, ebook])

	const handleUpdate = handleSubmit(async (data: UpdateBookDto) => {
		if (Object.keys(dirtyValues(dirtyFields, data)).length === 0)
			return errorToast('Please fill some fields to update the book')
		await update(dirtyValues(dirtyFields, data))
	})

	console.log(dirtyFields)
	if (!book || !ebook) return <Loader />
	return (
		<div>
			<div className='mb-4 justify-between gap-5  md:flex'>
				<div>
					<div>
						<h1 className='mt-2  text-xl'>Cover</h1>
						<SelectPicture name='picture' control={control} />
						<h1 className='my-1'>Genres</h1>

						<SelectGenres name='genres' control={control} />
						<div className='mt-2 flex items-center justify-between'>
							<h1 className=''>Visibility</h1>
							<Button
								size={'sm'}
								variant={book.recommendable ? 'success' : 'warning'}
								isLoading={updateLoading}
								onClick={async () => {
									await update({
										isPublic: !book.isPublic
									})
								}}>
								{book.isPublic ? 'Hide' : 'Show'}
							</Button>
						</div>
						<div className='mt-2 flex items-center justify-between'>
							<h1 className=''>Recommendable</h1>
							<Button
								size={'sm'}
								isLoading={updateLoading}
								variant={book.recommendable ? 'muted' : 'danger'}
								onClick={async () => {
									await update({
										recommendable: !book.recommendable
									})
								}}>
								{book.recommendable ? 'Disable' : 'Enable'}
							</Button>
						</div>
					</div>
				</div>
				<div className='w-10/12'>
					<div className='mt-2 gap-3 md:flex'>
						<div className=' md:w-1/2'>
							<h1 className='my-2'>Title</h1>
							<Field
								type='text'
								control={control}
								name='title'
								placeholder='Title'
							/>
						</div>

						<div className='md:w-1/4'>
							<h1 className='my-2'>Rating</h1>
							<Field
								icon={Star}
								type='number'
								control={control}
								name='rating'
								placeholder='Rating'
								min={1}
								max={5}
							/>
						</div>
					</div>
					<h1 className='my-2'>Description</h1>
					<FormTextArea
						control={control}
						name='description'
						placeholder='Enter description'
						className='h-[240px]'
					/>
				</div>
			</div>

			<EbookComposer control={control} name='ebook' />
			<Button
				size='sm'
				isLoading={updateLoading}
				className='mt-4'
				variant={Object.keys(errors).length > 0 ? 'danger' : 'foreground'}
				onClick={handleUpdate}>
				Update
			</Button>
		</div>
	)
}
