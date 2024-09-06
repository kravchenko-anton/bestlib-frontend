import { cn } from '@/utils'
import type { HTMLAttributes, TdHTMLAttributes, ThHTMLAttributes } from 'react'
import { forwardRef } from 'react'

const Table = forwardRef<HTMLTableElement, HTMLAttributes<HTMLTableElement>>(
	({ className, ...properties }, reference) => (
		<div className='border-bordered border-collapse overflow-auto rounded border-[1px]'>
			<table
				ref={reference}
				className={cn(
					' relative w-full caption-bottom   rounded text-sm',
					className
				)}
				{...properties}
			/>
		</div>
	)
)

Table.displayName = 'Table'

const TableHeader = forwardRef<
	HTMLTableSectionElement,
	HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...properties }, reference) => (
	<thead
		ref={reference}
		className={cn('[&_tr]:border-b', className)}
		{...properties}
	/>
))
TableHeader.displayName = 'TableHeader'

const TableBody = forwardRef<
	HTMLTableSectionElement,
	HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...properties }, reference) => (
	<tbody ref={reference} className={cn('', className)} {...properties} />
))
TableBody.displayName = 'TableBody'

const TableFooter = forwardRef<
	HTMLTableSectionElement,
	HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...properties }, reference) => (
	<tfoot
		ref={reference}
		className={cn(
			' border-[1px] border-t font-medium [&>tr]:last:border-b-0',
			className
		)}
		{...properties}
	/>
))
TableFooter.displayName = 'TableFooter'

const TableRow = forwardRef<
	HTMLTableRowElement,
	HTMLAttributes<HTMLTableRowElement>
>(({ className, ...properties }, reference) => (
	<tr
		ref={reference}
		className={cn(
			' border-bordered bg-foreground  border-[1px]  border-x-0 border-b border-t-0  transition-colors',
			className
		)}
		{...properties}
	/>
))
TableRow.displayName = 'TableRow'

const TableHead = forwardRef<
	HTMLTableCellElement,
	ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...properties }, reference) => (
	<th
		ref={reference}
		className={cn(
			'border-bordered bg-muted overflow-hidden border-b-2 border-t-0 px-3 py-1 text-center align-middle  text-white  [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
			className
		)}
		{...properties}
	/>
))
TableHead.displayName = 'TableHead'

const TableCell = forwardRef<
	HTMLTableCellElement,
	TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...properties }, reference) => (
	<td
		ref={reference}
		className={cn(
			'p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
			className
		)}
		{...properties}
	/>
))
TableCell.displayName = 'TableCell'

const TableCaption = forwardRef<
	HTMLTableCaptionElement,
	HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...properties }, reference) => (
	<caption
		ref={reference}
		className={cn('text-gray mt-4 text-sm', className)}
		{...properties}
	/>
))
TableCaption.displayName = 'TableCaption'

export {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow
}
