'use client';

import { useRef } from 'react';
import { animated, useSpring } from '@react-spring/web';

import PreviewElement from '~/components/misc/preview-element';
import PreviewHeader from '~/components/misc/preview-header';
import PreviewText from '~/components/misc/preview-text';
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
                    className="relative h-full origin-top-left overflow-hidden rounded-xl border border-neutral-100 bg-neutral-50 pb-5"
                    style={{
                        width: width.to(w => {
                            centerPreviewScreen();
                            const previewWidth = previewRef.current?.getBoundingClientRect().width;
                            if (!previewWidth) return '100%';

                            return `${(previewWidth / 100) * w}px`;
                        }),
                    }}
                    ref={screenRef}>
                    <div className="mb-5 flex items-center justify-between gap-4 border-b border-b-neutral-100 px-4 py-4">
                        <div className="flex items-center space-x-2">
                            <div className="size-3 rounded-full bg-[#F05454]" />
                            <div className="size-3 rounded-full bg-[#F0C454]" />
                            <div className="size-3 rounded-full bg-[#48DD23]" />
                        </div>
                        <div className="flex-1">{/* <Tabs /> */}</div>
                    </div>
                    {watch('previewMode') === 'container' ? <PreviewElement /> : <PreviewText />}
                </animated.div>
            </div>
        </div>
    );
};

export default Preview;
