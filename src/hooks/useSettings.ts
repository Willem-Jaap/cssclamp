import { useForm } from 'react-hook-form';

type Mode = 'rem' | 'px' | 'tailwind';

interface Settings {
    minimumValue: number;
    maximumValue: number;
    minimumViewport: number;
    maximumViewport: number;
    mode: Mode;
    clamp: string;
}

const useSettings = () => {
    const methods = useForm<Settings>({
        defaultValues: {
            minimumValue: 16,
            maximumValue: 128,
            minimumViewport: 320,
            maximumViewport: 1920,
            mode: 'px',
            clamp: '',
        },
    });

    return methods;
};

export type { Settings, Mode };
export default useSettings;
