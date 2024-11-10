'use client';

import useSettings from '~/hooks/useSettings';

const PreviewElement = () => {
    const { watch } = useSettings();

    return (
        <div
            className="h-20 border border-dashed border-neutral-400 bg-neutral-400 px-2 py-1"
            style={{ margin: `0 ${watch('clamp').replace('vw', '%')}` }}>
            PreviewElement ({watch('clamp')})
        </div>
    );
};

export default PreviewElement;
