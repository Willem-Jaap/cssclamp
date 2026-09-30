'use client';

import { useState, type ReactNode } from 'react';

import CopyButton from '~/components/ui/copy-button';
import cn from '~/utils/cn';
import { resolveFluid, toClamp } from '~/utils/fluid';

import ScreenWidthControl, { DESKTOP } from '~/app/examples/screen-width-control';
import { track } from '~/lib/eyes';

const ratios = [
    { value: 1.067, label: 'Minor second' },
    { value: 1.125, label: 'Major second' },
    { value: 1.2, label: 'Minor third' },
    { value: 1.25, label: 'Major third' },
    { value: 1.333, label: 'Perfect fourth' },
    { value: 1.414, label: 'Augmented fourth' },
    { value: 1.5, label: 'Perfect fifth' },
    { value: 1.618, label: 'Golden ratio' },
];

// Tailwind names for each step, with the base size at index 2.
const tailwindNames = ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl'];

type Output = 'css' | 'tailwind';

const inputClass =
    'h-8 rounded-md border border-line bg-canvas px-2.5 text-sm tabular-nums outline-hidden transition-shadow focus:border-neutral-300 focus:bg-white focus:ring-4 focus:ring-neutral-950/5';

interface FieldProps {
    label: string;
    htmlFor: string;
    children: ReactNode;
}

const Field = ({ label, htmlFor, children }: FieldProps) => (
    <div className="flex items-center justify-between gap-2">
        <label htmlFor={htmlFor} className="text-sm text-neutral-700">
            {label}
        </label>
        {children}
    </div>
);

interface NumberFieldProps {
    id: string;
    label: string;
    value: number;
    onChange: (value: number) => void;
    unit?: string;
    min?: number;
    max?: number;
}

const NumberField = ({ id, label, value, onChange, unit, min = 0, max }: NumberFieldProps) => (
    <Field label={label} htmlFor={id}>
        <div className="relative">
            <input
                id={id}
                type="number"
                min={min}
                max={max}
                step="any"
                value={value}
                onChange={event => {
                    onChange(Number(event.target.value));
                }}
                className={cn(inputClass, 'w-24', unit && 'pr-8')}
            />
            {unit && (
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2.5 text-xs text-neutral-400">
                    {unit}
                </span>
            )}
        </div>
    </Field>
);

interface RatioFieldProps {
    id: string;
    label: string;
    value: number;
    onChange: (value: number) => void;
}

const RatioField = ({ id, label, value, onChange }: RatioFieldProps) => (
    <Field label={label} htmlFor={id}>
        <select
            id={id}
            value={value}
            onChange={event => {
                onChange(Number(event.target.value));
            }}
            className={cn(inputClass, 'w-44')}>
            {ratios.map(ratio => (
                <option key={ratio.value} value={ratio.value}>
                    {ratio.value} – {ratio.label}
                </option>
            ))}
        </select>
    </Field>
);

const Group = ({ title, children }: { title: string; children: ReactNode }) => (
    <div className="flex flex-col gap-2 border-b border-b-line px-4 py-3 last:border-b-0">
        <h3 className="mb-1 text-sm font-medium">{title}</h3>
        {children}
    </div>
);

