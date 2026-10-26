'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';
import { ArrowUpRightIcon, XIcon } from 'lucide-react';
import Link from 'next/link';

import cn from '~/utils/cn';

import { sponsors, withUtm } from '~/lib/sponsors';

const INTERVAL = 6000;
const STORAGE_KEY = 'sponsors-dismissed';

const subscribe = () => () => {};
// Read on the client only, so the card never renders on the server and flashes away for people who closed it.
const getDismissed = () => sessionStorage.getItem(STORAGE_KEY) === '1';
const getServerDismissed = () => true;

const prefersReducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

const FloatingSponsor = () => {
    const storedDismissed = useSyncExternalStore(subscribe, getDismissed, getServerDismissed);
    const [dismissed, setDismissed] = useState(false);
    const [index, setIndex] = useState(0);
    const [paused, setPaused] = useState(false);
    const [footerVisible, setFooterVisible] = useState(false);

    // The footer lists every sponsor already, so step aside once it scrolls into view.
    useEffect(() => {
        const footer = document.getElementById('footer');
        if (!footer) return;

        const observer = new IntersectionObserver(([entry]) => {
            setFooterVisible(entry.isIntersecting);
        });
        observer.observe(footer);

        return () => {
            observer.disconnect();
        };
    }, []);

    useEffect(() => {
        if (paused || prefersReducedMotion()) return;

        const timer = setInterval(() => {
            setIndex(current => (current + 1) % sponsors.length);
        }, INTERVAL);

        return () => {
            clearInterval(timer);
        };
    }, [paused]);

    if (storedDismissed || dismissed) return null;

    const sponsor = sponsors[index];

    return (
        <aside
            aria-label="Sponsors"
            onMouseEnter={() => {
                setPaused(true);
            }}
            onMouseLeave={() => {
                setPaused(false);
            }}
            onFocus={() => {
                setPaused(true);
            }}
            onBlur={() => {
                setPaused(false);
            }}
            className={cn(
                'fixed right-[calc(clamp(1rem,_0.25rem_+_3.125vw,_4rem)+0.75rem)] bottom-7 z-40 w-80 animate-in rounded-xl border border-line bg-white/90 p-1.5 shadow-[0_12px_32px_-12px_rgb(0_0_0/0.18)] backdrop-blur transition-[opacity,translate] duration-300 fade-in slide-in-from-bottom-2 max-lg:hidden',
                footerVisible && 'pointer-events-none translate-y-2 opacity-0',
            )}>
            <div className="flex items-center justify-between gap-2 px-1.5 pt-0.5 pb-1.5">
                <p className="text-xs text-neutral-500">Sponsored by</p>
                <div className="flex items-center gap-1">
                    {sponsors.map((item, itemIndex) => (
                        <button
                            key={item.name}
                            type="button"
                            aria-label={`Show ${item.name}`}
                            aria-current={itemIndex === index}
                            onClick={() => {
                                setIndex(itemIndex);
                            }}
                            className="flex size-4 items-center justify-center">
                            <span
                                className={cn(
                                    'size-1.5 rounded-full transition-colors',
                                    itemIndex === index ? 'bg-neutral-950' : 'bg-neutral-200',
                                )}
                            />
                        </button>
                    ))}
                    <button
                        type="button"
                        aria-label="Hide sponsors"
                        onClick={() => {
                            sessionStorage.setItem(STORAGE_KEY, '1');
                            setDismissed(true);
                        }}
                        className="ml-1 flex size-5 items-center justify-center rounded-md text-neutral-400 transition-colors hover:bg-canvas hover:text-neutral-950">
                        <XIcon size={12} />
                    </button>
                </div>
            </div>
            <Link
                key={sponsor.name}
                href={withUtm(sponsor.href, 'floating')}
                target="_blank"
                rel="noreferrer"
                className="group flex animate-in items-center gap-3 rounded-lg p-1.5 transition-colors duration-500 fade-in hover:bg-canvas">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-canvas text-neutral-950 ring-1 ring-line">
                    {sponsor.logo}
                </span>
                <span className="flex min-w-0 flex-col">
                    <span className="flex items-center gap-1 text-sm font-medium text-neutral-950">
                        {sponsor.name}
                        <ArrowUpRightIcon
                            size={14}
                            className="text-neutral-400 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-neutral-950"
                        />
                    </span>
                    <span className="text-xs leading-snug text-neutral-500">{sponsor.tagline}</span>
                </span>
            </Link>
        </aside>
    );
};

export default FloatingSponsor;
