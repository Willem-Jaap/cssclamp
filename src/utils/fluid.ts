const ROOT_FONT_SIZE = 16;

const round = (value: number) => parseFloat(value.toFixed(3));

interface FluidRange {
    minSize: number;
    maxSize: number;
    minViewport: number;
    maxViewport: number;
}

/**
 * Builds a clamp() that grows linearly from minSize at minViewport to maxSize
 * at maxViewport. All inputs are in px, the output is in rem.
 */
const toClamp = (
    { minSize, maxSize, minViewport, maxViewport }: FluidRange,
    unit: 'vw' | 'cqi' = 'vw',
) => {
    const slope = (maxSize - minSize) / (maxViewport - minViewport);
    const intercept = (minSize - slope * minViewport) / ROOT_FONT_SIZE;

    return `clamp(${round(minSize / ROOT_FONT_SIZE)}rem, ${round(intercept)}rem + ${round(slope * 100)}${unit}, ${round(maxSize / ROOT_FONT_SIZE)}rem)`;
};

/** Resolves the same line in px for a given viewport width. */
const resolveFluid = (
    { minSize, maxSize, minViewport, maxViewport }: FluidRange,
    width: number,
) => {
    const slope = (maxSize - minSize) / (maxViewport - minViewport);
    const value = minSize + slope * (width - minViewport);

    return Math.min(Math.max(value, minSize), maxSize);
};

export type { FluidRange };
export { toClamp, resolveFluid };
