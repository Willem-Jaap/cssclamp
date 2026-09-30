'use client';

import { useEffect, useRef, useState } from 'react';

import { Slider } from '~/components/ui/slider';

const MIN_WIDTH = 320;
const MAX_WIDTH = 1440;
const SCREEN_HEIGHT = 300;

// 1rem at 320px up to 4rem at 1440px, see the deepdive for the maths.
const CLAMP = 'clamp(1rem, 0.143rem + 4.286vw, 4rem)';

const getSteppedPadding = (width: number) => {
    if (width >= 1024) return 64;
    if (width >= 768) return 32;
    return 16;
};

const getClampedPadding = (width: number) => Math.min(Math.max(2.286 + 0.04286 * width, 16), 64);

interface ScreenProps {
    label: string;
    code: string;
    width: number;
    scale: number;
    padding: number;
}

const Screen = ({ label, code, width, scale, padding }: ScreenProps) => {
    return (
        <figure className="not-prose flex flex-col gap-3">
            <figcaption className="flex items-baseline justify-between gap-4 text-sm">
                <span className="font-medium text-neutral-950">{label}</span>
                <code className="font-mono text-xs text-neutral-500">{code}</code>
            </figcaption>
            <div className="flex justify-center rounded-lg bg-canvas bg-[radial-gradient(var(--color-dot)_1px,transparent_1px)] bg-size-[16px_16px] p-4 ring-1 ring-line">
                <div
                    className="overflow-hidden rounded-md bg-white shadow-sm ring-1 ring-line"
                    style={{ width: width * scale, height: SCREEN_HEIGHT * scale }}>
                    <div
                        className="origin-top-left bg-primary-50"
                        style={{
                            width,
                            height: SCREEN_HEIGHT,
                            padding,
                            transform: `scale(${scale})`,
                        }}>
                        <div className="flex h-full flex-col gap-6 rounded-xl bg-white p-8 ring-1 ring-primary-200">
                            <div className="h-10 w-2/3 rounded-lg bg-neutral-950" />
                            <div className="flex flex-col gap-3">
                                <div className="h-4 rounded bg-line" />
                                <div className="h-4 rounded bg-line" />
                                <div className="h-4 w-4/5 rounded bg-line" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <p className="text-sm text-neutral-500">
                Padding at {width}px:{' '}
                <span className="font-mono text-neutral-950 tabular-nums">
                    {padding.toFixed(1)}px
                </span>
            </p>
        </figure>
    );
};

const Example = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [available, setAvailable] = useState(0);
    const [width, setWidth] = useState(900);

    useEffect(() => {
        const element = containerRef.current;
        if (!element) return;

        const observer = new ResizeObserver(([entry]) => {
            // Leave room for the canvas padding around each screen.
            setAvailable(entry.contentRect.width - 32);
        });
        observer.observe(element);

        return () => {
            observer.disconnect();
        };
    }, []);

    const scale = available > 0 ? available / MAX_WIDTH : 0;

    return (
        <div ref={containerRef} className="not-prose my-8 flex flex-col gap-8">
            <div className="flex items-center gap-4 rounded-lg bg-canvas px-4 py-3 ring-1 ring-line">
                <span className="text-sm whitespace-nowrap text-neutral-500">Screen width</span>
                <Slider
                    aria-label="Screen width"
                    min={MIN_WIDTH}
                    max={MAX_WIDTH}
                    step={1}
                    value={[width]}
                    onValueChange={([value]) => {
                        setWidth(value);
                    }}
                />
                <span className="w-16 text-right font-mono text-xs text-neutral-700 tabular-nums">
                    {width}px
                </span>
            </div>
            {scale > 0 && (
                <>
                    <Screen
                        label="Media queries"
                        code="16px → 32px @768 → 64px @1024"
                        width={width}
                        scale={scale}
                        padding={getSteppedPadding(width)}
                    />
                    <Screen
                        label="clamp()"
                        code={CLAMP}
                        width={width}
                        scale={scale}
                        padding={getClampedPadding(width)}
                    />
                </>
            )}
        </div>
    );
};

export default Example;
