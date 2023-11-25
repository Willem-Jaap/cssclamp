'use client';

import { type ChangeEvent } from 'react';

import { animated, useSpring } from '@react-spring/web';

const Preview = () => {
    const [{ width }, api] = useSpring(() => ({ width: 60 }));

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        api.start({ width: +Number(e.target.value) });
    };

    return (
        <div className="flex flex-col py-4">
            <input
                className="w-40 mx-auto mb-4"
                type="range"
                min="0"
                max="100"
                step="1"
                onChange={onChange}
            />
            <animated.div
                className="h-full rounded-lg bg-neutral-800 py-8 mx-auto border border-neutral-700"
                style={{ width: width.to(w => `${w}%`) }}
            />
        </div>
    );
};

export default Preview;
