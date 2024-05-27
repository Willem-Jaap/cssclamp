import cn from '~/utils/cn';

interface Props {
    name: string;
    className?: string;
}

const Icon = ({ name, className }: Props) => {
    return (
        <img
            className={cn(`h-[1em] w-[1em]`, className)}
            src={`/assets/icons/${name}.svg`}
            alt={name}
        />
    );
};

export default Icon;
