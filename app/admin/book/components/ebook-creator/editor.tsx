import { HtmlTreeGraph } from '@/app/admin/book/components/ebook-creator/html-tree-graph'
import { TrimContentMenu } from '@/app/admin/book/components/ebook-creator/trim-content-menu'
import { useBookCompose } from '@/app/admin/book/components/ebook-creator/useBookCompose'
import { Button, DropZone, Input, TextArea } from '@/components/ui'
import { CaseSensitive } from '@/icons/case-sensitive'
import { Close } from '@/icons/close'
import { Copy } from '@/icons/copy'
import { HardDriveDownload } from '@/icons/hard-drive-download'
import { HardDriveUpload } from '@/icons/hard-drive-upload'
import { Settings } from '@/icons/settings'

import { BaseFieldProperties } from '@/types/form-types'
import { TapComponent } from '@/utils/framer-animation'
import { successToast } from '@/utils/toast'
import * as React from 'react'
import { Controller } from 'react-hook-form'

const EbookComposer = <T extends Record<string, any>>({
	control,
	name
}: BaseFieldProperties<T>) => (
	<Controller
		control={control}
		name={name}
		render={({ field: { value = [], onChange } }) => {
			// eslint-disable-next-line react-hooks/rules-of-hooks
			const { books } = useBookCompose({
				chapters: value,
				setEBooks: onChange,
			})
			return (
				<div className='md:w-max md:overflow-y-scroll '>
					<div className='mb-4'>
						<div className='mb-4  block w-max justify-between gap-10  md:flex'>
							<div className='mb-4 md:mb-0'>
								<h1 className='mt-2  text-xl'>Book file</h1>
								<div className='flex items-center justify-between'>
									<div className='flex items-end gap-2'>
										<DropZone
											size='sm'
											accept='.epub'
											disabled={books.unfoldLoading}
											onDropFile={files => {
												books.upload(files[0])
											}}
											onFileDelete={(_file, index) => {
												if (!books.state[index]?.id) return
												books.delete()
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
										<TrimContentMenu
											onSubmit={data => {
												books.trimmingEBookContent({
													startLine: data.startLine,
													endLine: data.endLine
												})
											}}
										/>
										</TapComponent>
										<TapComponent>
											<CaseSensitive
												width={33}
												height={33}
												className='bg-muted border-bordered h-full w-[35px] cursor-pointer rounded border-[1px] p-1.5'
												onClick={() => {
													books.generateChapterNames()
													console.log('generate chapters names')
												}}
											/>
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
																books.state
																	.join('')
														)
													)
													successToast('Ebook copied to clipboard')
												}}
											/>
											</div>
										</TapComponent>
										<TapComponent>
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
						 <HtmlTreeGraph  isHidden={books.state.length === 0} htmlTree={value.map(({ content }) => content).join('')} />
						</div>
						<div className='max-w-screen'>
										{books.state.map((chapter) => (
												<div
													key={chapter.id}
													className='bg-muted mb-2 rounded p-2'>
													<div className='mb-2 flex w-full items-center justify-between gap-2'>
														<h1 className='bg-foreground border-2 border-bordered px-2 rounded-full'>
															{chapter.position}
														</h1>
														<Input
															variant='foreground'
															value={chapter.title}
															onChange={event => {
																books.updateToc({
																	chapterId: chapter.id,
																	value: {
																		title: event.target.value
																	}
																})
															}}
														/>

														<div className='flex gap-2 items-center'>
															<h2 className='text-sm w-[200px]'>
																{`${chapter.symbolCount} symbols | ${chapter.wordCount} words`}
															</h2>
															<Close
																width={34}
																height={34}
																className='bg-foreground border-bordered cursor-pointer rounded border-[1px] p-1.5'
																onClick={() => books.removeToc( chapter.id)}
															/>
														</div>
													</div>

													<div>
														<TextArea
															value={chapter.content}
															variant='foreground'
															className=' min-h-[250px] w-full rounded px-4 py-2 font-mono text-sm duration-200 ease-linear'
															onChange={event => {
																books.updateToc({
																	chapterId: chapter.id,
																	value: {
																		content: event.target.value
																	}
																})
															}}
														/>
													
													</div>
												</div>
											))}
							
									<Button icon={Settings} size='md' variant='primary'  className='mt-4' onClick={books.calculateChapters}>
										Calculate chapters data
									</Button>
						</div>
					</div>
				</div>
			)
		}}
	/>
)

export default EbookComposer
