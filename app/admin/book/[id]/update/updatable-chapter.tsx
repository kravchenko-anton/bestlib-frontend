import { UpdateChapterDto } from '@/api-client/models'
import { Button, Input, TextArea } from '@/components/ui'
import { Copy } from '@/icons/copy'
import { Settings } from '@/icons/settings'
import { getDirtyFields } from '@/utils/getDirtyValues'
import { successToast } from '@/utils/toast'
import { parse } from 'node-html-parser'
import { useState } from 'react'

interface UpdatableChapterProperties extends UpdateChapterDto{
	updateChapter: (data: UpdateChapterDto & {
		chapterId: string
	}) => void;
	chapterId: string
}
export const UpdatableChapter = ({ updateChapter,  chapterId, ...defaultValue}: UpdatableChapterProperties) => {
		const [value, setValue] = useState<Omit<UpdateChapterDto, 'id'>>(defaultValue)
	console.log('value', value, 'defaultValue', defaultValue)
	const isWasEdited = JSON.stringify(value) !== JSON.stringify(defaultValue)
	
	return <div
		key={chapterId}
		className='bg-muted mb-2 rounded p-2'>
		<div className='mb-2 flex w-full items-center justify-between gap-2'>
			<div className='ml-2 gap-2'>
				<Settings
					width={20}
					height={20}
					onClick={() => {
						const dom = parse(value?.content || "")
						const body = dom.querySelector('body')
						const wordCount = Number(body?.textContent?.split(' ').length)
						const symbolCount = Number(body?.textContent?.length)
						setValue({ ...value, wordCount, symbolCount })
						successToast('Chapter settings updated')
						
					}}
				/>
			</div>
			<div className='ml-2 gap-2'>
				<Copy
					width={20}
					height={20}
					onClick={() => {
						const dom = parse(value?.content || "")
						const body = dom.querySelector('body')
						navigator.clipboard.writeText(body?.textContent || "")
						successToast('Chapter copied to clipboard')
					}}
				/>
			</div>
			<div className=' w-[100px]'>
				<Input
					variant='background'
					className='pl-2 pr-0'
					type='number'
					value={value.position}
					onChange={event => {
						setValue({ ...value, position: Number(event.target.value) })
					}}
				/>
			</div>
			<div className='w-[100px]'>
				<Input
					variant='background'
					type='number'
					className='pl-2 pr-0'
					value={value.symbolCount}
					onChange={event => {
						setValue({ ...value, symbolCount: Number(event.target.value) })
					}}
				/>
			</div>
			<div className=' w-[100px]'>
				<Input
					variant='background'
					type='number'
					className='pl-2 pr-0'
					value={value.wordCount}
					onChange={event => {
						setValue({ ...value, wordCount: Number(event.target.value) })
					}}
				/>
			</div>
			<Input
				variant='foreground'
				value={value.title}
				onChange={event => {
					setValue({ ...value, title: event.target.value })
				}}
			/>
			{
				isWasEdited && <Button size='sm' className='text-sm' variant='foreground' onClick={() => {
					const data = getDirtyFields(defaultValue, value)
					updateChapter({ ...data, chapterId })
				}}>update</Button>
			}
		</div>
		<div>
			<TextArea
				value={value.content}
				variant='foreground'
				className=' min-h-[250px] w-full rounded px-4 py-2 font-mono text-sm duration-200 ease-linear'
				onChange={event => {
					setValue({ ...value, content: event.target.value })
				}}
			/>
		
		</div>
	</div>
}