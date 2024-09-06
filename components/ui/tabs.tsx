'use client'

import { cn } from '@/utils'
import * as TabsPrimitive from '@radix-ui/react-tabs'

import {
	forwardRef,
	type ComponentPropsWithoutRef,
	type ElementRef
} from 'react'

const Tabs = TabsPrimitive.Root

const TabsList = forwardRef<
	ElementRef<typeof TabsPrimitive.List>,
	ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...properties }, reference) => (
	<TabsPrimitive.List
		ref={reference}
		className={cn(
			'bg-muted text-gray inline-flex h-9 items-center justify-center rounded p-1',
			className
		)}
		{...properties}
	/>
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = forwardRef<
	ElementRef<typeof TabsPrimitive.Trigger>,
	ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...properties }, reference) => (
	<TabsPrimitive.Trigger
		ref={reference}
		className={cn(
			'ring-offset-gray focus-visible:ring-ring data-[state=active]:bg-background data-[state=active]:text-gray inline-flex items-center justify-center whitespace-nowrap rounded px-3 py-1 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow',
			className
		)}
		{...properties}
	/>
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = forwardRef<
	ElementRef<typeof TabsPrimitive.Content>,
	ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...properties }, reference) => (
	<TabsPrimitive.Content
		ref={reference}
		className={cn(
			'ring-offset-gray focus-visible:ring-ring mt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
			className
		)}
		{...properties}
	/>
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsContent, TabsList, TabsTrigger }
