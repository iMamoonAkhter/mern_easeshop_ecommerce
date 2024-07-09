
import useSWR from 'swr';

const fetcher = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Failed to fetch products');
    }
    return response.json();
};

export function useProducts() {
    const { data, error } = useSWR('https://fakestoreapi.com/products', fetcher);

    return {
        productss: data,
        isLoading: !error && !data,
        isError: error,
    };
}