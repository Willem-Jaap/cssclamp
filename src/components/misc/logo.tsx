import Image from 'next/image';

import cn from '~/utils/cn';

interface Props {
    inverted?: boolean;
}

const Logo = ({ inverted = false }: Props) => {
    return (
        <span className="group flex items-center gap-2">
            {/* The black frame stays put; only the mark inside grows on hover. */}
            <span
                className={cn(
                    'flex size-7 overflow-hidden rounded-[7px] bg-black',
                    // The icon is a black square; outline it wherever the background is dark too.
                    inverted ? 'ring-1 ring-white/15' : 'dark:ring-1 dark:ring-white/15',
                )}>
                <Image
                    src="/assets/images/cssclamp-logo.png"
                    alt=""
                    width={28}
                    height={28}
                    priority
                    className="size-7 transition-transform duration-300 ease-out group-hover:scale-110"
                />
            </span>
            <span className="text-[0.9375rem] font-semibold tracking-tight whitespace-nowrap">
                CSS Clamp
            </span>
        </span>
    );
};

export default Logo;
