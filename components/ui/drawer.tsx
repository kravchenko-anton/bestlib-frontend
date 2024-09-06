'use client'

import { cn } from '@/utils'
import {
	forwardRef,
	type ComponentProps,
	type ComponentPropsWithoutRef,
	type ElementRef,
	type HTMLAttributes
} from 'react'
import { Drawer as DrawerPrimitive } from 'vaul'

const Drawer = ({
	shouldScaleBackground = true,
	...properties
}: ComponentProps<typeof DrawerPrimitive.Root>) => (
	<DrawerPrimitive.Root
		shouldScaleBackground={shouldScaleBackground}
		{...properties}
	/>
)
Drawer.displayName = 'Drawer'

const DrawerTrigger = DrawerPrimitive.Trigger

const DrawerPortal = DrawerPrimitive.Portal

const DrawerClose = DrawerPrimitive.Close

const DrawerOverlay = forwardRef<
	ElementRef<typeof DrawerPrimitive.Overlay>,
	ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(({ className, ...properties }, reference) => (
	<DrawerPrimitive.Overlay
		ref={reference}
		className={cn(
			'bg-foreground border-bordered fixed inset-0 z-50',
			className
		)}
		{...properties}
	/>
))
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName

const DrawerContent = forwardRef<
	ElementRef<typeof DrawerPrimitive.Content>,
	ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>
>(({ className, children, ...properties }, reference) => (
	<DrawerPortal>
		<DrawerOverlay />
		<DrawerPrimitive.Content
			ref={reference}
			className={cn(
				'bg-foreground border-bordered  focus:shadow-outline fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-md border focus:outline-0',
				className
			)}
			{...properties}>
			<div className='bg-muted border-bordered mx-auto mt-4 h-2 w-[100px] rounded-full' />
			{children}
		</DrawerPrimitive.Content>
	</DrawerPortal>
))
DrawerContent.displayName = 'DrawerContent'

const DrawerHeader = ({
	className,
	...properties
}: HTMLAttributes<HTMLDivElement>) => (
	<div
		className={cn('grid gap-1.5 p-4 text-center sm:text-left', className)}
		{...properties}
	/>
)
DrawerHeader.displayName = 'DrawerHeader'

const DrawerFooter = ({
	className,
	...properties
}: HTMLAttributes<HTMLDivElement>) => (
	<div
		className={cn('mt-auto flex flex-col gap-2 p-4', className)}
		{...properties}
	/>
)
DrawerFooter.displayName = 'DrawerFooter'

const DrawerTitle = forwardRef<
	ElementRef<typeof DrawerPrimitive.Title>,
	ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...properties }, reference) => (
	<DrawerPrimitive.Title
		ref={reference}
		className={cn(
			'text-lg font-semibold leading-none tracking-tight',
			className
		)}
		{...properties}
	/>
))
DrawerTitle.displayName = DrawerPrimitive.Title.displayName

const DrawerDescription = forwardRef<
	ElementRef<typeof DrawerPrimitive.Description>,
	ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(({ className, ...properties }, reference) => (
	<DrawerPrimitive.Description
		ref={reference}
		className={cn('text-gray text-sm', className)}
		{...properties}
	/>
))
DrawerDescription.displayName = DrawerPrimitive.Description.displayName

export {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	DrawerPortal,
	DrawerTitle,
	DrawerTrigger
}
