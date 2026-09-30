import { forwardRef, type InputHTMLAttributes } from 'react';

import { type Mode } from '~/hooks/useSettings';
import cn from '~/utils/cn';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    mode?: Mode;
}

const NumberInput = forwardRef<HTMLInputElement, Props>(({ className, ...props }, ref) => {
    const { mode = 'px' } = props;
    return (
        <div className="relative">
            <input
                type="number"
                className={cn(
                    'h-8 w-24 rounded-md border border-line bg-canvas px-2.5 pr-10 text-sm tabular-nums outline-hidden transition-shadow focus:border-neutral-300 focus:bg-white focus:ring-4 focus:ring-neutral-950/5',
                    className,
                )}
                min={0}
                ref={ref}
                {...props}
            />
            {mode !== 'tailwind' && (
                <span className="pointer-events-none absolute inset-y-0 top-0 right-0 flex items-center pr-2.5 text-xs text-neutral-400">
                    {mode}
                </span>
            )}
        </div>
    );
});

NumberInput.displayName = 'NumberInput';

export default NumberInput;
