import { Button, Field, FormTextArea } from '@/components/ui';
import type { FC } from 'react';
import { Star } from '@/icons/star';
import { SelectPicture } from '@/pages/book/components/select-picture';
import { useCreateForm } from '@/pages/book/create/create-form/useCreateForm';
import SelectGenres from '@/pages/book/components/select-genres';
import EbookComposer from '@/pages/book/components/ebook-editor/editor';

export const CreateBookForm: FC = () => {
	const { control, ...form } = useCreateForm()
	return (
		<div>
			<div className='mb-4 justify-between gap-5  md:flex'>
				<div>
					<div>
						<h1 className='mt-2  text-xl'>Cover</h1>

						<SelectPicture name='picture' control={control} />

						<h1 className='mb-2 mt-2  text-xl'>Genres</h1>

						<SelectGenres name='genres' control={control} />
					</div>
				</div>
				<div className='w-11/12'>
					<div className='mt-2  gap-3 md:flex'>
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
					<h1 className='mb-2 mt-4'>Slug</h1>
					<Field
						type='string'
						control={control}
						name='slug'
						placeholder='Slug'
					/>
					<h1 className='mb-2 mt-4'>Description</h1>
					<FormTextArea
						control={control}
						name='description'
						placeholder='Enter description'
						className='h-[250px]'
					/>
				</div>
			</div>

			<EbookComposer control={control} name='ebook' />
			<Button
				size='md'
				isLoading={form.createLoading}
				className='mt-4'
				variant={Object.keys(form.errors).length > 0 ? 'danger' : 'foreground'}
				onClick={form.handleCreate}>
				Create
			</Button>
		</div>
	)
}
