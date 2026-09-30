import { createEyes } from 'eyes-next';

import type { Mode, Output, Property } from '~/hooks/useSettings';

export type Events = {
    'Clamp Copied': { output: Output; mode: Mode; property: Property | 'none' };
    'Type Scale Copied': { output: 'css' | 'tailwind'; steps: number };
    'Agent Skill Copied': undefined;
};

export const { useEyes, track } = createEyes<Events>();
