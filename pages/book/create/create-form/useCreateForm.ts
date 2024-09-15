import api from '@/services/api'
import { MutationKeys } from '@/utils/query-keys'
import { secureRoutes } from '@/utils/route'
import { successToast } from '@/utils/toast'
import { CreateBookSchema } from '@/validation/book/create.book.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { CreateBookDto } from 'api-client/models'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
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
		mode: 'onBlur',
		resolver: zodResolver(CreateBookSchema)
	})

	const { mutateAsync: create, isPending: createLoading } = useMutation({
		mutationKey: MutationKeys.book.createBook,
		mutationFn: (payload: CreateBookDto) => api.book.create(payload),
		onSuccess: async () => {
			successToast('Book created')
			router.push(secureRoutes.bookCatalogRoute)
		}
	})

	const handleCreate = handleSubmit(async (data) => {
		await create(data)
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
