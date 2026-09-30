'use client';

import { SparklesIcon } from 'lucide-react';
import Link from 'next/link';

import NumberInput from '~/components/form/number-input';
import SkillPopover from '~/components/misc/skill-popover';
import { Button } from '~/components/ui/button';
import CopyButton from '~/components/ui/copy-button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import useSettings, { type Mode, type Output } from '~/hooks/useSettings';
import cn from '~/utils/cn';
import { getTailwindByValue } from '~/utils/getTailwindValue';
import { formatOutput, getTarget } from '~/utils/output';

const outputs: { value: Output; label: string }[] = [
    { value: 'css', label: 'CSS' },
    { value: 'tailwind-v4', label: 'Tailwind v4' },
    { value: 'tailwind-v3', label: 'Tailwind v3' },
    { value: 'tailwind-class', label: 'Class' },
];

const Actions = () => {
    const { register, watch, getValues, setValue } = useSettings();

    const remify = (px: number) => px / 16;

    const mode = watch('mode');
    const output = watch('output');
    const formatted = formatOutput(
        watch('clamp'),
        output,
        getTarget(watch('previewMode'), watch('property')),
    );

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
            setValue('minimumValue', getTailwindByValue(remify(watch('minimumValue'))));
            setValue('maximumValue', getTailwindByValue(remify(watch('maximumValue'))));
            setValue('minimumViewport', getTailwindByValue(remify(watch('minimumViewport'))));
            setValue('maximumViewport', getTailwindByValue(remify(watch('maximumViewport'))));
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
        <div className="flex h-full flex-col">
            <div className="flex items-center justify-between gap-4 border-b border-b-line px-4 py-3">
                <h2 className="text-sm font-medium whitespace-nowrap">Actions</h2>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="secondary" className="h-8 rounded-md px-3 text-sm">
                            Mode: {watch('mode')}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="mr-[clamp(2rem,1.6rem+2vw,4rem)] w-56">
                        <DropdownMenuLabel>Sizing mode</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuRadioGroup
                            value={watch('mode')}
                            onValueChange={onModeChange}
                            {...register('mode')}>
                            <DropdownMenuRadioItem value="rem">
                                rem<sup className="ml-2 text-neutral-400">16px</sup>
                            </DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="px">px</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem
                                className="pointer-events-none opacity-20"
                                value="tailwind">
                                tailwind
                                <sup className="ml-2 text-neutral-400">
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
            <div className="flex flex-col border-b border-b-line px-4 py-3">
                <h3 className="text-sm font-medium">Clamp sizes</h3>
                <p className="mt-0.5 max-w-80 text-sm text-pretty text-neutral-500">
                    The smallest and largest size, for padding, margin or font size.
                </p>
                <div className="mt-3 flex items-center justify-between gap-2">
                    <label htmlFor="min-value" className="text-sm text-neutral-700">
                        Minimum value
                    </label>
                    <NumberInput
                        id="min-value"
                        min={0}
                        mode={watch('mode')}
                        {...register('minimumValue')}
                    />
                </div>
                <div className="mt-2 flex items-center justify-between gap-2">
                    <label htmlFor="max-value" className="text-sm text-neutral-700">
                        Maximum value
                    </label>
                    <NumberInput
                        id="max-value"
                        min={0}
                        mode={watch('mode')}
                        {...register('maximumValue')}
                    />
                </div>
            </div>
            <div className="flex flex-col border-b border-b-line px-4 py-3">
                <h3 className="text-sm font-medium">Viewport settings</h3>
                <p className="mt-0.5 max-w-80 text-sm text-pretty text-neutral-500">
                    The screen widths where the value starts and stops growing.
                </p>
                <div className="mt-3 flex items-center justify-between gap-2">
                    <label htmlFor="viewport-min" className="text-sm text-neutral-700">
                        Minimum viewport
                    </label>
                    <NumberInput
                        id="viewport-min"
                        min={0}
                        mode={watch('mode')}
                        {...register('minimumViewport')}
                    />
                </div>
                <div className="mt-2 flex items-center justify-between gap-2">
                    <label htmlFor="viewport-max" className="text-sm text-neutral-700">
                        Maximum viewport
                    </label>
                    <NumberInput
                        id="viewport-max"
                        min={0}
                        mode={watch('mode')}
                        {...register('maximumViewport')}
                    />
                </div>
            </div>

            <div className="flex flex-col gap-3 p-4">
                <p className="max-w-96 text-sm text-pretty text-neutral-500">
                    The clamped value will be between {watch('minimumValue')}
                    {mode !== 'tailwind' && mode} and {watch('maximumValue')}
                    {mode !== 'tailwind' && mode}, applied linearly between viewports of{' '}
                    {watch('minimumViewport')}
                    {mode !== 'tailwind' && mode} and {watch('maximumViewport')}
                    {mode !== 'tailwind' && mode}.
                </p>
                <div className="flex flex-col gap-2">
                    <div
                        role="radiogroup"
                        aria-label="Output format"
                        className="flex self-start rounded-lg bg-canvas p-0.5 ring-1 ring-line">
                        {outputs.map(option => (
                            <button
                                key={option.value}
                                type="button"
                                role="radio"
                                aria-checked={output === option.value}
                                onClick={() => {
                                    setValue('output', option.value);
                                }}
                                className={cn(
                                    'h-6 rounded-md px-2 text-xs font-medium whitespace-nowrap transition-colors',
                                    output === option.value
                                        ? 'bg-white text-neutral-950 shadow-xs ring-1 ring-line'
                                        : 'text-neutral-500 hover:text-neutral-950',
                                )}>
                                {option.label}
                            </button>
                        ))}
                    </div>
                    <div className="relative rounded-lg bg-neutral-950 py-3.5 pr-12 pl-4 scheme-fixed dark:ring-1 dark:ring-white/10">
                        <code className="block font-mono text-[0.8125rem] leading-relaxed break-words whitespace-pre-wrap text-neutral-50">
                            {formatted.code}
                        </code>
                        <CopyButton
                            value={formatted.code}
                            label="Copy clamp value"
                            className="absolute top-2.5 right-2.5 text-neutral-400 hover:bg-white/10 hover:text-neutral-50"
                        />
                    </div>
                    {formatted.usage && (
                        <p className="text-xs text-neutral-500">
                            Use it as{' '}
                            <code className="rounded bg-canvas px-1 py-0.5 font-mono text-neutral-800 ring-1 ring-line">
                                {formatted.usage}
                            </code>
                            .
                        </p>
                    )}
                </div>
                <SkillPopover align="start">
                    <button
                        type="button"
                        className="flex items-center gap-1.5 self-start text-xs text-neutral-500 transition-colors hover:text-neutral-950">
                        <SparklesIcon size={12} />
                        Install the agent skill
                    </button>
                </SkillPopover>
            </div>
        </div>
    );
};

export default Actions;
