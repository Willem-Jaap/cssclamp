import { useEffect } from 'react';
import { useForm, useFormContext } from 'react-hook-form';

import { getTailwindValue } from '~/utils/getTailwindValue';

type Mode = 'rem' | 'px' | 'tailwind';
type PreviewMode = 'container' | 'text';

interface Settings {
    minimumValue: number;
    maximumValue: number;
    minimumViewport: number;
    maximumViewport: number;
    mode: Mode;
    previewMode: PreviewMode;
    percentage: number;
    clamp: string;
}

const useSettingsProvider = () => {
    const methods = useForm<Settings>({
        defaultValues: {
            minimumValue: 1,
            maximumValue: 8,
            minimumViewport: 24,
            maximumViewport: 120,
            mode: 'rem',
            previewMode: 'container',
            percentage: 60,
            clamp: '',
        },
    });

    const { getValues, setValue, watch } = methods;

    const remify = (px: number) => px / 16;
    const toFixed = (num: number) => parseFloat(num.toFixed(3));

    const getValue = (value: number, mode: Mode) => {
        if (mode === 'rem') {
            return value;
        }

        if (mode === 'tailwind') {
            return getTailwindValue(value);
        }

        return remify(value);
    };

    useEffect(() => {
        let maximumValue = remify(getValues('maximumValue'));
        let minimumValue = remify(getValues('minimumValue'));
        let maximumViewport = remify(getValues('maximumViewport'));
        let minimumViewport = remify(getValues('minimumViewport'));

        if (getValues('mode') === 'rem') {
            maximumValue = getValues('maximumValue');
            minimumValue = getValues('minimumValue');
            maximumViewport = getValues('maximumViewport');
            minimumViewport = getValues('minimumViewport');
        }

        const slope = (maximumValue - minimumValue) / (maximumViewport - minimumViewport);
        const intersection = maximumValue - slope * maximumViewport;

        const mode = watch('mode');
        const clamp = `clamp(${getValue(watch('minimumValue'), mode)}rem, ${toFixed(
            intersection,
        )}rem + ${toFixed(slope * 100)}vw, ${getValue(watch('maximumValue'), mode)}rem)`;

        setValue('clamp', clamp);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [watch]);

    return methods;
};

const useSettings = () => {
    return useFormContext<Settings>();
};

export type { Settings, Mode, PreviewMode };
export { useSettingsProvider };
export default useSettings;
