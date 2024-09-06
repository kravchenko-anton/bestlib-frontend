'use client';

import type { DialogProperties } from '@/components/ui/base-components-types';
import { cn } from '@/utils';
import * as SheetPrimitive from '@radix-ui/react-dialog';
import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentPropsWithoutRef, ElementRef, FC, HTMLAttributes, PropsWithChildren } from 'react';
import { forwardRef } from 'react';
import { Close } from '@/icons/close';

const Sheet = SheetPrimitive.Root

const SheetPortal = SheetPrimitive.Portal

const SheetOverlay = forwardRef<
	ElementRef<typeof SheetPrimitive.Overlay>,
	ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, ...properties }, reference) => (
	<SheetPrimitive.Overlay
		className={cn(
			'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0  fixed inset-0 z-50 ',
			className
		)}
		{...properties}
		ref={reference}
	/>
))
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName

const sheetVariants = cva(
	'fixed z-50 gap-4 bg-foreground p-2 md:p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500',
	{
		variants: {
			side: {
				top: 'inset-x-0 top-0 border-b  border-foreground data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top',
				bottom:
					'inset-x-0 bottom-0 border-t border-foreground data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom',
				left: 'inset-y-0 left-0 h-full w-3/4 border-foreground border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm',
				right:
					'inset-y-0 right-0 h-full w-full md:w-3/4 border-l border-foreground data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right md:max-w-lg sm:max-w-sm'
			}
		},
		defaultVariants: {
			side: 'right'
		}
	}
)

interface SheetContentProperties
	extends ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
		VariantProps<typeof sheetVariants> {}

const SheetContent = forwardRef<
	ElementRef<typeof SheetPrimitive.Content>,
	SheetContentProperties
>(({ side = 'right', className, children, ...properties }, reference) => (
	<SheetPortal>
		<SheetOverlay />
		<SheetPrimitive.Content
			ref={reference}
			className={cn(sheetVariants({ side }), className)}
			{...properties}>
			{children}
			<SheetPrimitive.Close className='ring-offset-background focus:ring-ring data-[state=open]:bg-primary absolute right-4 top-4 rounded opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none'>
				<Close className='h-4 w-4' />
				<span className='sr-only'>Close</span>
			</SheetPrimitive.Close>
		</SheetPrimitive.Content>
	</SheetPortal>
))
SheetContent.displayName = SheetPrimitive.Content.displayName

const SheetHeader = ({
	className,
	...properties
}: HTMLAttributes<HTMLDivElement>) => (
	<div
		className={cn('flex flex-col space-y-2 text-left ', className)}
		{...properties}
	/>
)
SheetHeader.displayName = 'SheetHeader'

const SheetFooter = ({
	className,
	...properties
}: HTMLAttributes<HTMLDivElement>) => (
	<div
		className={cn(
			'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
			className
		)}
		{...properties}
	/>
)
SheetFooter.displayName = 'SheetFooter'

const SheetTitle = forwardRef<
	ElementRef<typeof SheetPrimitive.Title>,
	ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...properties }, reference) => (
	<SheetPrimitive.Title
		ref={reference}
		className={cn('text-foreground text-lg font-semibold', className)}
		{...properties}
	/>
))
SheetTitle.displayName = SheetPrimitive.Title.displayName

const SheetDescription = forwardRef<
	ElementRef<typeof SheetPrimitive.Description>,
	ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...properties }, reference) => (
	<SheetPrimitive.Description
		ref={reference}
		className={cn('text-muted-foreground text-sm', className)}
		{...properties}
	/>
))
SheetDescription.displayName = SheetPrimitive.Description.displayName

const SheetComponent: FC<PropsWithChildren<DialogProperties>> = ({
	children,
	isOpen = false,
	onClose = () => null
}) => (
	<Sheet open={isOpen} onOpenChange={onClose}>
		<SheetPortal>
			<SheetContent>{children}</SheetContent>
		</SheetPortal>
	</Sheet>
)

export {
	Sheet,
	SheetComponent,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetOverlay,
	SheetPortal,
	SheetTitle
}
