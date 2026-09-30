'use client';

import useSettings from '~/hooks/useSettings';

const box = 'rounded-2xl border-4 border-dashed border-primary-200 bg-primary-50';

const PreviewElement = () => {
    const { watch } = useSettings();
    const value = watch('clamp').replace('vw', 'cqw');
    const property = watch('property');

    if (property === 'gap') {
        return (
            <div className="grid grid-cols-3 px-16" style={{ gap: value }}>
                {[0, 1, 2, 3, 4, 5].map(index => (
                    <div key={index} className={`h-32 ${box}`} />
                ))}
            </div>
        );
    }

    if (property === 'border-radius') {
        return (
            <div className="px-16">
                <div
                    className="h-72 border-4 border-primary-200 bg-primary-50"
                    style={{ borderRadius: value }}
                />
            </div>
        );
    }

    return <div className={`h-64 ${box}`} style={{ margin: `0 ${value}` }} />;
};

export default PreviewElement;
