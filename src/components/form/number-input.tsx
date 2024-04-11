import React, { forwardRef, type InputHTMLAttributes } from 'react';

import { type Mode } from '~/hooks/useSettings';
import cn from '~/utils/cn';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    mode?: Mode;
}

const NumberInput = forwardRef<HTMLInputElement, Props>(({ className, ...props }, ref) => {
    'w-24 px-2 py-1 bg-neutral-900 border border-neutral-700 rounded-md';

    const { mode = 'px' } = props;
    return (
        <div className="relative">
            <input
                type="number"
                className={cn(
                    'w-24 rounded-md border border-neutral-300 bg-neutral-50 py-1 pl-2 pr-8 outline-none focus:border-neutral-400',
                    className,
                )}
                min={0}
                ref={ref}
                {...props}
            />
            {mode !== 'tailwind' && (
                <span className="pointer-events-none absolute inset-y-0 right-0 top-0 flex items-center pr-2 text-neutral-600">
                    {mode}
                </span>
            )}
        </div>
    );
});

NumberInput.displayName = 'NumberInput';

export default NumberInput;
