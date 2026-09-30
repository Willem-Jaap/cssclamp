import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';

export const alt = 'CSS Clamp – fluid typography and spacing generator';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const OpengraphImage = async () => {
    const logo = await readFile(join(process.cwd(), 'public/assets/images/cssclamp-logo.png'));
    const logoSrc = `data:image/png;base64,${logo.toString('base64')}`;

    return new ImageResponse(
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                width: '100%',
                height: '100%',
                padding: 72,
                background: '#080809',
                color: '#f1f3f5',
                fontFamily: 'sans-serif',
            }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 32 }}>
                {/* eslint-disable-next-line @next/next/no-img-element -- rendered by next/og, not the browser */}
                <img
                    src={logoSrc}
                    width={44}
                    height={44}
                    alt=""
                    style={{ borderRadius: 10, border: '1px solid #41484f' }}
                />
                CSS Clamp
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                <div style={{ fontSize: 76, fontWeight: 600, letterSpacing: -2, lineHeight: 1.05 }}>
                    Fluid typography and spacing, without media queries
                </div>
                <div
                    style={{
                        display: 'flex',
                        alignSelf: 'flex-start',
                        padding: '14px 22px',
                        borderRadius: 12,
                        background: '#16181b',
                        color: '#f44cac',
                        fontSize: 30,
                        fontFamily: 'monospace',
                    }}>
                    clamp(1rem, -0.75rem + 7.292vw, 8rem)
                </div>
            </div>
        </div>,
        size,
    );
};

export default OpengraphImage;
