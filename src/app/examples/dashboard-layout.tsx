'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

import CopyButton from '~/components/ui/copy-button';
import { resolveFluid, toClamp } from '~/utils/fluid';

import ScreenWidthControl, { DESKTOP, MOBILE } from '~/app/examples/screen-width-control';

const SCREEN_HEIGHT = 820;

const tokens = [
    { name: '--page-gutter', label: 'Page gutter', mobile: 16, desktop: 64 },
    { name: '--layout-gap', label: 'Gap', mobile: 12, desktop: 32 },
    { name: '--card-padding', label: 'Card padding', mobile: 16, desktop: 28 },
] as const;

const withRange = (mobile: number, desktop: number) => ({
    minSize: mobile,
    maxSize: desktop,
    minViewport: MOBILE,
    maxViewport: DESKTOP,
});

const css = `:root {
${tokens.map(({ name, mobile, desktop }) => `    ${name}: ${toClamp(withRange(mobile, desktop))};`).join('\n')}
}

.page {
    padding-inline: var(--page-gutter);
}

.grid {
    display: grid;
    gap: var(--layout-gap);
}

.card {
    padding: var(--card-padding);
}`;

// Diagonal stripes that mark the gutters on both sides of the content.
const gutterStyle = {
    backgroundImage:
        'repeating-linear-gradient(135deg, var(--color-primary-200) 0 1px, transparent 1px 8px)',
};

const Bar = ({ className }: { className: string }) => <div className={`rounded ${className}`} />;

interface CardProps {
    padding: number;
    className?: string;
    children: ReactNode;
}

const Card = ({ padding, className = '', children }: CardProps) => (
    <div className={`rounded-xl bg-white ring-1 ring-line ${className}`} style={{ padding }}>
        {children}
    </div>
);

const Dashboard = ({ width }: { width: number }) => {
    const [gutter, gap, padding] = tokens.map(({ mobile, desktop }) =>
        resolveFluid(withRange(mobile, desktop), width),
    );
    const statColumns = width >= 1024 ? 4 : width >= 560 ? 2 : 1;
    const wide = width >= 1024;

    return (
        <div className="relative h-full overflow-hidden bg-canvas" style={{ width }}>
            <div
                aria-hidden
                className="absolute inset-y-0 left-0 z-10 bg-primary-50/60"
                style={{ width: gutter, ...gutterStyle }}
            />
            <div
                aria-hidden
                className="absolute inset-y-0 right-0 z-10 bg-primary-50/60"
                style={{ width: gutter, ...gutterStyle }}
            />

            <div
                className="flex h-14 items-center justify-between border-b border-b-line bg-white"
                style={{ paddingInline: gutter }}>
                <div className="flex items-center gap-3">
                    <div className="size-7 rounded-lg bg-neutral-950" />
                    {width >= 560 && (
                        <div className="flex gap-2">
                            <Bar className="h-3 w-14 bg-neutral-950/80" />
                            <Bar className="h-3 w-12 bg-line" />
                            <Bar className="h-3 w-16 bg-line" />
                        </div>
                    )}
                </div>
                <div className="size-7 rounded-full bg-line" />
            </div>

            <div className="flex flex-col" style={{ paddingInline: gutter, paddingTop: gap, gap }}>
                <div className="flex items-end justify-between gap-4">
                    <div className="flex flex-col gap-2">
                        <Bar className="h-5 w-40 bg-neutral-950" />
                        <Bar className="h-3 w-56 max-w-full bg-line" />
                    </div>
                    <div className="h-9 w-24 shrink-0 rounded-lg bg-neutral-950" />
                </div>

                <div
                    className="grid"
                    style={{ gap, gridTemplateColumns: `repeat(${statColumns}, minmax(0, 1fr))` }}>
                    {['revenue', 'orders', 'visitors', 'conversion'].map(stat => (
                        <Card key={stat} padding={padding}>
                            <Bar className="h-3 w-20 bg-line" />
                            <Bar className="mt-3 h-6 bg-neutral-950" />
                            <div className="mt-3 flex items-center gap-2">
                                <Bar className="h-3 w-10 bg-primary-200" />
                                <Bar className="h-3 flex-1 bg-line" />
                            </div>
                        </Card>
                    ))}
                </div>

                <div
                    className="grid"
                    style={{ gap, gridTemplateColumns: wide ? '2fr 1fr' : 'minmax(0, 1fr)' }}>
                    <Card padding={padding}>
                        <Bar className="h-4 w-32 bg-neutral-950" />
                        <svg
                            viewBox="0 0 400 140"
                            preserveAspectRatio="none"
                            aria-hidden="true"
                            className="mt-4 h-44 w-full">
                            <path
                                d="M0 120 C40 110 60 70 100 80 S160 40 200 60 S270 20 310 35 S370 10 400 18 V140 H0 Z"
                                className="fill-primary-50"
                            />
                            <path
                                d="M0 120 C40 110 60 70 100 80 S160 40 200 60 S270 20 310 35 S370 10 400 18"
                                fill="none"
                                vectorEffect="non-scaling-stroke"
                                strokeWidth="2"
                                className="stroke-primary-400"
                            />
                        </svg>
                    </Card>
                    <Card padding={padding} className="flex flex-col gap-4">
                        <Bar className="h-4 w-24 bg-neutral-950" />
                        {[0, 1, 2, 3].map(row => (
                            <div key={row} className="flex items-center gap-3">
                                <div className="size-7 shrink-0 rounded-full bg-line" />
                                <div className="flex flex-1 flex-col gap-1.5">
                                    <Bar className="h-3 w-3/4 bg-neutral-950/70" />
                                    <Bar className="h-2.5 w-1/2 bg-line" />
                                </div>
                            </div>
                        ))}
                    </Card>
                </div>
            </div>
        </div>
    );
};

