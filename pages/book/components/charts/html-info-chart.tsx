'use client'

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/components/ui/card'
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent
} from '@/components/ui/chart'
import * as React from 'react'
import { Pie, PieChart } from 'recharts'

export const HtmlInfoChart = ({
	data
}: {
	data: {
		name: string
		value: unknown
	}[]
}) => (
	<Card className='flex flex-col'>
		<CardHeader className='items-center pb-0'>
			<CardTitle>
				HTML Elements <span className='text-muted-foreground'>(by count)</span>
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
)
