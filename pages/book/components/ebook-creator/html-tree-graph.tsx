import { getTagColor } from '@/pages/book/components/getTagColor';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/utils';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Pie, PieChart } from 'recharts';
import { skipTags } from '@/pages/book/components/ebook-reader/ebook-reader';

interface HtmlTreeGraphProperties {
	htmlTree: string
	isHidden: boolean
}


export const HtmlTreeGraph = ({ htmlTree,isHidden }: HtmlTreeGraphProperties) => {
	const data = Object.entries(
		[
			...new DOMParser()
				.parseFromString(htmlTree, 'text/html')
				.querySelectorAll('*')
		]
			.map(tag => tag.nodeName)
			.reduce((accumulator, tag) => {
				if (skipTags.has(tag))
					return accumulator
				// @ts-ignore
				accumulator[tag] = accumulator[tag] ? accumulator[tag] + 1 : 1
				return accumulator
			}, {})
	).map(([name, value]) => ({ name, value, fill: getTagColor(name) }))
	return 		<Card
		className={cn(
			'flex flex-col',
			isHidden ? 'hidden' : 'block'
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
}