'use client';

import { type Dispatch, type SetStateAction } from 'react';
import { type SpringRef } from '@react-spring/web';

import PreviewModeSelector from '~/components/misc/preview-mode-selector';
import { Slider } from '~/components/ui/slider';
import useSettings from '~/hooks/useSettings';

interface Props {
    api: SpringRef<{
        width: number;
    }>;
    percentage: number;
    setPercentage: Dispatch<SetStateAction<number>>;
}

const PreviewHeader = ({ api, percentage, setPercentage }: Props) => {
    const { watch } = useSettings();
    const property = watch('property');
    const onChange = (values: number[]) => {
        const [value] = values;
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        api.start({ width: value });
        setPercentage(value);
    };

    return (
        <div className="flex w-full items-center justify-between gap-4 border-b border-b-line px-3 py-2.5">
            {property ? (
                <span className="rounded-lg bg-canvas px-3 py-1.5 font-mono text-sm text-neutral-700 ring-1 ring-line">
                    {property}
                </span>
            ) : (
                <PreviewModeSelector />
            )}
            <div className="flex items-center gap-3">
                <span className="text-sm text-neutral-500 max-lg:sr-only">Screen width</span>
                <Slider
                    className="w-40"
                    aria-label="Emulated screen width"
                    min={0}
                    max={100}
                    step={1}
                    defaultValue={[60]}
                    onValueChange={onChange}
                />
                <div className="w-[calc(1.5rem+6ch)] rounded-md bg-canvas px-2 py-1 text-right font-mono text-xs text-neutral-700 tabular-nums ring-1 ring-line">
                    {Math.round((1920 / 100) * percentage)}px
                </div>
            </div>
        </div>
    );
};

export default PreviewHeader;
