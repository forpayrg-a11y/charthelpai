/**
 * Formats raw numeric data into a format suitable for Recharts.
 * @param {string[]} labels Array of labels (e.g., months, dates).
 * @param {number[]} values Array of values corresponding to the labels.
 * @returns {Array<{name: string, value: number}>}
 */
export const formatForSimpleChart = (labels: string[], values: number[]) => {
    return labels.map((label, index) => ({
        name: label,
        value: values[index] || 0,
    }));
};

/**
 * Formats time-series price data.
 * @param {Array<{ timestamp: number | string, price: number }>} data
 * @returns {Array<{ time: string, price: number }>}
 */
export const formatPriceData = (data: { timestamp: number | string; price: number }[]) => {
    return data.map((item) => ({
        time: typeof item.timestamp === 'number'
            ? new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            : item.timestamp,
        price: item.price,
    }));
};
