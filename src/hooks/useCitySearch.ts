import { useEffect, useState } from 'react';

import type { SearchResponse } from '@/types';
import { useDebounce } from './useDebounce';

export function useCitySearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<SearchResponse | null>(null);
  
  const debouncedSearch = useDebounce(searchQuery);

  useEffect(() => {
    searchCities(debouncedSearch);
  }, [debouncedSearch]);

  const searchCities = async (query: string) => {
    if (!query.trim()) {
      setResults(null);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        `${process.env.NEXT_BACKEND_API_URL}/api/cities/search?query=${encodeURIComponent(query)}`
      );
      
      if (!response.ok) throw new Error('Failed to fetch cities');
      
      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return {
    searchQuery,
    setSearchQuery,
    loading,
    error,
    results,
    searchCities
  };
}
