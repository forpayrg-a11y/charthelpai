/**
 * Calculates the average of an array of numbers.
 */
export const calculateAverage = (data: number[]): number => {
    if (data.length === 0) return 0;
    return data.reduce((a, b) => a + b, 0) / data.length;
};

/**
 * Calculates the moving average for a series of data points.
 */
export const calculateMovingAverage = (data: number[], period: number): number[] => {
    const result: number[] = [];
    for (let i = 0; i < data.length; i++) {
        if (i < period - 1) {
            result.push(NaN); // Not enough data for initial points
            continue;
        }
        const slice = data.slice(i - period + 1, i + 1);
        result.push(calculateAverage(slice));
    }
    return result;
};

/**
 * Calculates variance of a data set.
 */
export const calculateVariance = (data: number[]): number => {
    if (data.length === 0) return 0;
    const avg = calculateAverage(data);
    return data.map(x => Math.pow(x - avg, 2)).reduce((a, b) => a + b, 0) / data.length;
};

/**
 * Calculates standard deviation of a data set.
 */
export const calculateStandardDeviation = (data: number[]): number => {
    return Math.sqrt(calculateVariance(data));
};

/**
 * Calculates growth rate between two values.
 */
export const calculateGrowthRate = (current: number, previous: number): number => {
    if (previous === 0) return 0;
    return ((current - previous) / previous) * 100;
};
