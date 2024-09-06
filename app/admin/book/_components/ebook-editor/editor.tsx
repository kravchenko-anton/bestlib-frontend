import { TrimContentMenu } from '@/app/admin/book/_components/ebook-editor/trim-content-menu';
import { useBookCompose } from '@/app/admin/book/_components/ebook-editor/useBookCompose';
import { DropZone, Input, TextArea } from '@/components/ui';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import ErrorMessage from '@/components/ui/error-message/error-message';
import { cn } from '@/utils';
import { TapComponent } from '@/utils/framer-animation';
import { errorToast, successToast } from '@/utils/toast';

import * as React from 'react';
import { useState } from 'react';
import { Controller } from 'react-hook-form';
import { Pie, PieChart } from 'recharts';
import { BaseFieldProperties } from '@/types/form-types';
import { postProcessingHtml } from '../../../../../../backend/src/utils/common/html-validation';
import { HardDriveDownload } from '@/icons/hard-drive-download';
import { Copy } from '@/icons/copy';
import { HardDriveUpload } from '@/icons/hard-drive-upload';
import { Close } from '@/icons/close';
import { Trash } from '@/icons/trash';
import { CaseSensitive } from '@/icons/case-sensitive';
import { ChevronUp } from '@/icons/chevron-up';
import { ChevronDown } from '@/icons/chevron-down';
import { Combine } from '@/icons/combine';
import { UnfoldOutputImagesInner } from 'api-client/models';
import { getTagColor } from '@/app/admin/book/_components/getTagColor';