const DashboardLayout = () => {
    const [width, setWidth] = useState(DESKTOP);
    const areaRef = useRef<HTMLDivElement>(null);
    const [available, setAvailable] = useState(0);

    useEffect(() => {
        const element = areaRef.current;
        if (!element) return;

        const observer = new ResizeObserver(([entry]) => {
            setAvailable(entry.contentRect.width);
        });
        observer.observe(element);

        return () => {
            observer.disconnect();
        };
    }, []);

    // Render the dashboard at its real width and scale it down, so every value is true to size.
    const scale = available / DESKTOP;

    return (
        <div className="flex flex-col gap-10">
            <section className="overflow-hidden rounded-xl border border-line">
                <ScreenWidthControl width={width} onChange={setWidth} />
                <div
                    ref={areaRef}
                    className="flex justify-center bg-canvas bg-[radial-gradient(var(--color-dot)_1px,transparent_1px)] bg-size-[16px_16px] px-4 py-6">
                    {scale > 0 && (
                        <div
                            className="overflow-hidden rounded-lg shadow-[0_12px_32px_-12px_rgb(0_0_0/0.15)] ring-1 ring-line"
                            style={{ width: width * scale, height: SCREEN_HEIGHT * scale }}>
                            <div
                                className="origin-top-left"
                                style={{ height: SCREEN_HEIGHT, transform: `scale(${scale})` }}>
                                <Dashboard width={width} />
                            </div>
                        </div>
                    )}
                </div>
                <dl className="grid divide-line border-t border-t-line sm:grid-cols-3 sm:divide-x">
                    {tokens.map(({ name, label, mobile, desktop }) => (
                        <div key={name} className="flex flex-col gap-1 px-4 py-3">
                            <dt className="flex items-center justify-between gap-2 text-sm text-neutral-500">
                                {label}
                                <span className="font-mono text-xs text-neutral-400">
                                    {mobile}px → {desktop}px
                                </span>
                            </dt>
                            <dd className="font-mono text-lg text-neutral-950 tabular-nums">
                                {resolveFluid(withRange(mobile, desktop), width).toFixed(1)}px
                            </dd>
                        </div>
                    ))}
                </dl>
            </section>

            <section className="flex flex-col gap-3">
                <div>
                    <h3 className="text-lg font-medium tracking-tight text-neutral-950">
                        Copy the layout tokens
                    </h3>
                    <p className="mt-1 text-sm text-neutral-500">
                        Three values do all the work: the gutter on both sides of the page, the gap
                        between blocks and the padding inside cards.
                    </p>
                </div>
                <div className="relative rounded-lg bg-neutral-950 py-4 pr-12 pl-5 scheme-fixed dark:ring-1 dark:ring-white/10">
                    <pre className="overflow-x-auto font-mono text-[0.8125rem] leading-relaxed text-neutral-100">
                        {css}
                    </pre>
                    <CopyButton
                        value={css}
                        label="Copy layout tokens"
                        className="absolute top-3 right-3 text-neutral-400 hover:bg-white/10 hover:text-neutral-50"
                    />
                </div>
            </section>
        </div>
    );
};

export default DashboardLayout;
