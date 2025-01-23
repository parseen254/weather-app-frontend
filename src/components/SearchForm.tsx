import React, { ChangeEvent, useState } from 'react';

import type { SearchResponse } from "@/types";

interface SearchFormProps {
  onSearch: (query: string) => void;
  onCitySelect: (
    lat: number,
    lon: number,
    cityName: string,
    countryCode: string
  ) => void;
  results: SearchResponse | null;
  loading: boolean;
}

export default function SearchForm({
  onSearch,
  onCitySelect,
  results,
  loading,
}: SearchFormProps) {
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

  const handleCitySelect = (
    lat: number,
    lon: number,
    cityName: string,
    countryCode: string
  ) => {
    onCitySelect(lat, lon, cityName, countryCode);
    setShowDropdown(false);
    setSearchTerm("");
  };

  return (
    <div className="relative w-full max-w-2xl">
      <div className="join w-full flex items-center gap-0">
        <input
          type="text"
          placeholder="Search for a city..."
          className="join-item w-full rounded-none border-2 p-2"
          value={searchTerm}
          onChange={handleInputChange}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="border-2 border-l-0 p-2 min-h-11 min-w-24"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
      </div>

      {showDropdown && results && results.data.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg ">
          {results.data.map((result) => (
            <button
              key={`${result.city.lat}-${result.city.lon}`}
              className="block w-full px-4 py-2 text-left hover:bg-base-200"
              onClick={() =>
                handleCitySelect(
                  result.city.lat,
                  result.city.lon,
                  result.city.name,
                  result.city.country
                )
              }
            >
              {result.city.name}, {result.city.country}
            </button>
          ))}
        </div>
      )}
      {showDropdown && loading && (
        <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg ">
          <button className="block w-full px-4 py-2 text-left">
            Loading...
          </button>
        </div>
      )}
    </div>
  );
}
