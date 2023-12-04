'use client';

import { useEffect } from 'react';

import Link from 'next/link';
import { useFormContext } from 'react-hook-form';

import { Button } from '~/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { type Mode, type Settings } from '~/hooks/useSettings';

const Actions = () => {
    const { register, watch, setValue } = useFormContext<Settings>();

    const rem = (px: number) => px / 16;
    const toFixed = (num: number) => parseFloat(num.toFixed(3));

    const maximumValue = rem(watch('maximumValue'));
    const minimumValue = rem(watch('minimumValue'));
    const maximumViewport = rem(watch('maximumViewport'));
    const minimumViewport = rem(watch('minimumViewport'));

    const slope = (maximumValue - minimumValue) / (maximumViewport - minimumViewport);
    const intersection = maximumValue - slope * maximumViewport;

    const clamp = `clamp(${rem(watch('minimumValue'))}rem, ${toFixed(intersection)}rem + ${toFixed(
        slope * 100,
    )}vw, ${rem(watch('maximumValue'))}rem)`;

    useEffect(() => {
        setValue('clamp', clamp);
    }, [clamp, setValue]);

    return (
        <>
            <div className="p-4 flex justify-between items-center gap-4">
                <span className="whitespace-nowrap">Actions</span>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="secondary">Mode: {watch('mode')}</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>Sizing mode</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuRadioGroup
                            value={watch('mode')}
                            onValueChange={mode => setValue('mode', mode as Mode)}
                            {...register('mode')}>
                            <DropdownMenuRadioItem value="rem">
                                rem<sup className="text-neutral-400 ml-2">16px</sup>
                            </DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="px">px</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="tailwind">
                                tailwind
                                <sup className="text-neutral-400 ml-2">
                                    <Link
                                        href="https://tailwindcss.com/docs/customizing-spacing#default-spacing-scale"
                                        target="_blank"
                                        rel="noreferrer">
                                        see reference ↗
                                    </Link>
                                </sup>
                            </DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="px-4 flex flex-col gap-2 max-w-fit">
                <h2 className="text-sm text-neutral-600">Clamp sizes</h2>
                <div className="flex gap-2 items-center justify-between">
                    <label htmlFor="min-value">Minimum value: </label>
                    <input
                        id="min-value"
                        type="number"
                        className="w-24 px-2 py-1 bg-neutral-900 border border-neutral-700 rounded-md"
                        min={0}
                        {...register('minimumValue')}
                    />
                </div>
                <div className="flex gap-2 items-center justify-between">
                    <label htmlFor="max-value">Maximum value: </label>
                    <input
                        id="max-value"
                        type="number"
                        className="w-24 px-2 py-1 bg-neutral-900 border border-neutral-700 rounded-md"
                        min={0}
                        {...register('maximumValue')}
                    />
                </div>
                <h2 className="text-sm text-neutral-600 mt-4">Viewport settings</h2>
                <div className="flex gap-2 items-center justify-between">
                    <label htmlFor="viewport-min">Minimum viewport width: </label>
                    <input
                        id="viewport-min"
                        type="number"
                        className="w-24 px-2 py-1 bg-neutral-900 border border-neutral-700 rounded-md"
                        min={0}
                        {...register('minimumViewport')}
                    />
                </div>
                <div className="flex gap-2 items-center justify-between">
                    <label htmlFor="viewport-max">Maximum viewport width: </label>
                    <input
                        id="viewport-max"
                        type="number"
                        className="w-24 px-2 py-1 bg-neutral-900 border border-neutral-700 rounded-md"
                        min={0}
                        {...register('maximumViewport')}
                    />
                </div>
                <h2 className="text-sm text-neutral-600 mt-4">Explained</h2>
                <p className="text-neutral-400 text-sm">
                    When resizing the viewport the clamped value will be at least{' '}
                    <span className="text-neutral-100">
                        {watch('minimumValue')} {watch('mode')}
                    </span>{' '}
                    and at most{' '}
                    <span className="text-neutral-100">
                        {watch('maximumValue')} {watch('mode')}
                    </span>
                    . Between viewport widths of{' '}
                    <span className="text-neutral-100">
                        {watch('minimumViewport')} {watch('mode')}
                    </span>{' '}
                    and{' '}
                    <span className="text-neutral-100">
                        {watch('maximumViewport')} {watch('mode')}
                    </span>{' '}
                    the value will be clamped (fluid) between{' '}
                    <span className="text-neutral-100">
                        {watch('minimumValue')} {watch('mode')}
                    </span>{' '}
                    and{' '}
                    <span className="text-neutral-100">
                        {watch('maximumValue')} {watch('mode')}
                    </span>{' '}
                    linearly.
                </p>
                <h2 className="text-sm text-neutral-600 mt-4">Output</h2>
                <p className="text-neutral-400 text-sm">
                    The following CSS will be generated:
                    <br />
                    <span className="block w-fit text-neutral-100 my-2 px-2 py-1 rounded-md border border-neutral-700 bg-neutral-900">
                        {clamp}
                    </span>
                </p>
            </div>
        </>
    );
};

export default Actions;