const TypeScaleGenerator = () => {
    const [minBase, setMinBase] = useState(16);
    const [maxBase, setMaxBase] = useState(18);
    const [minRatio, setMinRatio] = useState(1.2);
    const [maxRatio, setMaxRatio] = useState(1.25);
    const [minViewport, setMinViewport] = useState(360);
    const [maxViewport, setMaxViewport] = useState(1440);
    const [stepsUp, setStepsUp] = useState(5);
    const [stepsDown, setStepsDown] = useState(2);
    const [width, setWidth] = useState(DESKTOP);
    const [output, setOutput] = useState<Output>('css');

    const up = Math.min(Math.max(Math.round(stepsUp), 1), 8);
    const down = Math.min(Math.max(Math.round(stepsDown), 0), 2);
    const valid = minBase > 0 && maxBase > 0 && maxViewport > minViewport;

    const steps = Array.from({ length: up + down + 1 }, (_, index) => {
        const step = up - index;
        const range = {
            minSize: minBase * minRatio ** step,
            maxSize: maxBase * maxRatio ** step,
            minViewport,
            maxViewport,
        };

        return {
            step,
            cssName: `--step-${step}`,
            tailwindName: `--text-${tailwindNames[step + 2]}`,
            range,
            clamp: valid ? toClamp(range) : '',
        };
    });

    const code =
        output === 'css'
            ? `:root {\n${steps.map(s => `    ${s.cssName}: ${s.clamp};`).join('\n')}\n}`
            : `@theme {\n${steps.map(s => `    ${s.tailwindName}: ${s.clamp};`).join('\n')}\n}`;

    return (
        <div className="flex flex-col gap-4">
            <div className="grid gap-4 md:grid-cols-15">
                <div className="flex min-w-0 flex-col overflow-hidden rounded-xl border border-line bg-white md:col-span-10">
                    <ScreenWidthControl width={width} onChange={setWidth} />
                    <div className="flex flex-col divide-y divide-line">
                        {steps.map(({ step, cssName, range }) => {
                            const size = valid ? resolveFluid(range, width) : 0;

                            return (
                                <div
                                    key={step}
                                    className="flex items-center gap-4 px-4 py-3 max-sm:flex-col max-sm:items-start">
                                    <div className="flex w-36 shrink-0 flex-col gap-0.5">
                                        <span className="font-mono text-xs text-neutral-950">
                                            {cssName}
                                        </span>
                                        <span className="font-mono text-xs text-neutral-400 tabular-nums">
                                            {range.minSize.toFixed(1)} → {range.maxSize.toFixed(1)}
                                            px
                                        </span>
                                        <span className="font-mono text-xs text-primary-500 tabular-nums">
                                            {size.toFixed(1)}px
                                        </span>
                                    </div>
                                    <p
                                        className={cn(
                                            'min-w-0 flex-1 truncate leading-tight text-neutral-950',
                                            step > 0 && 'font-medium tracking-tight',
                                        )}
                                        style={{ fontSize: size }}>
                                        {step > 0
                                            ? 'Fluid type scale'
                                            : 'Body text that stays easy to read'}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="flex flex-col overflow-hidden rounded-xl border border-line bg-white md:col-span-5">
                    <Group title="Base size">
                        <NumberField
                            id="min-base"
                            label="Mobile"
                            unit="px"
                            value={minBase}
                            onChange={setMinBase}
                        />
                        <NumberField
                            id="max-base"
                            label="Desktop"
                            unit="px"
                            value={maxBase}
                            onChange={setMaxBase}
                        />
                    </Group>
                    <Group title="Scale ratio">
                        <RatioField
                            id="min-ratio"
                            label="Mobile"
                            value={minRatio}
                            onChange={setMinRatio}
                        />
                        <RatioField
                            id="max-ratio"
                            label="Desktop"
                            value={maxRatio}
                            onChange={setMaxRatio}
                        />
                    </Group>
                    <Group title="Viewport">
                        <NumberField
                            id="min-viewport"
                            label="Mobile"
                            unit="px"
                            value={minViewport}
                            onChange={setMinViewport}
                        />
                        <NumberField
                            id="max-viewport"
                            label="Desktop"
                            unit="px"
                            value={maxViewport}
                            onChange={setMaxViewport}
                        />
                    </Group>
                    <Group title="Steps">
                        <NumberField
                            id="steps-up"
                            label="Above the base"
                            min={1}
                            max={8}
                            value={stepsUp}
                            onChange={setStepsUp}
                        />
                        <NumberField
                            id="steps-down"
                            label="Below the base"
                            min={0}
                            max={2}
                            value={stepsDown}
                            onChange={setStepsDown}
                        />
                    </Group>
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <div
                    role="radiogroup"
                    aria-label="Output format"
                    className="flex self-start rounded-lg bg-canvas p-0.5 ring-1 ring-line">
                    {(
                        [
                            { value: 'css', label: 'CSS variables' },
                            { value: 'tailwind', label: 'Tailwind v4' },
                        ] as const
                    ).map(option => (
                        <button
                            key={option.value}
                            type="button"
                            role="radio"
                            aria-checked={output === option.value}
                            onClick={() => {
                                setOutput(option.value);
                            }}
                            className={cn(
                                'h-6 rounded-md px-2 text-xs font-medium transition-colors',
                                output === option.value
                                    ? 'bg-white text-neutral-950 shadow-xs ring-1 ring-line'
                                    : 'text-neutral-500 hover:text-neutral-950',
                            )}>
                            {option.label}
                        </button>
                    ))}
                </div>
                <div className="relative rounded-lg bg-neutral-950 py-4 pr-12 pl-5 scheme-fixed dark:ring-1 dark:ring-white/10">
                    <pre className="overflow-x-auto font-mono text-[0.8125rem] leading-relaxed text-neutral-100">
                        {valid
                            ? code
                            : 'Check the values: the desktop viewport must be wider than the mobile one.'}
                    </pre>
                    <CopyButton
                        value={code}
                        label="Copy type scale"
                        onCopy={() => {
                            track('Type Scale Copied', { output, steps: stepsUp + stepsDown + 1 });
                        }}
                        className="absolute top-3 right-3 text-neutral-400 hover:bg-white/10 hover:text-neutral-50"
                    />
                </div>
                {output === 'tailwind' && (
                    <p className="text-xs text-neutral-500">
                        This redefines Tailwind’s own font sizes, so every{' '}
                        <code>text-{tailwindNames[2 - down]}</code> to{' '}
                        <code>text-{tailwindNames[up + 2]}</code> in your project becomes fluid.
                    </p>
                )}
            </div>
        </div>
    );
};

export default TypeScaleGenerator;
