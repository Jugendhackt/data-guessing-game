export const formatNumber = (value: number): string => {
    if (value > 1_000_000_000) {
        return `${(value / 1_000_000_000).toFixed(0)}G`;
    } else if (value > 1_000_000) {
        return `${(value / 1_000_000).toFixed(0)}M`;
    } else if (value > 1_000) {
        return `${(value / 1_000).toFixed(0)}k`;
    } else {
        return value.toFixed(1);
    }
};
