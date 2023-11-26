'use client';

import { type ChangeEvent, useEffect, useRef, useState } from 'react';

import { animated, useSpring } from '@react-spring/web';

interface ClampedProps {
    clamp: string;
}

const Clamped = ({ clamp }: ClampedProps) => {
    return (
        <div
            className="border border-dashed border-neutral-400 text-lg px-2 py-1 bg-neutral-400 h-20"
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
        api.start({ width: Number(e.target.value) });
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
            className="flex flex-col items-center py-4 overflow-hidden min-h-[50vh]"
            ref={previewRef}>
            <input
                className="w-40 mx-auto mb-4"
                type="range"
                min="0"
                max="100"
                step="1"
                defaultValue="60"
                onChange={onChange}
            />
            <div className="inline whitespace-nowrap 2xl:hidden text-xs mx-auto mb-4">
                Emulated screen width: {Math.round((1920 / 100) * currentPercentage)}px
            </div>
            <div
                className="absolute left-0 mt-16 2xl:mt-12 w-[1920px] overflow-hidden pointer-events-none"
                ref={screenContainerRef}>
                <animated.div
                    className="relative h-full rounded-lg bg-neutral-800 pt-12 pb-8 border border-neutral-700 overflow-hidden scale-0 origin-top-left"
                    style={{
                        width: width.to(w => {
                            centerPreviewScreen();
                            return `${(w * 1920) / 100}px`;
                        }),
                    }}
                    ref={screenRef}>
                    <div className="absolute top-4 left-4">
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full bg-red-500" />
                            <div className="w-4 h-4 rounded-full bg-yellow-500" />
                            <div className="w-4 h-4 rounded-full bg-green-500" />
                        </div>
                    </div>
                    <div className="absolute top-3 left-1/2 -translate-x-1/2 whitespace-nowrap text-lg max-2xl:hidden">
                        Emulated screen width: {Math.round((1920 / 100) * currentPercentage)}px
                    </div>
                    <Clamped clamp="clamp(1rem, -1.3333rem + 7.7778%, 8rem)" />
                </animated.div>
            </div>
        </div>
    );
};

export default Preview;
