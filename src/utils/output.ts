import { type Output, type PreviewMode, type Property } from '~/hooks/useSettings';

type Target = 'font-size' | 'spacing' | Property;

const tailwind: Record<Target, { prefix: string; namespace: string; v3Key: string }> = {
    'font-size': { prefix: 'text', namespace: 'text', v3Key: 'fontSize' },
    'spacing': { prefix: 'p', namespace: 'spacing', v3Key: 'spacing' },
    'gap': { prefix: 'gap', namespace: 'spacing', v3Key: 'spacing' },
    'border-radius': { prefix: 'rounded', namespace: 'radius', v3Key: 'borderRadius' },
    'line-height': { prefix: 'leading', namespace: 'leading', v3Key: 'lineHeight' },
};

const getTarget = (previewMode: PreviewMode, property?: Property): Target =>
    property ?? (previewMode === 'text' ? 'font-size' : 'spacing');

/** Formats a clamp() value as plain CSS, a Tailwind theme token or an arbitrary value class. */
const formatOutput = (clamp: string, output: Output, target: Target) => {
    const { prefix, namespace, v3Key } = tailwind[target];

    switch (output) {
        case 'tailwind-v4':
            return {
                code: `@theme {\n    --${namespace}-fluid: ${clamp};\n}`,
                usage: `${prefix}-fluid`,
            };
        case 'tailwind-v3':
            return {
                code: `theme: {\n    extend: {\n        ${v3Key}: {\n            fluid: '${clamp}',\n        },\n    },\n},`,
                usage: `${prefix}-fluid`,
            };
        case 'tailwind-class':
            // Class names cannot contain spaces; Tailwind adds them back around + and -.
            return { code: `${prefix}-[${clamp.replace(/\s+/g, '')}]`, usage: null };
        default:
            return { code: clamp, usage: null };
    }
};

export type { Target };
export { formatOutput, getTarget };