const EbookComposer = <T extends Record<string, any>>({
	control,
	name
}: BaseFieldProperties<T>) => (
	<Controller
		control={control}
		name={name}
		render={({ field: { value = [], onChange }, fieldState: { error } }) => {
			const [images, setImages] = useState<
				(UnfoldOutputImagesInner & { isUploaded: boolean })[]
			>([])
			const { books } = useBookCompose({
				ebooks: value,
				setEBooks: onChange,
				setImages,
				images
			})
			const data =
				books.state.length === 0
					? []
					: Object.entries(
							[
								...new DOMParser()
									.parseFromString(
										books.state
											.map(book =>
												book.chapters
													.map(chapter => `${chapter.text}`.trim())
													.join('')
											)
											.join(''),
										'text/html'
									)
									.querySelectorAll('*')
							]
								.map(tag => tag.nodeName)
								.reduce((accumulator, tag) => {
									if (tag === 'P') return accumulator
									if (tag === 'SPAN') return accumulator
									if (tag === 'BODY') return accumulator
									if (tag === 'HTML') return accumulator
									if (tag === 'HEAD') return accumulator
									// @ts-ignore
									accumulator[tag] = accumulator[tag] ? accumulator[tag] + 1 : 1
									return accumulator
								}, {})
						).map(([name, value]) => ({ name, value, fill: getTagColor(name) }))
			return (
				<div className='md:w-max md:overflow-y-scroll '>
					<div className='mb-4'>
						<div className='mb-4  block w-max justify-between gap-10  md:flex'>
							<div className='mb-4 md:mb-0'>
								<h1 className='mt-2  text-xl'>Book file</h1>
								<div className='flex items-center justify-between'>
									<div className='flex items-end gap-2'>
										<DropZone
											multiple
											size='sm'
											accept='.epub'
											disabled={books.unfoldLoading}
											onDropFile={files => {
												books.upload(files)
											}}
											onFileDelete={(_file, index) => {
												if (!books.state[index]?.id) return
												books.delete({
													bookId: books.state[index]?.id || ''
												})
											}}
										/>
										<TapComponent>
											<div
												title='download ebook (for validation)'

											>

											<HardDriveDownload
												width={33}
												height={33}
												className='bg-foreground border-bordered cursor-pointer rounded border-[1px] p-1.5'
												onClick={books.unStashEBook}
											/>
											</div>
										</TapComponent>
										<TapComponent>
											<div 	title='download ebook (for validation)'>

											<Copy
												width={33}
												height={33}

												className='bg-bordered border-bordered cursor-pointer rounded border-[1px] p-1.5'
												onClick={() => {
													navigator.clipboard.writeText(
														JSON.stringify(
															postProcessingHtml(
																books.state
																	.map(book =>
																		book.chapters
																			.map(chapter => `${chapter.text}`.trim())
																			.join('')
																	)
																	.join('')
															)
														)
													)
													successToast('Ebook copied to clipboard')
												}}
											/>

											</div>
										</TapComponent>
										<TapComponent

										>
											<div
												title='Stash eBook (save current book state to storage)'
											>

											<HardDriveUpload
												width={33}
												height={33}
												className='bg-bordered border-bordered cursor-pointer rounded border-[1px] p-1.5'
												onClick={books.stashEBook}
											/>
											</div>
										</TapComponent>
									</div>
								</div>
							</div>
							<Card
								className={cn(
									'flex flex-col',
									books.state.length === 0 ? 'hidden' : 'block'
								)}>
								<CardHeader className='items-center pb-0'>
									<CardTitle>
										HTML Elements{' '}
										<span className='text-muted-foreground'>(by count)</span>
									</CardTitle>
									<CardDescription>
										Shows the count of HTML elements used in the document
									</CardDescription>
								</CardHeader>
								<CardContent className='flex-1 pb-0'>
									<ChartContainer
										className='mx-auto aspect-square max-h-[250px]'
										config={{}}>
										<PieChart>
											<ChartTooltip
												cursor={false}
												content={<ChartTooltipContent hideLabel />}
											/>
											<Pie
												data={data}
												dataKey='value'
												nameKey='name'
												innerRadius={60}
												strokeWidth={5}
											/>
										</PieChart>
									</ChartContainer>
								</CardContent>
								<CardFooter className='flex-col gap-2 text-sm'>
									<div className='flex items-center font-medium leading-none'>
										All HTML elements used is{' '}
										{data.reduce(
											(accumulator, { value }) => accumulator + Number(value),
											0
										)}
									</div>
									<div className='text-gray flex items-center justify-center gap-2 text-center leading-none'>
										<p className='text-gray font-mono'>
											{data.map(({ name }) => name).join(', ')}
										</p>
									</div>
								</CardFooter>
							</Card>
						</div>

						<div
							className='mb-4 gap-2'
							style={{
								display: images.length > 0 ? 'flex' : 'none'
							}}>
							{images.map(value => (
								<div
									key={value.id}
									className='border-bordered relative h-max min-w-[250px] rounded border-[1px]'>
									<img
										alt={value.href}
										className=' relative h-[300px]    object-contain transition-transform duration-200 ease-linear'
										width={400}
										height={400}
										src={`data:${value.mimeType};base64,${value.data}`}
									/>
									<Close
										color='red'
										className='bg-muted absolute right-4 top-4 h-[40px] w-[40px] cursor-pointer rounded p-2'
										style={{
											opacity: books.isImageComponentExist(value.id, value.href)
												? 0
												: 1
										}}
									/>

									<div className=' flex w-full  justify-between p-2'>
										<p className='text-wrap	mb-2	whitespace-normal	 break-all'>
											{value.id}
										</p>
										<div className='flex items-center gap-5'>
											<HardDriveUpload
												className='cursor-pointer'
												style={{
													opacity: value.isUploaded ? 0.5 : 1
												, pointerEvents: value.isUploaded ? 'none' : 'auto'
												}}
												onClick={async () => {
													await books.uploadImageToServer({
														imageId: value.id,
														imageAlt: value.href
													})
												}}
											/>

											<Trash
												className='cursor-pointer'
												onClick={() => {
													books.removeImageFromContentById({
														imageId: value.id,
														imageAlt: value.href
													})
												}}
											/>
										</div>
									</div>
								</div>
							))}
						</div>

						<div className='md:flex md:w-fit'>
							{books.state.map((book, bookIndex) => {
								// @ts-ignore
								const bookError = error?.[bookIndex]
								return (
									<div
										key={book.title}
										className='bg-foreground border-bordered mb-4 w-full rounded border-[1px] p-2 pt-4 md:mr-1 md:w-[600px]'>
										<div className='mb-2 flex h-9 items-center  justify-between gap-1'>
											<Input
												variant='muted'
												className='mr-2 h-full w-full flex-1'
												defaultValue={book.title}
												onBlur={event =>
													books.updateBookTitle({
														bookId: book.id,
														value: event.target.value
													})
												}
											/>
											<ErrorMessage message={bookError?.title?.message} />
											<div className='flex items-center gap-2'>
												<Close
													width={33}
													height={33}
													className='bg-muted border-bordered h-full w-[35px] cursor-pointer rounded border-[1px] p-1.5'
													onClick={() => {
														books.delete({
															bookId: book.id
														})
													}}
												/>

												<TrimContentMenu
													onSubmit={data => {
														books.trimmingEBookContent({
															bookId: book.id,
															startLine: data.startLine,
															endLine: data.endLine
														})
													}}
												/>

												<CaseSensitive
													width={33}
													height={33}
													className='bg-muted border-bordered h-full w-[35px] cursor-pointer rounded border-[1px] p-1.5'
													onClick={() => {
														books.generateChapterNames({
															bookId: book.id
														})
														console.log('generate chapters names')
													}}
												/>
											</div>
										</div>
										{book.chapters.map((chapter, chapterIndex) => {
											const chapterError = bookError?.chapters?.[chapterIndex]
											return (
												<div
													key={chapter.id}
													className='bg-muted mb-2 rounded p-2'>
													<div className='mb-2 flex w-full items-center justify-between gap-2'>
														<Input
															variant='foreground'
															value={chapter.name}
															onChange={event => {
																books.updateToc({
																	bookId: book.id,
																	chapterId: chapter.id,
																	value: {
																		name: event.target.value
																	}
																})
															}}
														/>
														<ErrorMessage
															message={chapterError?.name?.message}
														/>
														<div className='flex gap-2'>
															<ChevronUp
																width={34}
																height={34}
																className='bg-foreground border-bordered cursor-pointer rounded border-[1px] p-1.5'
																onClick={() => {
																	if (!book.chapters[chapterIndex - 1]?.id)
																		return errorToast('Cannot move chapter up')
																	books.mergeContentWithTopCharacter({
																		bookId: book.id,
																		insertedContent: chapter.text,

																		topChapterId:
																			book.chapters[chapterIndex - 1]?.id || ''
																	})
																}}
															/>
															<ChevronDown
																width={34}
																height={34}
																className='bg-foreground border-bordered cursor-pointer rounded border-[1px] p-1.5'
																onClick={() => {
																	books.addNewCharacterAfterContent({
																		bookId: book.id,
																		chapterId: chapter.id
																	})
																	console.log('add new character')
																}}
															/>
															<Combine
																width={34}
																height={34}
																className='bg-foreground border-bordered cursor-pointer rounded border-[1px] p-1.5'
																onClick={() => {
																	console.log('combine')
																	books.moveChaptersToNewBook({
																		bookId: book.id,
																		chapterId: chapter.id
																	})
																}}
															/>
															<Close
																width={34}
																height={34}
																className='bg-foreground border-bordered cursor-pointer rounded border-[1px] p-1.5'
																onClick={() => {
																	books.removeToc(book.id, chapter.id)
																	console.log('remove toc')
																}}
															/>
														</div>
													</div>

													<div>
														<TextArea
															value={chapter.text}
															variant='foreground'
															className=' min-h-[250px] w-full rounded px-4 py-2 font-mono text-sm duration-200 ease-linear'
															onChange={event => {
																books.updateToc({
																	chapterId: chapter.id,
																	value: {
																		text: event.target.value
																	},
																	bookId: book.id
																})
															}}
														/>
														<ErrorMessage
															message={chapterError?.text?.message}
														/>
													</div>
												</div>
											)
										})}
									</div>
								)
							})}
						</div>
					</div>
				</div>
			)
		}}
	/>
)

export default EbookComposer
