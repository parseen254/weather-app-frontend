import React, { ChangeEvent, useState } from 'react';

import type { SearchResponse } from "@/types";

interface SearchFormProps {
  onSearch: (query: string) => void;
  onCitySelect: (lat: number, lon: number, cityName: string, countryCode: string) => void;
  results: SearchResponse | null;
  loading: boolean;
}

export default function SearchForm({ onSearch, onCitySelect, results, loading }: SearchFormProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    if (value.length >= 3) {
      onSearch(value);
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  };

  const handleCitySelect = (lat: number, lon: number, cityName: string, countryCode: string) => {
    onCitySelect(lat, lon, cityName, countryCode);
    setShowDropdown(false);
    setSearchTerm("");
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="join w-full">
        <input
          type="text"
          placeholder="Search for a city..."
          className="input join-item w-full"
          value={searchTerm}
          onChange={handleInputChange}
        />
        <button
          className="btn join-item btn-primary"
          disabled={loading || !searchTerm}
          onClick={() =>
            results?.data[0] &&
            handleCitySelect(
              results.data[0].city.lat,
              results.data[0].city.lon,
              results.data[0].city.name,
              results.data[0].city.country
            )
          }
        >
          {loading ? "Searching..." : "Go"}
        </button>
      </div>

      {showDropdown && results && results.data.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-base-100 border rounded-lg shadow-lg">
          {results.data.map((result) => (
            <button
              key={`${result.city.lat}-${result.city.lon}`}
              className="block w-full px-4 py-2 text-left hover:bg-base-200"
              onClick={() => handleCitySelect(
                result.city.lat,
                result.city.lon,
                result.city.name,
                result.city.country
              )}
            >
              {result.city.name}, {result.city.country}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
