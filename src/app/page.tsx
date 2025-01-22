'use client';

import { getStoredCity, storeCity } from '@/utils/storage';

import { DEFAULT_CITY } from '@/constants';
import SearchForm from '@/components/SearchForm';
import WeatherDisplay from '@/components/WeatherDisplay';
import { useCitySearch } from '@/hooks/useCitySearch';
import { useEffect } from 'react';
import { useState } from 'react';
import { useWeather } from '@/hooks/useWeather';

export default function Home() {
  const { searchCities, loading: searchLoading, results } = useCitySearch();
  const { weatherData, loading: weatherLoading, error, fetchWeather } = useWeather();
  const [selectedCity, setSelectedCity] = useState<{ name: string; country: string; lat?: number; lon?: number } | null>(null);

  useEffect(() => {
    const storedCity = getStoredCity();
    const cityToUse = storedCity || DEFAULT_CITY;
    
    setSelectedCity({
      name: cityToUse.name,
      country: cityToUse.country,
      lat: cityToUse.lat,
      lon: cityToUse.lon
    });
    
    fetchWeather(cityToUse.lat, cityToUse.lon);
  }, [fetchWeather]);

  const handleCitySelect = (lat: number, lon: number, name: string, country: string) => {
    const cityData = { name, country, lat, lon };
    setSelectedCity(cityData);
    storeCity(cityData);
    fetchWeather(lat, lon);
  };

  return (
    <main className="container mx-auto p-4">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-center">Weather App</h1>
        
        <SearchForm
          onSearch={searchCities}
          onCitySelect={handleCitySelect}
          results={results}
          loading={searchLoading}
        />
        
        {weatherLoading && <div>Loading weather data...</div>}
        {error && <div className="text-red-500">{error}</div>}
        
        {selectedCity && (
          <h2 className="text-2xl font-semibold">
            Weather for {selectedCity.name}, {selectedCity.country}
          </h2>
        )}
        
        {weatherData && <WeatherDisplay data={weatherData} />}
      </div>
    </main>
  );
}
