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
                    'w-24 rounded-md border border-neutral-200 bg-neutral-50 px-4 py-2 pr-12 outline-none focus:border-neutral-300',
                    className,
                )}
                min={0}
                ref={ref}
                {...props}
            />
            {mode !== 'tailwind' && (
                <span className="pointer-events-none absolute inset-y-0 right-0 top-0 flex items-center pr-4 text-neutral-300">
                    {mode}
                </span>
            )}
        </div>
    );
});

NumberInput.displayName = 'NumberInput';

export default NumberInput;
