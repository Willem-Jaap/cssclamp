'use client';

import { useRef } from 'react';
import { animated, useSpring } from '@react-spring/web';

import PreviewElement from '~/components/misc/preview-element';
import PreviewHeader from '~/components/misc/preview-header';
import useSettings from '~/hooks/useSettings';

const Preview = () => {
    const { watch, setValue } = useSettings();
    const previewRef = useRef<HTMLDivElement>(null);
    const screenContainerRef = useRef<HTMLDivElement>(null);
    const screenRef = useRef<HTMLDivElement>(null);
    const [{ width }, api] = useSpring(() => ({
        width: 60,
    }));

    const centerPreviewScreen = () => {
        if (!screenRef.current || !previewRef.current || !screenContainerRef.current) return;

        const previewBoundingBox = previewRef.current.getBoundingClientRect();
        const screenBoundingBox = screenRef.current.getBoundingClientRect();

        screenRef.current.style.left = `${(previewBoundingBox.width - screenBoundingBox.width) / 2}px`;
    };

    return (
        <div
            className="relative flex min-h-[50vh] flex-col items-center overflow-hidden"
            ref={previewRef}>
            <PreviewHeader
                api={api}
                percentage={watch('percentage')}
                setPercentage={value => setValue('percentage', Number(value))}
            />
            <div
                className="pointer-events-none absolute left-0 mt-32 2xl:mt-40"
                ref={screenContainerRef}>
                <animated.div
                    className="relative h-full origin-top-left overflow-hidden rounded-lg border border-neutral-100 bg-neutral-50 py-5"
                    style={{
                        width: width.to(w => {
                            centerPreviewScreen();
                            const previewWidth = previewRef.current?.getBoundingClientRect().width;
                            if (!previewWidth) return '100%';

                            return `${(previewWidth / 100) * w}px`;
                        }),
                    }}
                    ref={screenRef}>
                    {watch('previewMode') === 'container' ? (
                        <PreviewElement />
                    ) : (
                        <div className="h-20 border border-dashed border-neutral-400 bg-neutral-400 px-2 py-1">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
                            tempor
                        </div>
                    )}
                </animated.div>
            </div>
        </div>
    );
};

export default Preview;
