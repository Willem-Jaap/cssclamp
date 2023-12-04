'use client';

import { useEffect } from 'react';

import Link from 'next/link';
import { useFormContext } from 'react-hook-form';

import NumberInput from '~/components/form/number-input';
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
import getTailwindValue from '~/utils/getTailwindValue';

const Actions = () => {
    const { register, watch, getValues, setValue } = useFormContext<Settings>();

    const remify = (px: number) => px / 16;
    const toFixed = (num: number) => parseFloat(num.toFixed(3));

    const getValue = (value: number, mode: Mode) => {
        if (mode === 'rem') {
            return value;
        }

        if (mode === 'tailwind') {
            return getTailwindValue(value);
        }

        return remify(value);
    };

    const maximumValue = remify(watch('maximumValue'));
    const minimumValue = remify(watch('minimumValue'));
    const maximumViewport = remify(watch('maximumViewport'));
    const minimumViewport = remify(watch('minimumViewport'));

    const slope = (maximumValue - minimumValue) / (maximumViewport - minimumViewport);
    const intersection = maximumValue - slope * maximumViewport;

    const mode = watch('mode');
    const clamp = `clamp(${getValue(watch('minimumValue'), mode)}rem, ${toFixed(
        intersection,
    )}rem + ${toFixed(slope * 100)}vw, ${getValue(watch('maximumValue'), mode)}rem)`;

    useEffect(() => {
        setValue('clamp', clamp);
    }, [clamp, setValue]);

    const onModeChange = (mode: string) => {
        const previousValue = getValues('mode');
        if (previousValue === mode) {
            return;
        }

        // Move values from previous mode to new mode
        if (mode === 'rem' && previousValue === 'px') {
            setValue('minimumValue', remify(watch('minimumValue')));
            setValue('maximumValue', remify(watch('maximumValue')));
            setValue('minimumViewport', remify(watch('minimumViewport')));
            setValue('maximumViewport', remify(watch('maximumViewport')));
        }

        if (mode === 'px' && previousValue === 'rem') {
            setValue('minimumValue', watch('minimumValue') * 16);
            setValue('maximumValue', watch('maximumValue') * 16);
            setValue('minimumViewport', watch('minimumViewport') * 16);
            setValue('maximumViewport', watch('maximumViewport') * 16);
        }

        if (mode === 'tailwind' && previousValue === 'rem') {
            setValue('minimumValue', getTailwindValue(watch('minimumValue')));
            setValue('maximumValue', getTailwindValue(watch('maximumValue')));
            setValue('minimumViewport', getTailwindValue(watch('minimumViewport')));
            setValue('maximumViewport', getTailwindValue(watch('maximumViewport')));
        }

        if (mode === 'rem' && previousValue === 'tailwind') {
            setValue('minimumValue', remify(watch('minimumValue')));
            setValue('maximumValue', remify(watch('maximumValue')));
            setValue('minimumViewport', remify(watch('minimumViewport')));
            setValue('maximumViewport', remify(watch('maximumViewport')));
        }

        setValue('mode', mode as Mode);
    };

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
                            onValueChange={onModeChange}
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
                    <NumberInput
                        id="min-value"
                        min={0}
                        mode={watch('mode')}
                        {...register('minimumValue')}
                    />
                </div>
                <div className="flex gap-2 items-center justify-between">
                    <label htmlFor="max-value">Maximum value: </label>
                    <NumberInput
                        id="max-value"
                        min={0}
                        mode={watch('mode')}
                        {...register('maximumValue')}
                    />
                </div>
                <h2 className="text-sm text-neutral-600 mt-4">Viewport settings</h2>
                <div className="flex gap-2 items-center justify-between">
                    <label htmlFor="viewport-min">Minimum viewport width: </label>
                    <NumberInput
                        id="viewport-min"
                        min={0}
                        mode={watch('mode')}
                        {...register('minimumViewport')}
                    />
                </div>
                <div className="flex gap-2 items-center justify-between">
                    <label htmlFor="viewport-max">Maximum viewport width: </label>
                    <NumberInput
                        id="viewport-max"
                        min={0}
                        mode={watch('mode')}
                        {...register('maximumViewport')}
                    />
                </div>
                <h2 className="text-sm text-neutral-600 mt-4">Explained</h2>
                {mode === 'tailwind' && (
                    <p className="text-neutral-400 text-sm">
                        Mentioned values are according to the default Tailwind spacing scale.{' '}
                        <Link
                            href="https://tailwindcss.com/docs/customizing-spacing#default-spacing-scale"
                            target="_blank"
                            rel="noreferrer">
                            See reference ↗
                        </Link>
                    </p>
                )}

                <p className="text-neutral-400 text-sm">
                    When resizing the viewport the clamped value will be at least{' '}
                    <span className="text-neutral-100">
                        {watch('minimumValue')} {mode !== 'tailwind' && mode}
                    </span>{' '}
                    and at most{' '}
                    <span className="text-neutral-100">
                        {watch('maximumValue')} {mode !== 'tailwind' && mode}
                    </span>
                    . Between viewport widths of{' '}
                    <span className="text-neutral-100">
                        {watch('minimumViewport')} {mode !== 'tailwind' && mode}
                    </span>{' '}
                    and{' '}
                    <span className="text-neutral-100">
                        {watch('maximumViewport')} {mode !== 'tailwind' && mode}
                    </span>{' '}
                    the value will be clamped (fluid) between{' '}
                    <span className="text-neutral-100">
                        {watch('minimumValue')} {mode !== 'tailwind' && mode}
                    </span>{' '}
                    and{' '}
                    <span className="text-neutral-100">
                        {watch('maximumValue')} {mode !== 'tailwind' && mode}
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
