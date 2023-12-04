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
            minimumValue: 1,
            maximumValue: 8,
            minimumViewport: 20,
            maximumViewport: 120,
            mode: 'rem',
            clamp: '',
        },
    });

    return methods;
};

export type { Settings, Mode };
export default useSettings;
