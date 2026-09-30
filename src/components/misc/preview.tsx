'use client';

import { useEffect, useRef, useState } from 'react';
import { animated, useSpring } from '@react-spring/web';

import PreviewElement from '~/components/misc/preview-element';
import PreviewHeader from '~/components/misc/preview-header';
import PreviewText from '~/components/misc/preview-text';
import useSettings from '~/hooks/useSettings';

// The emulated screen is rendered at its real pixel width (a percentage of
// this width) and scaled down to fit the preview, so rem and container units
// inside it behave exactly like they would on a real screen of that size.
const MAX_SCREEN_WIDTH = 1920;
const CHROME_HEIGHT = 36;
const SCREEN_MARGIN = 48;
// Screens keep a 16:10 ratio, with a floor so narrow (mobile) widths stay usable.
const SCREEN_ASPECT_RATIO = 10 / 16;
const MIN_SCREEN_HEIGHT = 480;

const Preview = () => {
    const { watch, setValue } = useSettings();
    const areaRef = useRef<HTMLDivElement>(null);
    const [area, setArea] = useState({ width: 0, height: 0 });
    const [{ width }, api] = useSpring(() => ({
        width: watch('percentage'),
    }));

    useEffect(() => {
        const element = areaRef.current;
        if (!element) return;

        const observer = new ResizeObserver(([entry]) => {
            setArea({ width: entry.contentRect.width, height: entry.contentRect.height });
        });
        observer.observe(element);

        return () => {
            observer.disconnect();
        };
    }, []);

    const scale = area.width / MAX_SCREEN_WIDTH;
    const maxContentHeight = scale ? (area.height - SCREEN_MARGIN - CHROME_HEIGHT) / scale : 0;
    const contentHeight = width.to(w =>
        Math.min(
            Math.max((MAX_SCREEN_WIDTH / 100) * w * SCREEN_ASPECT_RATIO, MIN_SCREEN_HEIGHT),
            maxContentHeight,
        ),
    );

    return (
        <div className="flex h-full flex-col">
            <PreviewHeader
                api={api}
                percentage={watch('percentage')}
                setPercentage={value => {
                    setValue('percentage', Number(value));
                }}
            />
            <div
                className="pointer-events-none relative flex min-h-0 flex-1 items-start justify-center overflow-hidden bg-canvas bg-[radial-gradient(var(--color-dot)_1px,transparent_1px)] bg-size-[16px_16px] px-6 pt-6"
                ref={areaRef}>
                {scale > 0 && (
                    <animated.div
                        className="h-fit overflow-hidden rounded-xl border border-line bg-white shadow-[0_12px_32px_-12px_rgb(0_0_0/0.12)]"
                        style={{
                            width: width.to(w => (MAX_SCREEN_WIDTH / 100) * w * scale),
                        }}>
                        <div
                            className="flex items-center gap-1.5 border-b border-b-line px-3"
                            style={{ height: CHROME_HEIGHT }}>
                            <div className="size-2.5 rounded-full bg-[#F05454]" />
                            <div className="size-2.5 rounded-full bg-[#F0C454]" />
                            <div className="size-2.5 rounded-full bg-[#48DD23]" />
                        </div>
                        <animated.div
                            className="@container origin-top-left overflow-hidden py-8"
                            style={{
                                width: width.to(w => (MAX_SCREEN_WIDTH / 100) * w),
                                height: contentHeight,
                                transform: `scale(${scale})`,
                                marginBottom: contentHeight.to(h => h * (scale - 1)),
                            }}>
                            {watch('property') === 'line-height' ||
                            (!watch('property') && watch('previewMode') === 'text') ? (
                                <PreviewText />
                            ) : (
                                <PreviewElement />
                            )}
                        </animated.div>
                    </animated.div>
                )}
            </div>
        </div>
    );
};

export default Preview;
