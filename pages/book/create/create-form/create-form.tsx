import { Button, Field, FormTextArea } from '@/components/ui';
import type { FC } from 'react';
import { Star } from '@/icons/star';
import { useCreateForm } from '@/pages/book/create/create-form/useCreateForm';
import SelectGenres from '@/pages/book/components/select-genres';
import EbookComposer from '@/pages/book/components/ebook-creator/editor';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Controller } from 'react-hook-form';
import { AuthorSelect } from '@/pages/book/components/author-select/author-select';
import { SelectPicture } from '@/pages/book/components/select-picture';

export const CreateBookForm: FC = () => {
	const { control, ...form } = useCreateForm()

	return (
		<div>
			<div className='mb-4 justify-between gap-5  md:flex'>
				<div>
					<div>
						<h1 className='mt-2  text-xl'>Cover</h1>

						<SelectPicture folder='booksCovers' name='picture' control={control} />

						<h1 className='mb-2 mt-2  text-xl'>Genres</h1>

						<SelectGenres name='genres' control={control} />
					</div>
				</div>
				<div className="w-11/12">
					<div className="mt-2  gap-3 md:flex">
						<div className=" md:w-1/2">
							<h1 className="my-2">Title</h1>
							<Field
								type="text"
								control={control}
								name="title"
								placeholder="Title"
							/>
						</div>

						<div className="md:w-1/4">
							<h1 className="my-2">Rating</h1>
							<Field
								icon={Star}
								type="number"
								control={control}
								name="rating"
								placeholder="Rating"
								min={1}
								max={5}
							/>
						</div>
						<div className="md:w-1/4">
							<h1 className="my-2">Author picker</h1>
							<Controller
								control={control}
								name={'authorId'}
								render={({ field: { value, onChange, onBlur } }) =>  (
									<AuthorSelect value={value} onChange={onChange} />
								)}
							/>

						</div>
						<div className="md:w-1/4">
							<h1 className="my-2">Age</h1>
							<Controller
								control={control}
								name={'age'}
								render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
									<Select  defaultValue='all' value={value} onValueChange={onChange}>
										<SelectTrigger className="w-[180px]">
											<SelectValue placeholder="Select a age" />
										</SelectTrigger>
										<SelectContent defaultValue='all'>
											<SelectGroup>
												<SelectItem value="all">all</SelectItem>
												<SelectItem value="kids">kids</SelectItem>
												<SelectItem value="teens">teens</SelectItem>
												<SelectItem value="adults">adults</SelectItem>

											</SelectGroup>
										</SelectContent>
									</Select>
								)}
							/>

						</div>
					</div>
					<h1 className="mb-2 mt-4">Slug</h1>
					<Field
						type="string"
						control={control}
						name="slug"
						placeholder="Slug"
					/>
					<div className="flex gap-5 justify-between">
						<div className="w-full">
							<h1 className="mb-2 mt-4">Description</h1>
							<FormTextArea
								control={control}
								name="description"
								placeholder="Enter description"
								className="h-[100px]"
							/>
						</div>
						<div className="w-full">
							<h1 className="mb-2 mt-4">concept</h1>
							<FormTextArea
								control={control}
								name="concept"
								placeholder="Enter concept"
								className="h-[100px]"
							/>
						</div>
						<div className="w-full">
							<h1 className="mb-2 mt-4">summary</h1>
							<FormTextArea
								control={control}
							name="summary"
							placeholder="Enter summary"
							className="h-[100px]"
						/></div>
					</div>

				</div>
			</div>

			<EbookComposer control={control} name="chapters" />
			<Button
				size="md"
				isLoading={form.createLoading}
				className="mt-4"
				variant={Object.keys(form.errors).length > 0 ? 'danger' : 'foreground'}
				onClick={form.handleCreate}>
				Create
			</Button>
		</div>
	)
}
