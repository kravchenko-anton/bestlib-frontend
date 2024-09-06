import api from '@/services/api';
import { secureRoutes } from '@/utils/route';
import { successToast } from '@/utils/toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { MutationKeys } from '@/utils/query-keys';
import { CreateBookDto } from 'api-client/models';
import { CreateBookSchema, CreateBookSchemaType } from '../../../../../../backend/src/book/dto/create.book.schema';
import { slugify } from '../../../../../../backend/src/utils/helpers/slugify';
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
	} = useForm<CreateBookSchemaType>({
		resolver: zodResolver(CreateBookSchema),
		mode: 'onBlur'
	})

	useEffect(() => {
		setValue('slug', slugify(watch('title')))
	}, [setValue, watch])


	const { mutateAsync: create, isPending: createLoading } = useMutation({
		mutationKey: MutationKeys.book.createBook,
		mutationFn: (payload: CreateBookDto) => api.book.create(payload),
		onSuccess: async data => {
			successToast('Book created')
			router.push(secureRoutes.bookCatalogRoute)
		}
	})

	const handleCreate = handleSubmit(async (data: CreateBookSchemaType) => {
		await create(data)
	})
	console.log(watch('genres'))
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
