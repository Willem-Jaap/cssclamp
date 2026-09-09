'use client';

import { useEffect, useRef, useState, type ChangeEvent } from 'react';
import { animated, useSpring } from '@react-spring/web';
import { useFormContext } from 'react-hook-form';

import { type Settings } from '~/hooks/useSettings';
import cn from '~/utils/cn';

const Clamped = () => {
    const { watch } = useFormContext<Settings>();
    const clamp = watch('clamp').replace('vw', '%');

    return (
        <div
            className="h-20 border border-dashed border-neutral-400 bg-neutral-400 px-2 py-1 text-lg"
            style={{
                margin: `0 ${clamp}`,
            }}
        />
    );
};

const Preview = () => {
    const previewRef = useRef<HTMLDivElement>(null);
    const screenContainerRef = useRef<HTMLDivElement>(null);
    const screenRef = useRef<HTMLDivElement>(null);
    const [currentPercentage, setCurrentPercentage] = useState<number>(60);
    const [{ width }, api] = useSpring(() => ({
        width: 60,
    }));

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        void api.start({ width: Number(e.target.value) });
        setCurrentPercentage(Number(e.target.value));
    };

    const centerPreviewScreen = () => {
        if (!screenRef.current || !previewRef.current || !screenContainerRef.current) return;

        // Get position of the preview
        const previewBoundingBox = previewRef.current.getBoundingClientRect();
        const screenBoundingBox = screenRef.current.getBoundingClientRect();

        const translateXRequiredForCentering =
            (previewBoundingBox.width - screenBoundingBox.width) / 2;

        screenContainerRef.current.style.transform = `translateX(${
            previewBoundingBox.x + translateXRequiredForCentering
        }px)`;
    };

    useEffect(() => {
        // Set the initial screen scale
        const onResize = () => {
            const width = previewRef.current?.clientWidth;
            const scale = width ? width / 1920 : 0;
            if (!screenRef.current || !previewRef.current || !screenContainerRef.current) {
                return;
            }
            screenRef.current.style.transform = `scale(${scale})`;
            centerPreviewScreen();
        };
        onResize();
        window.addEventListener('resize', onResize);
        centerPreviewScreen();

        return () => {
            window.removeEventListener('resize', onResize);
        };
    }, []);

    return (
        <div
            className="flex min-h-[50vh] flex-col items-center overflow-hidden py-4"
            ref={previewRef}>
            <input
                className="mx-auto mb-4 w-40"
                type="range"
                min="0"
                max="100"
                step="1"
                defaultValue="60"
                onChange={onChange}
            />
            <div className="mx-auto mb-4 inline text-xs whitespace-nowrap 2xl:hidden">
                Emulated screen width: {Math.round((1920 / 100) * currentPercentage)}px
            </div>
            <div
                className="pointer-events-none absolute left-0 mt-16 w-[1920px] overflow-hidden 2xl:mt-12"
                ref={screenContainerRef}>
                <animated.div
                    className="relative h-full origin-top-left scale-0 overflow-hidden rounded-lg border border-neutral-700 bg-neutral-800 pt-12 pb-8"
                    style={{
                        // react-spring runs this interpolator on animation
                        // frames rather than during React's render pass, so
                        // reading refs here is safe.
                        // eslint-disable-next-line react-hooks/refs
                        width: width.to(w => {
                            centerPreviewScreen();
                            return `${(w * 1920) / 100}px`;
                        }),
                    }}
                    ref={screenRef}>
                    <div className="absolute top-4 left-4">
                        <div className="flex items-center gap-2">
                            <div className="h-4 w-4 rounded-full bg-red-500" />
                            <div className="h-4 w-4 rounded-full bg-yellow-500" />
                            <div className="h-4 w-4 rounded-full bg-green-500" />
                        </div>
                    </div>
                    <div
                        className={cn(
                            'absolute top-2 text-lg whitespace-nowrap max-2xl:hidden',
                            currentPercentage > 30 ? 'left-1/2 -translate-x-1/2' : 'right-4',
                        )}>
                        {currentPercentage > 30
                            ? 'Emulated screen width: '
                            : currentPercentage > 15
                              ? 'Screen width: '
                              : ''}
                        {Math.round((1920 / 100) * currentPercentage)}px
                    </div>
                    <Clamped />
                </animated.div>
            </div>
        </div>
    );
};

export default Preview;
