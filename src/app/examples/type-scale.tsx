'use client';

import { useState } from 'react';

import CopyButton from '~/components/ui/copy-button';
import { Slider } from '~/components/ui/slider';
import cn from '~/utils/cn';
import { resolveFluid, toClamp } from '~/utils/fluid';

const MOBILE = 360;
const DESKTOP = 1440;

const presets = [
    { label: 'Mobile', width: MOBILE },
    { label: 'Tablet', width: 768 },
    { label: 'Desktop', width: DESKTOP },
];

const scale = [
    { tag: 'h1', mobile: 36, desktop: 64, lineHeight: 1.1, weight: 500, sample: 'Fluid type' },
    { tag: 'h2', mobile: 30, desktop: 48, lineHeight: 1.15, weight: 500, sample: 'Section title' },
    { tag: 'h3', mobile: 24, desktop: 36, lineHeight: 1.2, weight: 500, sample: 'Subsection' },
    { tag: 'h4', mobile: 20, desktop: 28, lineHeight: 1.3, weight: 500, sample: 'Card heading' },
    { tag: 'h5', mobile: 18, desktop: 22, lineHeight: 1.4, weight: 500, sample: 'Small heading' },
    { tag: 'h6', mobile: 16, desktop: 18, lineHeight: 1.4, weight: 600, sample: 'Label' },
    {
        tag: 'p',
        mobile: 16,
        desktop: 18,
        lineHeight: 1.6,
        weight: 400,
        sample: 'Body text scales a little, so it stays comfortable to read on every screen.',
    },
] as const;

const withRange = (mobile: number, desktop: number) => ({
    minSize: mobile,
    maxSize: desktop,
    minViewport: MOBILE,
    maxViewport: DESKTOP,
});

const css = `:root {
${scale
    .map(({ tag, mobile, desktop }) => `    --text-${tag}: ${toClamp(withRange(mobile, desktop))};`)
    .join('\n')}
}`;

const TypeScale = () => {
    const [width, setWidth] = useState(DESKTOP);

    return (
        <div className="flex flex-col gap-10">
            <section className="overflow-hidden rounded-xl border border-line">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-b-line px-4 py-3">
                    <div className="flex rounded-lg bg-canvas p-1 ring-1 ring-line">
                        {presets.map(preset => (
                            <button
                                key={preset.label}
                                type="button"
                                onClick={() => {
                                    setWidth(preset.width);
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
                                setWidth(value);
                            }}
                        />
                        <span className="w-16 rounded-md bg-canvas px-2 py-1 text-right font-mono text-xs text-neutral-700 tabular-nums ring-1 ring-line">
                            {width}px
                        </span>
                    </div>
                </div>
                <div className="divide-y divide-line">
                    {scale.map(({ tag, mobile, desktop, lineHeight, weight, sample }) => {
                        const size = resolveFluid(withRange(mobile, desktop), width);

                        return (
                            <div
                                key={tag}
                                className="grid items-baseline gap-x-6 gap-y-2 px-4 py-5 md:grid-cols-[4rem_1fr_8rem]">
                                <span className="font-mono text-xs text-neutral-400">{tag}</span>
                                <p
                                    className={cn(
                                        'min-w-0 text-neutral-950',
                                        tag !== 'p' && 'tracking-tight',
                                    )}
                                    style={{ fontSize: size, lineHeight, fontWeight: weight }}>
                                    {sample}
                                </p>
                                <span className="font-mono text-xs text-neutral-500 tabular-nums md:text-right">
                                    {size.toFixed(1)}px
                                </span>
                            </div>
                        );
                    })}
                </div>
            </section>

            <section className="overflow-hidden rounded-xl border border-line">
                <table className="w-full text-left text-sm">
                    <thead className="bg-canvas text-neutral-500">
                        <tr className="border-b border-b-line">
                            <th className="px-4 py-2.5 font-medium">Element</th>
                            <th className="px-4 py-2.5 font-medium">Mobile</th>
                            <th className="px-4 py-2.5 font-medium">Desktop</th>
                            <th className="px-4 py-2.5 font-medium">clamp()</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-line">
                        {scale.map(({ tag, mobile, desktop }) => {
                            const clamp = toClamp(withRange(mobile, desktop));

                            return (
                                <tr key={tag}>
                                    <td className="px-4 py-2 font-mono text-xs text-neutral-950">
                                        {tag}
                                    </td>
                                    <td className="px-4 py-2 text-neutral-600 tabular-nums">
                                        {mobile}px
                                    </td>
                                    <td className="px-4 py-2 text-neutral-600 tabular-nums">
                                        {desktop}px
                                    </td>
                                    <td className="px-4 py-2">
                                        <div className="flex items-center justify-between gap-2">
                                            <code className="font-mono text-xs text-neutral-700">
                                                {clamp}
                                            </code>
                                            <CopyButton
                                                value={clamp}
                                                label={`Copy ${tag} clamp value`}
                                                className="size-7 text-neutral-400 hover:bg-canvas hover:text-neutral-950"
                                            />
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </section>

            <section className="flex flex-col gap-3">
                <div>
                    <h2 className="text-lg font-medium tracking-tight text-neutral-950">
                        Copy the whole scale
                    </h2>
                    <p className="mt-1 text-sm text-neutral-500">
                        Custom properties that scale from {MOBILE}px to {DESKTOP}px. Using Tailwind
                        CSS v4? Put them in <code className="font-mono text-xs">@theme</code>{' '}
                        instead of <code className="font-mono text-xs">:root</code> and use{' '}
                        <code className="font-mono text-xs">text-h1</code>,{' '}
                        <code className="font-mono text-xs">text-p</code> and so on.
                    </p>
                </div>
                <div className="relative rounded-lg bg-neutral-950 py-4 pr-12 pl-5 scheme-fixed dark:ring-1 dark:ring-white/10">
                    <pre className="overflow-x-auto font-mono text-[0.8125rem] leading-relaxed text-neutral-100">
                        {css}
                    </pre>
                    <CopyButton
                        value={css}
                        label="Copy type scale"
                        className="absolute top-3 right-3 text-neutral-400 hover:bg-white/10 hover:text-neutral-50"
                    />
                </div>
            </section>
        </div>
    );
};

export default TypeScale;
