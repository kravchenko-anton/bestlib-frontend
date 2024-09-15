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
import { SelectPicture } from '@/pages/book/components/select-picture'

import api from '@/services/api'
import { MutationKeys, QueryKeys } from '@/utils/query-keys'
import { successToast } from '@/utils/toast'
import { AuthorSchema, type AuthorSchemaType } from '@/validation/author.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'

export const AuthorUpdate = ({picture,name,	id,description}:  AuthorSchemaType) => {
	const queryClient = useQueryClient()
	const {control, handleSubmit, formState: {errors}} = useForm<AuthorSchemaType>({
		resolver: zodResolver(AuthorSchema),
		defaultValues: {
			picture,
			name,
			id,
			description
		}
	})
	const { mutateAsync: update } = useMutation({
		mutationKey: MutationKeys.author.update,
		mutationFn: (payload: AuthorSchemaType) => api.author.update(payload),
		onSuccess: async () => {
		await 	queryClient.invalidateQueries({
				queryKey: QueryKeys.searchByTerm('')
			})
			successToast("Author updated")
		}
	})

	const onSubmit = async (data: AuthorSchemaType) => {
		await update(data)
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button size='sm' variant='warning' onClick={() => {}}>
					Update
				</Button>
			</DialogTrigger>
			<DialogContent  className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Update new author</DialogTitle>
					<DialogDescription>
						Please fill the form to update a new author
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<SelectPicture folder={'authorsPictures'} className='rounded-full' name='picture' control={control} width={80} height={80}/>
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
									type="submit">Update</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}