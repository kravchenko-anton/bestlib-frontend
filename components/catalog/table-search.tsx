import { Field } from '@/components/ui';
import type { FC, PropsWithChildren } from 'react';
import { useForm } from 'react-hook-form';
import { Search } from '@/icons/search';

interface DataTableHeaderProperties {
	onSearchSubmit: (data: { searchTerm: string }) => void
	defaultTerm: string
	title?: string
}
const DataTableHeader: FC<PropsWithChildren<DataTableHeaderProperties>> = ({
	children,
	defaultTerm,
	title = '',
	onSearchSubmit
}) => {
	const { control, handleSubmit } = useForm<{ searchTerm: string }>({
		defaultValues: {
			searchTerm: defaultTerm
		}
	})

	return (
		<div className='flex w-full items-center justify-between  pb-2'>
			<div>
				<h1 className='hidden text-3xl font-medium sm:block'>{title}</h1>
			</div>
			<div className='flex gap-5'>
				<form onSubmit={handleSubmit(onSearchSubmit)}>
					<Field
						control={control}
						icon={Search}
						name='searchTerm'
						placeholder='Explore...'
						type='search'
					/>
				</form>
				{children}
			</div>
		</div>
	)
}

export default DataTableHeader
