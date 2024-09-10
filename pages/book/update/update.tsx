import { Button, Field, FormTextArea } from '@/components/ui';
import Loader from '@/components/ui/loader/loader';
import { Star } from '@/icons/star';
import { SelectPicture } from '@/pages/book/components/select-picture';
import SelectGenres from '@/pages/book/components/select-genres';
import { UpdatableChapter } from '@/pages/book/update/updatable-chapter';
import { useUpdateBook } from '@/pages/book/update/useUpdateBook';
import { AuthorSelect } from '@/pages/book/components/author-select/author-select';
import { Controller } from 'react-hook-form';

export interface UpdateBookProperties {
	bookId: string;
}

export const UpdateBook = ({bookId}:UpdateBookProperties) => {
const {book,ebook,control, updateBook,updateChapter,updateLoading,handleUpdate,errors} = useUpdateBook({bookId})
	if (!book || !ebook ) return <Loader />
	return (
		<div>
			<div className='mb-4 justify-between gap-5  md:flex'>
				<div>
					<div>
						<h1 className='mt-2  text-xl'>Cover</h1>
						<SelectPicture name='picture' control={control} folder='booksCovers' />
						<h1 className='my-1'>Genres</h1>

						<SelectGenres name='genres' control={control} />
						<div className='mt-2 flex items-center justify-between'>
							<h1 className=''>Visibility</h1>
							<Button
								size={'sm'}
								variant={book.isRecommendable ? 'success' : 'warning'}
								isLoading={updateLoading}
								onClick={async () => {
									await updateBook({
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
								variant={book.isRecommendable ? 'muted' : 'danger'}
								onClick={async () => {
									await updateBook({
										isRecommendable: !book.isRecommendable
									})
								}}>
								{book.isRecommendable ? 'Disable' : 'Enable'}
							</Button>
						</div>
					</div>
				</div>
				<div className="w-10/12">
					<div className="mt-2 gap-3 md:flex">
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
							<h1 className="my-2">Author picker</h1>
							<Controller
								control={control}
								name={'authorId'}
								defaultValue={book.authorId}
								render={({ field: { value, onChange } }) =>  (
									<AuthorSelect value={value} onChange={onChange} />
								)}
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
					</div>
					<div className="flex gap-2 justify-between">
						<div className="w-full">
							<h1 className="my-2">Summary</h1>
							<FormTextArea
								control={control}
								name="summary"
								placeholder="Enter summary"
								className="h-[240px]"
							/>
						</div>
						<div className='w-full'>
							<h1 className="my-2">Concept</h1>
							<FormTextArea
								control={control}
								name="concept"
								placeholder="Enter description"
								className="h-[240px]"
							/>
						</div>
						<div className='w-full'>
							<h1 className="my-2">Description</h1>
							<FormTextArea
								control={control}
								name="description"
								placeholder="Enter description"
								className="h-[240px]"
							/>
						</div>
					</div>
				</div>
			</div>
			<div className="max-w-screen">
				{ebook.map((chapter) => (
					<UpdatableChapter chapterId={chapter.id} updateChapter={updateChapter} key={chapter.id} {...chapter} />
				))}
			</div>
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
