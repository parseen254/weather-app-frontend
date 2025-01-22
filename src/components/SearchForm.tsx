import React, { useEffect, useState } from 'react';
import type { SearchResponse } from '@/types';

interface SearchFormProps {
  onSearch: (query: string) => void;
  onCitySelect: (lat: number, lon: number) => void;
  results: SearchResponse | null;
  loading: boolean;
}

export function SearchForm({ onSearch, onCitySelect, results, loading }: SearchFormProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (searchTerm.length >= 3) {
      onSearch(searchTerm);
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  }, [searchTerm, onSearch]);

  const handleCitySelect = (lat: number, lon: number) => {
    onCitySelect(lat, lon);
    setShowDropdown(false);
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="join w-full">
        <input
          type="text"
          placeholder="Search for a city..."
          className="input join-item w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button 
          className="btn join-item btn-primary"
          disabled={loading || !searchTerm}
          onClick={() => results?.data[0] && handleCitySelect(results.data[0].city.lat, results.data[0].city.lon)}
        ></button>
          {loading ? "Searching..." : "Go"}
        </button>
      </div>

      {showDropdown && results && results.data.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-base-100 border rounded-lg shadow-lg">
          {results.data.map((result) => (
            <button
              key={`${result.city.lat}-${result.city.lon}`}
              className="block w-full px-4 py-2 text-left hover:bg-base-200"
              onClick={() => handleCitySelect(result.city.lat, result.city.lon)}
            ></button>
              {result.city.name}, {result.city.country}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
