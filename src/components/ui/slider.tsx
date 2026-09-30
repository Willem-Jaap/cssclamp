'use client';

import { forwardRef, type ComponentPropsWithoutRef, type ComponentRef } from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';

import cn from '~/utils/cn';

const Slider = forwardRef<
    ComponentRef<typeof SliderPrimitive.Root>,
    ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
    <SliderPrimitive.Root
        ref={ref}
        className={cn('relative flex w-full touch-none items-center select-none', className)}
        {...props}>
        <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-line">
            <SliderPrimitive.Range className="absolute h-full rounded-full bg-neutral-950" />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb className="block size-4 cursor-grab rounded-full border border-line bg-white shadow-sm transition-shadow focus-visible:ring-4 focus-visible:ring-neutral-950/10 focus-visible:outline-hidden active:cursor-grabbing disabled:pointer-events-none disabled:opacity-50" />
    </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
