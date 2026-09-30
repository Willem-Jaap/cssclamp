'use client';

import { SquareDashedIcon, TypeIcon, type LucideIcon } from 'lucide-react';

import useSettings, { type PreviewMode } from '~/hooks/useSettings';
import cn from '~/utils/cn';

const modes: { value: PreviewMode; label: string; icon: LucideIcon }[] = [
    { value: 'container', label: 'Container', icon: SquareDashedIcon },
    { value: 'text', label: 'Text', icon: TypeIcon },
];

const PreviewModeSelector = () => {
    const { watch, setValue } = useSettings();
    const previewMode = watch('previewMode');
    const activeIndex = modes.findIndex(mode => mode.value === previewMode);

    return (
        <div
            role="radiogroup"
            className="relative grid grid-cols-2 rounded-lg bg-canvas p-1 ring-1 ring-line">
            {/* Buttons share equal widths, so the indicator can slide by its own width. */}
            <div
                aria-hidden
                className="absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-md bg-white shadow-xs ring-1 ring-line transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
                style={{ transform: `translateX(${activeIndex * 100}%)` }}
            />
            {modes.map(({ value, label, icon: Icon }) => (
                <button
                    key={value}
                    type="button"
                    role="radio"
                    aria-checked={previewMode === value}
                    onClick={() => {
                        setValue('previewMode', value);
                    }}
                    className={cn(
                        'relative flex h-7 items-center justify-center gap-2 rounded-md px-3 text-sm font-medium whitespace-nowrap transition-colors duration-300',
                        previewMode === value
                            ? 'text-neutral-950'
                            : 'text-neutral-500 hover:text-neutral-950',
                    )}>
                    <Icon size={14} strokeWidth={2.25} />
                    {label}
                </button>
            ))}
        </div>
    );
};

export default PreviewModeSelector;
