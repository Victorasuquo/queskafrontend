import { useState, useEffect } from 'react';

/**
 * Hook to simulate loading state for demo purposes
 * In production, this would be replaced by actual API loading states
 */
export function useLoadingState(initialLoading = true, delay = 1500) {
    const [isLoading, setIsLoading] = useState(initialLoading);

    useEffect(() => {
        if (initialLoading) {
            const timer = setTimeout(() => {
                setIsLoading(false);
            }, delay);
            return () => clearTimeout(timer);
        }
    }, [initialLoading, delay]);

    return { isLoading, setIsLoading };
}

/**
 * Hook to manage pagination with loading
 */
export function usePaginatedLoading<T>(
    items: T[],
    itemsPerPage: number,
    initialPage = 1
) {
    const [currentPage, setCurrentPage] = useState(initialPage);
    const [isPageLoading, setIsPageLoading] = useState(false);

    const totalPages = Math.ceil(items.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedItems = items.slice(startIndex, startIndex + itemsPerPage);

    const goToPage = (page: number) => {
        if (page < 1 || page > totalPages) return;
        setIsPageLoading(true);
        setCurrentPage(page);
        // Simulate page load delay
        setTimeout(() => setIsPageLoading(false), 300);
    };

    const nextPage = () => goToPage(currentPage + 1);
    const prevPage = () => goToPage(currentPage - 1);

    return {
        currentPage,
        totalPages,
        paginatedItems,
        isPageLoading,
        goToPage,
        nextPage,
        prevPage,
        hasNextPage: currentPage < totalPages,
        hasPrevPage: currentPage > 1,
    };
}

/**
 * Hook for managing search with debounce and loading
 */
export function useSearchWithLoading<T>(
    items: T[],
    searchFn: (item: T, query: string) => boolean,
    debounceMs = 300
) {
    const [query, setQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [results, setResults] = useState<T[]>(items);

    useEffect(() => {
        if (!query.trim()) {
            setResults(items);
            setIsSearching(false);
            return;
        }

        setIsSearching(true);
        const timer = setTimeout(() => {
            const filtered = items.filter(item => searchFn(item, query));
            setResults(filtered);
            setIsSearching(false);
        }, debounceMs);

        return () => clearTimeout(timer);
    }, [query, items, searchFn, debounceMs]);

    return {
        query,
        setQuery,
        isSearching,
        results,
    };
}

/**
 * Hook for infinite scroll loading
 */
export function useInfiniteScroll<T>(
    items: T[],
    itemsPerLoad: number = 12
) {
    const [displayedItems, setDisplayedItems] = useState<T[]>(items.slice(0, itemsPerLoad));
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [hasMore, setHasMore] = useState(items.length > itemsPerLoad);

    const loadMore = () => {
        if (isLoadingMore || !hasMore) return;

        setIsLoadingMore(true);
        setTimeout(() => {
            const currentCount = displayedItems.length;
            const nextItems = items.slice(0, currentCount + itemsPerLoad);
            setDisplayedItems(nextItems);
            setHasMore(nextItems.length < items.length);
            setIsLoadingMore(false);
        }, 500);
    };

    const reset = () => {
        setDisplayedItems(items.slice(0, itemsPerLoad));
        setHasMore(items.length > itemsPerLoad);
    };

    return {
        displayedItems,
        isLoadingMore,
        hasMore,
        loadMore,
        reset,
    };
}

/**
 * Hook for managing filter loading states
 */
export function useFilterLoading() {
    const [isFiltering, setIsFiltering] = useState(false);

    const applyFilter = async (callback: () => void) => {
        setIsFiltering(true);
        // Simulate filter processing
        await new Promise(resolve => setTimeout(resolve, 200));
        callback();
        setIsFiltering(false);
    };

    return { isFiltering, applyFilter };
}
