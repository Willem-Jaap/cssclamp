import Image from 'next/image';

const Logo = () => {
    return (
        <div className="flex items-center gap-4 font-mono">
            <Image src="/assets/images/logo.png" alt="CSS Clamp Logo" width={40} height={40} />
            <span>CSS Clamp</span>
        </div>
    );
};

export default Logo;
