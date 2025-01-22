import React from "react";
import SearchForm from "./SearchForm";
import type { WeatherData } from "@/types";
import { useCitySearch } from "@/hooks/useCitySearch";
import { useWeather } from "@/hooks/useWeather";

interface MainProps {
  weatherData: WeatherData | null;
  loading: boolean;
  selectedCity: { name: string; country: string } | null;
  onCitySelect: (city: { name: string; country: string } | null) => void;
}

function Main({
  weatherData,
  loading: parentLoading,
  selectedCity,
  onCitySelect,
}: MainProps) {
  const { loading: searchLoading, results, searchCities } = useCitySearch();
  const { fetchWeather } = useWeather();

  const handleSearch = (query: string) => {
    searchCities(query);
  };

  const handleCitySelect = (
    lat: number,
    lon: number,
    cityName: string,
    countryCode: string
  ) => {
    onCitySelect({ name: cityName, country: countryCode });
    fetchWeather(lat, lon);
  };

  return (
    <div className="bg-green-500 h-full p-4">
      <SearchForm
        onSearch={handleSearch}
        onCitySelect={handleCitySelect}
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
