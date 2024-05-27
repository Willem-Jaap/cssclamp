import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import cn from '~/utils/cn';

const buttonVariants = cva(
    'inline-flex items-center justify-center whitespace-nowrap rounded-lg font-medium ring-offset-neutral-100 transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-neutral-950 dark:focus-visible:ring-neutral-300',
    {
        variants: {
            variant: {
                default:
                    'bg-neutral-900 text-neutral-50 hover:bg-neutral-900/90 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-50/90',
                destructive:
                    'bg-red-500 text-neutral-50 hover:bg-red-500/90 dark:bg-red-900 dark:text-neutral-50 dark:hover:bg-red-900/90',
                outline:
                    'border border-neutral-200 bg-white hover:bg-neutral-100/50 dark:border-neutral-200 dark:bg-neutral-950 dark:hover:bg-neutral-800 dark:hover:text-neutral-50',
                secondary:
                    'bg-neutral-50 text-neutral-950 hover:bg-neutral-100/50 border border-neutral-100',
                ghost: 'hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-neutral-50',
                link: 'text-neutral-900 underline-offset-4 hover:underline dark:text-neutral-50',
            },
            size: {
                default: 'px-4 py-2',
                sm: 'h-9 rounded-md px-3',
                lg: 'h-11 rounded-md px-8',
                icon: 'h-10 w-10',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    },
);

interface Props
    extends ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, Props>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : 'button';
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        );
    },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
