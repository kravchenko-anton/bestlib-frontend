import { FullBookCount } from 'api-client/models'
import dayjs from 'dayjs'
import type { FC } from 'react'

interface InfoBlockProperties {
	_count: FullBookCount
	createdAt: string
	updatedAt: string
}

const BookStatistic: FC<InfoBlockProperties> = ({
	_count,
	createdAt,
	updatedAt
}) => (
	<div className='border-bordered my-2 rounded border-[1px] p-2'>
		<p className='text-md mb-1 flex justify-between'>
			finished By:
			<b className='text-white'> {_count.finishedBy}</b>
		</p>
		<p className='text-md mb-1 flex justify-between '>
			saved By: <b className='font-mono text-white'> {_count.savedBy}</b>
		</p>

		<p className='text-md border-bordered text-md mb-1 flex justify-between border-b-2  pb-1'>
			reading By:
			<b className='font-mono text-white'> {_count.readingBy}</b>
		</p>

		<p className='text-md mb-1 flex justify-between '>
			create At:
			<b className='font-mono text-white'>
				{dayjs(createdAt)
					.format('MMMM D, YYYY')}
			</b>
		</p>
		<p className='text-md flex justify-between '>
			update At:
			<b className='font-mono text-white'>
				{dayjs(updatedAt)
					.format('MMMM D, YYYY')}
			</b>
		</p>
	</div>
)

export default BookStatistic
