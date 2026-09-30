'use client';

import { Slider } from '~/components/ui/slider';
import cn from '~/utils/cn';

export const MOBILE = 360;
export const DESKTOP = 1440;

const presets = [
    { label: 'Mobile', width: MOBILE },
    { label: 'Tablet', width: 768 },
    { label: 'Desktop', width: DESKTOP },
];

interface Props {
    width: number;
    onChange: (width: number) => void;
}

const ScreenWidthControl = ({ width, onChange }: Props) => {
    return (
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-b-line px-4 py-3">
            <div className="flex rounded-lg bg-canvas p-1 ring-1 ring-line">
                {presets.map(preset => (
                    <button
                        key={preset.label}
                        type="button"
                        onClick={() => {
                            onChange(preset.width);
                        }}
                        className={cn(
                            'h-7 rounded-md px-3 text-sm font-medium transition-colors',
                            width === preset.width
                                ? 'bg-white text-neutral-950 shadow-xs ring-1 ring-line'
                                : 'text-neutral-500 hover:text-neutral-950',
                        )}>
                        {preset.label}
                    </button>
                ))}
            </div>
            <div className="flex min-w-64 flex-1 items-center gap-3 sm:max-w-sm">
                <Slider
                    aria-label="Screen width"
                    min={MOBILE}
                    max={DESKTOP}
                    step={1}
                    value={[width]}
                    onValueChange={([value]) => {
                        onChange(value);
                    }}
                />
                <span className="w-16 rounded-md bg-canvas px-2 py-1 text-right font-mono text-xs text-neutral-700 tabular-nums ring-1 ring-line">
                    {width}px
                </span>
            </div>
        </div>
    );
};

export default ScreenWidthControl;
