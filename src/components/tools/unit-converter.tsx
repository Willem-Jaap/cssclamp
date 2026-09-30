'use client';

import { useState, type ReactNode } from 'react';

import CopyButton from '~/components/ui/copy-button';
import cn from '~/utils/cn';

const round = (value: number) => parseFloat(value.toFixed(4));

const inputClass =
    'h-10 w-full rounded-lg border border-line bg-canvas px-3 pr-12 text-base tabular-nums outline-hidden transition-shadow focus:border-neutral-300 focus:bg-white focus:ring-4 focus:ring-neutral-950/5';

interface UnitInputProps {
    id: string;
    label: string;
    unit: string;
    value: number;
    onChange: (value: number) => void;
}

const UnitInput = ({ id, label, unit, value, onChange }: UnitInputProps) => (
    <div className="flex flex-1 flex-col gap-1.5">
        <label htmlFor={id} className="text-sm text-neutral-700">
            {label}
        </label>
        <div className="relative">
            <input
                id={id}
                type="number"
                min={0}
                step="any"
                value={Number.isFinite(value) ? round(value) : ''}
                onChange={event => {
                    onChange(Number(event.target.value));
                }}
                className={inputClass}
            />
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-sm text-neutral-400">
                {unit}
            </span>
        </div>
    </div>
);

const Result = ({ value }: { value: string }) => (
    <div className="relative flex items-center rounded-lg bg-neutral-950 py-2.5 pr-12 pl-4 scheme-fixed dark:ring-1 dark:ring-white/10">
        <code className="font-mono text-[0.8125rem] text-neutral-50">{value}</code>
        <CopyButton
            value={value}
            label={`Copy ${value}`}
            className="absolute top-1/2 right-2 -translate-y-1/2 text-neutral-400 hover:bg-white/10 hover:text-neutral-50"
        />
    </div>
);

const Card = ({
    title,
    className,
    children,
}: {
    title: string;
    className?: string;
    children: ReactNode;
}) => (
    <section
        className={cn('flex flex-col gap-4 rounded-xl border border-line bg-white p-5', className)}>
        <h2 className="text-sm font-medium text-neutral-950">{title}</h2>
        {children}
    </section>
);

const UnitConverter = () => {
    const [rootSize, setRootSize] = useState(16);
    const [px, setPx] = useState(24);
    const [viewport, setViewport] = useState(1440);
    const [vwPx, setVwPx] = useState(48);

    const rem = rootSize > 0 ? px / rootSize : 0;
    const vw = viewport > 0 ? (vwPx / viewport) * 100 : 0;

    return (
        <div className="grid gap-4 md:grid-cols-2">
            <Card title="px ↔ rem">
                <div className="flex items-end gap-3">
                    <UnitInput id="px" label="Pixels" unit="px" value={px} onChange={setPx} />
                    <span className="pb-2.5 text-neutral-400">=</span>
                    <UnitInput
                        id="rem"
                        label="Rem"
                        unit="rem"
                        value={rem}
                        onChange={value => {
                            setPx(value * rootSize);
                        }}
                    />
                </div>
                <UnitInput
                    id="root"
                    label="Root font size"
                    unit="px"
                    value={rootSize}
                    onChange={setRootSize}
                />
                <Result value={`${round(rem)}rem`} />
            </Card>

            <Card title="px ↔ vw">
                <div className="flex items-end gap-3">
                    <UnitInput
                        id="vw-px"
                        label="Pixels"
                        unit="px"
                        value={vwPx}
                        onChange={setVwPx}
                    />
                    <span className="pb-2.5 text-neutral-400">=</span>
                    <UnitInput
                        id="vw"
                        label="Viewport width"
                        unit="vw"
                        value={vw}
                        onChange={value => {
                            setVwPx((value / 100) * viewport);
                        }}
                    />
                </div>
                <UnitInput
                    id="viewport"
                    label="Screen width"
                    unit="px"
                    value={viewport}
                    onChange={setViewport}
                />
                <Result value={`${round(vw)}vw`} />
            </Card>
        </div>
    );
};

export default UnitConverter;
