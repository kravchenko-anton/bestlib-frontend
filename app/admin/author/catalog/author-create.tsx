import type { CreateAuthorDto } from '@/api-client'
import { SelectPicture } from '@/app/admin/book/components/select-picture'
import { Button, Field } from '@/components/ui'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/dialog'
import api from '@/services/api'
import { MutationKeys, QueryKeys } from '@/utils/query-keys'
import { successToast } from '@/utils/toast'
import { CreateAuthorSchema } from '@/validation/author.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'

export const AuthorCreate = () => {
	const queryClient = useQueryClient()
	const {control, handleSubmit, formState: {errors}} = useForm<CreateAuthorDto>({
		resolver: zodResolver(CreateAuthorSchema)
	})
	const { mutateAsync: create } = useMutation({
		mutationKey: MutationKeys.book.createBook,
		mutationFn: (payload: CreateAuthorDto) => api.author.create(payload),
		onSuccess: async data => {
		await 	queryClient.invalidateQueries({
				queryKey: QueryKeys.searchByTerm('')
			})
			successToast("Author created")
		}
	})

	const onSubmit = async (data: CreateAuthorDto) => {
		await create(data)
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button size='sm' variant='muted' onClick={() => {}}>
					Create
				</Button>
			</DialogTrigger>
			<DialogContent  className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Create new author</DialogTitle>
					<DialogDescription>
						Please fill the form to create a new author
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<SelectPicture folder={'authorsPictures'} className='rounded-full' name='photo' control={control} width={80} height={80}/>
					<div className="w-full items-center gap-4">
						<Field
							control={control}
							name='name'
							placeholder={'Author name'}
							className="w-full"
						/>
					</div>
					<div className="w-full items-center gap-4">
						<Field
							control={control}
							name='description'
							placeholder={'Author description'}
							className="w-full"
						/>
					</div>
				</div>
				<DialogFooter>
					<Button size='md'
									onClick={handleSubmit(onSubmit)}
									variant={Object.keys(errors).length > 0 ? 'danger' : 'foreground'}
									type="submit">Create</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}