interface Props {
    className?: string;
}

// Mark taken from the Pixel Perfect site (pixel-perfect-icon-wordmark.svg).
const PixelPerfectLogo = ({ className }: Props) => {
    return (
        <svg
            viewBox="0 0 23 23"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className={className}>
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M22.652 0H0V22.6532H12.944V22.652H22.652V0ZM12.944 20.2254H20.2258V2.42744H2.42785V9.70917H12.944V20.2254ZM2.42785 12.1356V20.2254H10.5178V12.1356H2.42785Z"
            />
        </svg>
    );
};

// Mark taken from the Eyes docs (eyes-logo.tsx).
const EyesLogo = ({ className }: Props) => {
    return (
        <svg
            viewBox="0 0 32 18"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className={className}>
            <path d="M0 11.5605C1.34622 12.8814 2.85723 14.0342 4.5 14.9854V9H0V11.5605Z" />
            <path d="M6.75 16.124C8.17887 16.7489 9.68454 17.2308 11.25 17.5488V2.8125H6.75V16.124Z" />
            <path d="M15.75 0C14.9894 1.53905e-05 14.2388 0.044242 13.5 0.125977V17.8857C14.2401 17.9593 14.9905 18 15.75 18C16.5094 18 17.26 17.9592 18 17.8857V0.125977C17.2613 0.044306 16.5105 0 15.75 0Z" />
            <path d="M20.25 17.5488C21.8155 17.2309 23.321 16.7487 24.75 16.124V11.25H20.25V17.5488Z" />
            <path d="M27 14.9873C28.6426 14.0366 30.1538 12.8847 31.5 11.5645V7.875H27V14.9873Z" />
        </svg>
    );
};

export { PixelPerfectLogo, EyesLogo };
