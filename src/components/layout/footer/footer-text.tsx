'use client';

import { useEffect, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { usePathname } from 'next/navigation';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const FooterText = () => {
    const pathname = usePathname();
    const textRef = useRef<HTMLSpanElement>(null);

    useGSAP(
        () => {
            // Letters start spread out and settle as the footer scrolls into view.
            gsap.timeline({
                scrollTrigger: {
                    trigger: '#footer',
                    start: 'top bottom',
                    end: 'bottom bottom',
                    scrub: true,
                    invalidateOnRefresh: true,
                },
            }).fromTo(
                textRef.current,
                { letterSpacing: '0.12em' },
                { letterSpacing: '-0.04em', ease: 'none' },
            );
        },
        // The footer lives in the root layout and survives client-side navigation,
        // so rebuild the trigger for every page.
        { dependencies: [pathname], revertOnUpdate: true },
    );

    useEffect(() => {
        // Trigger positions are cached; recalculate them when the page height changes
        // (route changes, images and client components rendering in).
        let frame = 0;
        const observer = new ResizeObserver(() => {
            cancelAnimationFrame(frame);
            frame = requestAnimationFrame(() => {
                ScrollTrigger.refresh();
            });
        });
        observer.observe(document.body);

        return () => {
            cancelAnimationFrame(frame);
            observer.disconnect();
        };
    }, []);

    return (
        <div className="px-[clamp(1rem,_0.25rem_+_3.125vw,_4rem)]">
            <span
                ref={textRef}
                aria-hidden
                className="-mb-[0.18em] block bg-linear-to-b from-neutral-50 to-neutral-50/10 bg-clip-text leading-none font-medium whitespace-nowrap text-transparent select-none"
                style={{
                    fontSize: 'clamp(3rem, 0.2rem + 18.5vw, 24rem)',
                    letterSpacing: '-0.04em',
                }}>
                CSS Clamp
            </span>
        </div>
    );
};

export default FooterText;
