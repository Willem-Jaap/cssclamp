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
        <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-neutral-100">
            <SliderPrimitive.Range className="absolute h-full rounded-full bg-neutral-600" />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border border-neutral-300 bg-white ring-offset-white transition-colors focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50" />
    </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
