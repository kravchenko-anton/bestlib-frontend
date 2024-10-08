import React, { FormEvent, useState } from 'react';
import { Command, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { useDebounce } from '@/hooks/useDebounce';
import { QueryKeys } from '@/utils/query-keys';
import api from '@/services/api';
import { useQuery } from '@tanstack/react-query';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { errorToast } from '@/utils/toast';

export interface AuthorSelectProperties {
	onChange?: (value: FormEvent<HTMLDivElement>) => void
	value: string | undefined
}

export const AuthorSelect = ({onChange, value}:AuthorSelectProperties) => {
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const [commandInput, setCommandInput] = useState<string>("")
	const debounceInput = useDebounce(commandInput,300)
	const {
		data: authors,
	} = useQuery({
		queryKey: QueryKeys.searchByTerm(debounceInput),
		queryFn: () => api.author.catalog(debounceInput,0),
		enabled: !!debounceInput && debounceInput.length >= 3,
		select: data => data.data
	})
	console.log(authors)
	return  <Popover open={isOpen} onOpenChange={setIsOpen}>
		<PopoverTrigger asChild>
			<p
				className="justify-between border-bordered border-2 rounded-md p-1 cursor-pointer"
			>
				{
					value ?? "Select author"
				}
			</p>
		</PopoverTrigger>
		<PopoverContent className="w-[400px] p-0">
	<Command shouldFilter={false} className="rounded-lg border shadow-md" >
			<CommandInput placeholder="type to find authors" value={commandInput} onValueChange={setCommandInput} />
		<CommandList>
				{
					authors?.data.map((result) => <CommandItem
						onSelect={() => {
							if (value === result.id) return errorToast("Author already selected")
							setIsOpen(false)
							onChange?.({target: {value: result.id}} as unknown as FormEvent<HTMLDivElement>)
						}}
						key={result.id} value={result.id}>
						{result.name} {
							value === result.id && <span className="text-xs text-danger ml-auto">Selected</span>
					}
					</CommandItem>)
				}
		</CommandList>
	</Command>
		</PopoverContent>
	</Popover>

}