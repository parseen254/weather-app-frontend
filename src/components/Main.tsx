import type { SearchResponse, WeatherData } from "@/types";

import React from "react";
import SearchForm from "@/components/SearchForm";

interface MainProps {
  weatherData: WeatherData | null;
  loading: boolean;
  selectedCity: { name: string; country: string } | null;
  onCitySelect: (
    lat: number,
    lon: number,
    cityName: string,
    countryCode: string
  ) => void;
  onSearch: (query: string) => void;
  results: SearchResponse | null;
  searchLoading: boolean;
}

function Main({
  weatherData,
  loading: parentLoading,
  selectedCity,
  onCitySelect,
  onSearch,
  searchLoading,
  results,
}: MainProps) {
  return (
    <div className="bg-green-500 h-full p-4">
      <SearchForm
        onSearch={onSearch}
        onCitySelect={onCitySelect}
        results={results}
        loading={searchLoading}
      />
      {selectedCity && (
        <div className="mt-4 text-white">
          <h2 className="text-xl font-bold">
            {selectedCity.name}, {selectedCity.country}
          </h2>
        </div>
      )}
      {weatherData && !parentLoading && (
        <div className="mt-4 text-white">
          <p>Temperature: {weatherData.current.temp}°C</p>
          <p>Feels like: {weatherData.current.humidity}°C</p>
          <p>Weather: {weatherData.current.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}

export default Main;
