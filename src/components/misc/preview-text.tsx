'use client';

import useSettings from '~/hooks/useSettings';

const PreviewText = () => {
    const { watch } = useSettings();
    const value = watch('clamp').replace('vw', 'cqw');

    if (watch('property') === 'line-height') {
        return (
            <p
                className="max-w-[70ch] px-16 text-xl text-neutral-700"
                style={{ lineHeight: value }}>
                Short lines on a phone read comfortably with tight line spacing. As the screen gets
                wider, lines get longer and the eye needs more room to find the start of the next
                line. A fluid line height adds that room gradually, so paragraphs stay easy to read
                at every width without a single breakpoint.
            </p>
        );
    }

    return (
        <p className="px-16 leading-tight font-medium text-neutral-950" style={{ fontSize: value }}>
            The quick brown fox jumps over the lazy dog
        </p>
    );
};

export default PreviewText;
