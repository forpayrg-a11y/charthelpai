import { useState, useEffect, useCallback } from "react";

/**
 * Custom hook for data fetching.
 * @template T The type of data to be fetched.
 * @param {string} url The URL to fetch from.
 * @param {RequestInit} [options] Fetch options.
 * @returns {{ data: T | null, loading: boolean, error: string | null, refetch: () => void }}
 */
export function useFetch<T>(url: string, options?: RequestInit) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
            }
            const result = await response.json();
            setData(result);
        } catch (err: any) {
            setError(err.message || "An unexpected error occurred");
            setData(null);
        } finally {
            setLoading(false);
        }
    }, [url, options]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, loading, error, refetch: fetchData };
}
