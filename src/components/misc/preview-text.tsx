'use client';

import useSettings from '~/hooks/useSettings';

const PreviewText = () => {
    const { watch } = useSettings();

    return (
        <p
            className="px-16 leading-tight font-medium text-neutral-950"
            style={{ fontSize: watch('clamp').replace('vw', 'cqw') }}>
            The quick brown fox jumps over the lazy dog
        </p>
    );
};

export default PreviewText;
