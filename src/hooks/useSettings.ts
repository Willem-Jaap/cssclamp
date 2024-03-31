import { useForm, useFormContext } from 'react-hook-form';

type Mode = 'rem' | 'px' | 'tailwind';
type PreviewMode = 'container' | 'text';

interface Settings {
    minimumValue: number;
    maximumValue: number;
    minimumViewport: number;
    maximumViewport: number;
    mode: Mode;
    previewMode: PreviewMode;
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
            clamp: '',
        },
    });

    return methods;
};

const useSettings = () => {
    return useFormContext<Settings>();
};

export type { Settings, Mode, PreviewMode };
export { useSettingsProvider };
export default useSettings;
