'use client';

import { type Dispatch, type SetStateAction } from 'react';
import { type SpringRef } from '@react-spring/web';

import { Slider } from '~/components/ui/slider';

interface Props {
    api: SpringRef<{
        width: number;
    }>;
    percentage: number;
    setPercentage: Dispatch<SetStateAction<number>>;
}

const PreviewHeader = ({ api, percentage, setPercentage }: Props) => {
    const onChange = (values: number[]) => {
        const [value] = values;
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        api.start({ width: value });
        setPercentage(value);
    };
    return (
        <div className="flex w-full items-center justify-between gap-4 border-b border-b-neutral-100 p-5">
            <h2 className="text-lg font-medium">Emulated screen width</h2>
            <div className="flex items-center gap-4">
                <Slider
                    className="w-40"
                    min={0}
                    max={100}
                    step={1}
                    defaultValue={[60]}
                    onValueChange={onChange}
                />
                <div className="w-[calc(1.2rem_+_6ch)] rounded-lg border border-neutral-100 px-3 py-2 text-right font-medium text-neutral-600">
                    {Math.round((1920 / 100) * percentage)}px
                </div>
            </div>
        </div>
    );
};

export default PreviewHeader;
