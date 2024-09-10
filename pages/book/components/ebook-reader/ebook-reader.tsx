import { Button } from '@/components/ui';
import Loader from '@/components/ui/loader/loader';
import * as React from 'react';
import { type FC } from 'react';
import { EbookOutput } from '@/api-client';

interface EbookInfoProperties {
	ebook: EbookOutput | undefined
}

export const skipTags = new Set(['P', 'SPAN', 'BODY', 'HTML', 'HEAD', 'DIV'])

const EbookReader: FC<EbookInfoProperties> = ({ ebook }) => {

	if (!ebook) return <Loader />
	return (
		<div className='mt-4 p-2'>

			<div className='mt-8 flex gap-2 overflow-auto pb-4'>
				{ebook.chapters?.map(({ title,link }) =>
						<Button
							key={link}
							size={'sm'}
							className='h-[40px] w-full min-w-[300px]'
							onClick={() => {
								window.location.href = '#' + link
							}}>
							{title}
						</Button>
				)}
			</div>
			<div className='border-bordered text-gray mb-4 w-full rounded border-[1px] p-2'>
				<div
					dangerouslySetInnerHTML={{
						__html: ebook.file
					}}
				/>
			</div>
		</div>
	)
}

export default EbookReader
