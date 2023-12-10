const spacingScale: Record<number, number> = {
    0: 0,
    0.5: 0.125,
    1: 0.25,
    1.5: 0.375,
    2: 0.5,
    2.5: 0.625,
    3: 0.75,
    3.5: 0.875,
    4: 1,
    5: 1.25,
    6: 1.5,
    7: 1.75,
    8: 2,
    9: 2.25,
    10: 2.5,
    11: 2.75,
    12: 3,
    14: 3.5,
    16: 4,
    20: 5,
    24: 6,
    28: 7,
    32: 8,
    36: 9,
    40: 10,
    44: 11,
    48: 12,
    52: 13,
    56: 14,
    60: 15,
    64: 16,
    72: 18,
    80: 20,
    96: 24,
};

const getTailwindValue = (value: number) => {
    if (value in spacingScale) {
        return spacingScale[value];
    }

    const closestValue = Number(
        Object.keys(spacingScale).reduce((prev, curr) => {
            return Math.abs(Number(curr) - value) < Math.abs(Number(prev) - value) ? curr : prev;
        }),
    );

    return spacingScale[closestValue];
};

const getTailwindByValue = (value: number) => {
    return Number(
        Object.keys(spacingScale).find(key => spacingScale[Number(key)] === Number(value)),
    );
};

export { getTailwindValue, getTailwindByValue };
