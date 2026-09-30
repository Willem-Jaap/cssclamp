import cn from '~/utils/cn';

// Three bars of different widths sit between two brackets (the min and max). On hover
// they grow until the brackets stop them: clamp() in one gesture.
const bars = [
    { y: 5.5, scale: 'scale-x-[0.8]', delay: 'delay-0' },
    { y: 9, scale: 'scale-x-[0.5]', delay: 'delay-75' },
    { y: 12.5, scale: 'scale-x-[0.25]', delay: 'delay-150' },
];

interface Props {
    inverted?: boolean;
}

const Logo = ({ inverted = false }: Props) => {
    return (
        <span className="group flex items-center gap-2.5">
            <span
                className={cn(
                    'flex size-8 items-center justify-center rounded-lg transition-transform duration-300 group-hover:-rotate-3',
                    inverted ? 'bg-neutral-50 text-neutral-950' : 'bg-neutral-950 text-white',
                )}>
                <svg
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    className="size-5">
                    <path
                        d="M5 3.5H3.5v13H5M15 3.5h1.5v13H15"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    {bars.map(bar => (
                        <rect
                            key={bar.y}
                            x="5.75"
                            y={bar.y}
                            width="8.5"
                            height="2"
                            rx="1"
                            fill="currentColor"
                            className={cn(
                                'origin-center transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] [transform-box:fill-box] group-hover:scale-x-100',
                                bar.scale,
                                bar.delay,
                            )}
                        />
                    ))}
                </svg>
            </span>
            <span className="text-base font-medium tracking-tight whitespace-nowrap">
                CSS Clamp
            </span>
        </span>
    );
};

export default Logo;
