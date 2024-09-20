import { Button, Field } from '@/components/ui'

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Scissors } from '@/icons/scissors'
import { zodResolver } from '@hookform/resolvers/zod'
import type { FC } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

interface TrimContentButtonProperties {
	onSubmit: (data: parseValidationType) => void
}

const trimValidation = z.object({
	startLine: z.number().int(),
	endLine: z.number().int()
})

type parseValidationType = z.infer<typeof trimValidation>

export const TrimContentMenu: FC<TrimContentButtonProperties> = ({
	onSubmit
}) => {
	const { control, handleSubmit } = useForm<parseValidationType>({
		resolver: zodResolver(trimValidation)
	})

	return (
		<Popover>
			<PopoverTrigger className='h-[28px]'>
				<Scissors
					width={33}
					height={33}
					className='bg-muted border-bordered cursor-pointer rounded border-[1px] p-1.5'
				/>
			</PopoverTrigger>

			<PopoverContent className='p-4'>
				<div className=''>
					<h4 className='font-medium leading-none'>Trim text</h4>
					<p className='text-muted-foreground pb-2 text-sm'>
						Trim text from start to end line
					</p>
				</div>

				<Field
					variant='muted'
					control={control}
					type='number'
					name={'startLine'}
					placeholder={'Start line'}
				/>

				<Field
					variant='muted'
					control={control}
					className='my-2'
					name={'endLine'}
					type='number'
					placeholder={'end line'}
				/>
				<Button variant='primary' size={'sm'} onClick={handleSubmit(onSubmit)}>
					Trim content
				</Button>
			</PopoverContent>
		</Popover>
	)
}
