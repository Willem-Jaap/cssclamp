'use client';

import useSettings from '~/hooks/useSettings';

const PreviewText = () => {
    const { watch } = useSettings();

    return (
        <div
            className="h-20 rounded-lg border border-dashed border-neutral-400 bg-neutral-200 px-2 py-1"
            style={{ margin: `0 ${watch('clamp').replace('vw', '%')}` }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
        </div>
    );
};

export default PreviewText;
