'use client';

import { useEffect, useRef, useState, type ChangeEvent } from 'react';
import { animated, useSpring } from '@react-spring/web';

import useSettings from '~/hooks/useSettings';

const Clamped = () => {
    const { watch } = useSettings();
    const clamp = watch('clamp').replace('vw', '%');
    if (watch('previewMode') === 'text') {
        return (
            <div
                className="h-20 border border-dashed border-neutral-400 bg-neutral-400 px-2 py-1"
                style={{
                    fontSize: clamp,
                }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            </div>
        );
    }

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
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        api.start({ width: Number(e.target.value) });
        setCurrentPercentage(Number(e.target.value));
    };

    const centerPreviewScreen = () => {
        if (!screenRef.current || !previewRef.current || !screenContainerRef.current) return;

        // Get position of the preview
        const previewBoundingBox = previewRef.current.getBoundingClientRect();
        const screenBoundingBox = screenRef.current.getBoundingClientRect();

        screenRef.current.style.left = `${(previewBoundingBox.width - screenBoundingBox.width) / 2}px`;
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
            className="relative flex min-h-[50vh] flex-col items-center overflow-hidden"
            ref={previewRef}>
            <div className="flex w-full items-center justify-between gap-4 border-b border-b-neutral-100 p-5">
                <div className="text-lg font-medium">Emulated screen width</div>
                <div className="flex items-center gap-4">
                    <input
                        className="w-40 decoration-neutral-800"
                        type="range"
                        min="0"
                        max="100"
                        step="1"
                        defaultValue="60"
                        onChange={onChange}
                    />
                    <div className="rounded-lg border border-neutral-100 px-4 py-2 font-medium text-neutral-600">
                        {Math.round((1920 / 100) * currentPercentage)}px
                    </div>
                </div>
            </div>

            <div
                className="pointer-events-none absolute left-0 mt-32 w-[1920px] overflow-hidden 2xl:mt-40"
                ref={screenContainerRef}>
                <animated.div
                    className="relative h-full origin-top-left scale-0 overflow-hidden rounded-lg border border-neutral-100 bg-neutral-50 pb-8 pt-12"
                    style={{
                        width: width.to(w => {
                            centerPreviewScreen();
                            return `${(w * 1920) / 100}px`;
                        }),
                    }}
                    ref={screenRef}>
                    <div className="absolute left-4 top-4">
                        <div className="flex items-center gap-2">
                            <div className="h-4 w-4 rounded-full bg-red-500" />
                            <div className="h-4 w-4 rounded-full bg-yellow-500" />
                            <div className="h-4 w-4 rounded-full bg-green-500" />
                        </div>
                    </div>
                    <Clamped />
                </animated.div>
            </div>
        </div>
    );
};

export default Preview;
