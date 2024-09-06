'use client';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import { cn } from '@/utils';

import type { DialogProps } from '@radix-ui/react-dialog';
import { Command as CommandPrimitive } from 'cmdk';
import type { ComponentPropsWithoutRef, ElementRef, HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { Search } from '@/icons/search';

const Command = forwardRef<
	ElementRef<typeof CommandPrimitive>,
	ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...properties }, reference) => (
	<CommandPrimitive
		ref={reference}
		className={cn(
			'bg-foreground text-gray flex h-full w-full flex-col overflow-hidden rounded',
			className
		)}
		{...properties}
	/>
))

Command.displayName = CommandPrimitive.displayName

type CommandDialogProperties = DialogProps

const CommandDialog = ({
	children,
	...properties
}: CommandDialogProperties) => (
	<Dialog {...properties}>
		<DialogContent className='overflow-hidden p-0'>
			<Command className='[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-white [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5'>
				{children}
			</Command>
		</DialogContent>
	</Dialog>
)

const CommandInput = forwardRef<
	ElementRef<typeof CommandPrimitive.Input>,
	ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...properties }, reference) => (
	<div className='border-bordered flex items-center border-b px-3'>
		<Search className='mr-2 h-4 w-4 shrink-0 opacity-50' />
		<CommandPrimitive.Input
			ref={reference}
			className={cn(
				'flex h-10 w-full rounded bg-transparent py-3 text-sm outline-none placeholder:text-white disabled:cursor-not-allowed disabled:opacity-50',
				className
			)}
			{...properties}
		/>
	</div>
))

CommandInput.displayName = CommandPrimitive.Input.displayName

const CommandList = forwardRef<
	ElementRef<typeof CommandPrimitive.List>,
	ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...properties }, reference) => (
	<CommandPrimitive.List
		ref={reference}
		className={cn('max-h-[300px] overflow-y-auto overflow-x-hidden', className)}
		{...properties}
	/>
))

CommandList.displayName = CommandPrimitive.List.displayName

const CommandEmpty = forwardRef<
	ElementRef<typeof CommandPrimitive.Empty>,
	ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>((properties, reference) => (
	<CommandPrimitive.Empty
		ref={reference}
		className='py-6 text-center text-sm'
		{...properties}
	/>
))

CommandEmpty.displayName = CommandPrimitive.Empty.displayName

const CommandGroup = forwardRef<
	ElementRef<typeof CommandPrimitive.Group>,
	ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...properties }, reference) => (
	<CommandPrimitive.Group
		ref={reference}
		className={cn(
			'text-gray overflow-hidden p-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-white',
			className
		)}
		{...properties}
	/>
))

CommandGroup.displayName = CommandPrimitive.Group.displayName

const CommandSeparator = forwardRef<
	ElementRef<typeof CommandPrimitive.Separator>,
	ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...properties }, reference) => (
	<CommandPrimitive.Separator
		ref={reference}
		className={cn('bg-bordered -mx-1 h-px', className)}
		{...properties}
	/>
))
CommandSeparator.displayName = CommandPrimitive.Separator.displayName

const CommandItem = forwardRef<
	ElementRef<typeof CommandPrimitive.Item>,
	ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...properties }, reference) => (
	<CommandPrimitive.Item
		ref={reference}
		className={cn(
			'aria-selected:bg-muted aria-selected:text-gray relative flex cursor-default select-none items-center rounded px-2 py-1.5 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
			className
		)}
		{...properties}
	/>
))

CommandItem.displayName = CommandPrimitive.Item.displayName

const CommandShortcut = ({
	className,
	...properties
}: HTMLAttributes<HTMLSpanElement>) => (
	<span
		className={cn('text-gray ml-auto text-xs tracking-widest', className)}
		{...properties}
	/>
)
CommandShortcut.displayName = 'CommandShortcut'

export {
	Command,
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
	CommandShortcut
}
