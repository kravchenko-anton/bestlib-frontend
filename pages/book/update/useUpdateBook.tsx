import { UpdateBookDto } from '@/api-client';
import { MutationKeys, QueryKeys } from '@/utils/query-keys';
import api from '@/services/api';
import { errorToast, successToast } from '@/utils/toast';
import { dirtyValues } from '@/utils/getDirtyValues';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { UpdateBookProperties } from '@/pages/book/update/update';
import { UpdateChapterDto } from '@/api-client/models';

export const useUpdateBook 		= ({bookId}:UpdateBookProperties) => {
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

	const { data: ebook } = useQuery({
		queryKey: QueryKeys.ebook.adminById(bookId),
		queryFn: () => api.ebook.adminEbookById(bookId),
		enabled: !!bookId,
		select: data => data.data
	})

	const { mutateAsync: update, isPending: updateLoading } = useMutation({
		mutationKey: MutationKeys.book.update,
		mutationFn: (payload: Partial<UpdateBookDto>) =>
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

	const { mutateAsync: updateChapter } = useMutation({
		mutationKey: MutationKeys.chapters.update,
		mutationFn: ( payload: UpdateChapterDto & {
				chapterId: string
		}) =>
		{
		const {chapterId, ...rest} = payload
		return 	api.ebook.updateChapter(chapterId, rest)
		},
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: QueryKeys.ebook.adminById(bookId)
			})
			successToast('Chapter updated')
		}
	})


	useEffect(() => {
		if (!book ) return
		reset({
			title: book.title,
			description: book.description,
			summary: book.summary,
			concept: book.concept,
			rating: book.rating,
			genres: book.genres,
			picture: book.picture,
			authorId: book.authorId,
		})
	}, [reset, book, bookId])

	const handleUpdate = handleSubmit(async (data: UpdateBookDto) => {
		if (Object.keys(dirtyValues(dirtyFields, data)).length === 0)
			return errorToast('Please fill some fields to update the book')
		await update(dirtyValues(dirtyFields, data))
	})


	return {
		handleUpdate,
		updateBook: update,
		updateChapter,
		control,
		updateLoading,
		book,
		ebook,
		errors
	}
}