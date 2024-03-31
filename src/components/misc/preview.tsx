'use client';

import { useEffect, useRef, useState, type ChangeEvent } from 'react';
import { animated, useSpring } from '@react-spring/web';

import { Button } from '~/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import useSettings, { type PreviewMode } from '~/hooks/useSettings';
import cn from '~/utils/cn';

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
    const { watch, setValue } = useSettings();
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
            className="relative flex min-h-[50vh] flex-col items-center overflow-hidden py-4"
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
            <div className="absolute right-0 top-0 flex items-center justify-between gap-4 p-4">
                <span className="whitespace-nowrap">Preview mode</span>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="secondary">
                            {watch('previewMode') === 'container' ? 'Container' : 'Text'}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="mr-[clamp(2rem,_1.6rem_+_2vw,_4rem)] w-56">
                        <DropdownMenuLabel>Preview mode</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuRadioGroup
                            value={watch('previewMode')}
                            onValueChange={mode => setValue('previewMode', mode as PreviewMode)}>
                            <DropdownMenuRadioItem value="container">
                                Container
                            </DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="text">Text</DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="mx-auto mb-4 inline whitespace-nowrap text-xs 2xl:hidden">
                Emulated screen width: {Math.round((1920 / 100) * currentPercentage)}px
            </div>
            <div
                className="pointer-events-none absolute left-0 mt-16 w-[1920px] overflow-hidden 2xl:mt-12"
                ref={screenContainerRef}>
                <animated.div
                    className="relative h-full origin-top-left scale-0 overflow-hidden rounded-lg border border-neutral-700 bg-neutral-800 pb-8 pt-12"
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
                    <div
                        className={cn(
                            'absolute top-2 whitespace-nowrap text-lg max-2xl:hidden',
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
