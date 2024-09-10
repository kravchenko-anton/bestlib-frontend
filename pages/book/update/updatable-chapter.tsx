import { Button, Input, TextArea } from '@/components/ui';
import { UpdateChapterDto } from '@/api-client/models';
import { useState } from 'react';
import { getDirtyFields } from '@/utils/getDirtyValues';

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
		<div className="mb-2 flex w-full items-center justify-between gap-2">
			<div className="ml-2 w-[80px] gap-2">
				<Input
					variant="background"
					type='number'
				value={value.position}
					onChange={event => {
						setValue({...value, position: Number(event.target.value)})
					}}
				/>
			</div>
			<Input
				variant="foreground"
				value={value.title}
				onChange={event => {
					setValue({...value, title: event.target.value })
				}}
			/>
			{
				isWasEdited && <Button size='sm' className="text-sm" variant='foreground' onClick={() => {
					const data = getDirtyFields(defaultValue,value)
					updateChapter({...data, chapterId})
				}}>update</Button>
			}
		</div>
		<div>
			<TextArea
				value={value.content}
				variant="foreground"
				className=' min-h-[250px] w-full rounded px-4 py-2 font-mono text-sm duration-200 ease-linear'
				onChange={event => {
					setValue({...value, content: event.target.value})
				}}
			/>

		</div>
	</div>
}