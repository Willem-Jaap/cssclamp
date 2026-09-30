import Image from 'next/image';

import cn from '~/utils/cn';

interface Props {
    inverted?: boolean;
}

const Logo = ({ inverted = false }: Props) => {
    return (
        <span className="group flex items-center gap-2">
            <Image
                src="/assets/images/cssclamp-logo.png"
                alt=""
                width={28}
                height={28}
                priority
                className={cn(
                    'size-7 rounded-[7px] transition-transform duration-300 group-hover:-rotate-6',
                    // The icon is a black square; outline it wherever the background is dark too.
                    inverted ? 'ring-1 ring-white/15' : 'dark:ring-1 dark:ring-white/15',
                )}
            />
            <span className="text-[0.9375rem] font-semibold tracking-tight whitespace-nowrap">
                CSS Clamp
            </span>
        </span>
    );
};

export default Logo;
