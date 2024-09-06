import { HtmlInfoChart } from '@/app/admin/book/_components/charts/html-info-chart';
import { Button } from '@/components/ui';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Loader from '@/components/ui/loader/loader';
import api from '@/services/api';
import { useQuery } from '@tanstack/react-query';
import * as React from 'react';
import { type FC, useRef } from 'react';
import { reactions } from '../../../../../backend/src/book/ebook/helpers/reactions';
import { QueryKeys } from '@/utils/query-keys';
import { getTagColor } from '@/app/admin/book/_components/getTagColor';

interface EbookInfoProperties {
	bookId: string
}
const getAllImages = (ebookFile: string) => {
	const parser = new DOMParser()
	const htmlDocument = parser.parseFromString(ebookFile, 'text/html')
	const images = htmlDocument.querySelectorAll('img')
	return [...images].map(image => ({
		src: image.src,
		id: image.id
	}))
}
const skipTags = ['P', 'SPAN', 'BODY', 'HTML', 'HEAD', 'DIV']

const BookOverview: FC<EbookInfoProperties> = ({ bookId }) => {
	const { data: ebook } = useQuery({
		queryKey: QueryKeys.ebook.byId(bookId),
		queryFn: () => api.ebook.ebookById(bookId),
		enabled: !!bookId,
		select: data => data.data
	})
	const reference = useRef<HTMLParagraphElement>(null)
	if (!ebook) return <Loader />
	return (
		<div className='mt-4 p-2'>
			<div className=' mb-4 block justify-between gap-10  md:flex'>
				<HtmlInfoChart
					data={Object.entries(
						[
							...new DOMParser()
								.parseFromString(ebook.file, 'text/html')
								.querySelectorAll('*')
						]
							.map(tag => tag.nodeName)
							.reduce((accumulator, tag) => {
								if (skipTags.includes(tag)) return accumulator
								// @ts-ignore
								accumulator[tag] = accumulator[tag] ? accumulator[tag] + 1 : 1
								return accumulator
							}, {})
					).map(([name, value]) => ({ name, value, fill: getTagColor(name) }))}
				/>

				<Card className='mt-4 md:mt-0 md:w-[80%]'>
					<CardHeader className='items-center pb-0'>
						<CardTitle>
							Image Gallery{' '}
							<span className='text-muted-foreground'>(by count)</span>
						</CardTitle>
						<CardDescription>
							Shows the images used in the document
						</CardDescription>
					</CardHeader>
					<div className='border-bordered mb-4 flex gap-5 overflow-scroll p-2'>
						{getAllImages(ebook.file).map(image => {
							if (image.src.includes(ebook.picture)) return
							if (reactions.some(reaction => reaction.gif === image.src)) return
							if (['text-menu-share', 'text-menu-translate'].includes(image.id))
								return
							return (
								<img
									src={image.src}
									key={image.src}
									height={200}
									className='pointer-events-none h-[300px] object-contain'
								 />
							)
						})}
					</div>
				</Card>
			</div>
			<div className='mt-8 flex gap-2 overflow-auto pb-4'>
				{ebook.chapters?.map(({ children }) =>
					children.map(({ name, link }) => (
						<Button
							key={link}
							size={'sm'}
							className='h-[40px] w-full min-w-[300px]'
							onClick={() => {
								window.location.href = '#' + link
							}}>
							{name}
						</Button>
					))
				)}
			</div>
			<div className='border-bordered text-gray mb-4 w-full rounded border-[1px] p-2'>
				<div
					ref={reference}
					dangerouslySetInnerHTML={{
						__html: ebook.file
					}}
				/>
			</div>
		</div>
	)
}

export default BookOverview
