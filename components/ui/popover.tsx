'use client'

import { cn } from '@/utils'
import * as PopoverPrimitive from '@radix-ui/react-popover'
import type { ComponentPropsWithoutRef, ElementRef } from 'react'
import { forwardRef } from 'react'

const Popover = PopoverPrimitive.Root

const PopoverTrigger = PopoverPrimitive.Trigger

const PopoverAnchor = PopoverPrimitive.Anchor

const PopoverContent = forwardRef<
	ElementRef<typeof PopoverPrimitive.Content>,
	ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(
	(
		{ className, align = 'center', sideOffset = 4, ...properties },
		reference
	) => (
		<PopoverPrimitive.Portal>
			<PopoverPrimitive.Content
				ref={reference}
				align={align}
				sideOffset={sideOffset}
				className={cn(
					'bg-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 border-bordered z-50 w-72 rounded border  p-4 text-white shadow-md outline-none',
					className
				)}
				{...properties}
			/>
		</PopoverPrimitive.Portal>
	)
)
PopoverContent.displayName = PopoverPrimitive.Content.displayName

export { Popover, PopoverAnchor, PopoverContent, PopoverTrigger }
