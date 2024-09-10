import api from '@/services/api';
import { secureRoutes } from '@/utils/route';
import { successToast } from '@/utils/toast';
import { useMutation } from '@tanstack/react-query';


import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { MutationKeys } from '@/utils/query-keys';
import { CreateBookDto } from 'api-client/models';
import { slugify } from '@/utils/slugify';
//TODO: пофиксить полностью создание книги чтобы работало без багов
export const useCreateForm = () => {
	const router = useRouter()
	const {
		control,
		reset,
		watch,
		handleSubmit,
		setValue,
		getValues,
		formState: { errors }
	} = useForm<CreateBookDto>({
		mode: 'onBlur'
	})

	useEffect(() => {
		setValue('slug', slugify(watch('title')))
	}, [watch("title")])


	const { mutateAsync: create, isPending: createLoading } = useMutation({
		mutationKey: MutationKeys.book.createBook,
		mutationFn: (payload: CreateBookDto) => api.book.create(payload),
		onSuccess: async data => {
			successToast('Book created')
			router.push(secureRoutes.bookCatalogRoute)
		}
	})

	const handleCreate = handleSubmit(async ({chapters, ...data}) => {
		await create({
			...data,
			chapters: chapters.map((chapter, index) => ({
				...chapter,
				position: index + 1
			}))
		})
	})
	return {
		watch,
		control,
		errors,
		setValue,
		reset,
		getValues,
		handleCreate,
		createLoading
	}
}
