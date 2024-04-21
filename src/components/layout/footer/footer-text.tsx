'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const FooterText = () => {
    const textRef = useRef<HTMLSpanElement>(null);

    useGSAP(() => {
        // Animate letter spacing on scroll
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '#footer',
                start: 'top+=20 bottom',
                end: 'bottom bottom',
                scrub: true,
            },
        });

        tl.to(textRef.current, {
            letterSpacing: '0rem',
        });
    });

    return (
        <span
            className="mt-24 block translate-y-[20%] whitespace-nowrap px-[clamp(1rem,_0.25rem_+_3.125vw,_4rem)] text-[clamp(4rem,_3rem_+_4.167vw,_8rem)] font-medium leading-none"
            style={{ letterSpacing: '2rem' }}
            ref={textRef}>
            CSS Clamp
        </span>
    );
};

export default FooterText;
