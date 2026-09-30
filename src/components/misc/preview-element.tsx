'use client';

import useSettings from '~/hooks/useSettings';

const PreviewElement = () => {
    const { watch } = useSettings();

    return (
        <div
            className="h-64 rounded-2xl border-4 border-dashed border-primary-200 bg-primary-50"
            style={{ margin: `0 ${watch('clamp').replace('vw', 'cqw')}` }}
        />
    );
};

export default PreviewElement;
