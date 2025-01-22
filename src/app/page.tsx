'use client';

import Aside from "@/components/Aside";
import Main from "@/components/Main";
import { useCitySearch } from '@/hooks/useCitySearch';
import { useEffect } from 'react';
import { useWeather } from '@/hooks/useWeather';

export default function Home() {
  const { searchCities, results } = useCitySearch();
  const { weatherData, loading: weatherLoading, fetchWeather } = useWeather();

  useEffect(() => {
    // Search for Nairobi when component mounts
    searchCities('Nairobi');
  }, [searchCities]);

  useEffect(() => {
    // When we get results for Nairobi, fetch its weather
    if (results?.data[0]?.city) {
      const { lat, lon } = results.data[0].city;
      fetchWeather(lat, lon);
    }
  }, [fetchWeather, results]);

  return (
    <div className="grid grid-rows-[auto_1fr_auto] md:grid-cols-4 md:grid-rows-none items-center min-h-screen p-4 gap-4 md:p-8 md:gap-8 font-[family-name:var(--font-geist-sans)] bg-blue-500">
      <div className="w-full h-full md:col-span-1">
        <Aside weatherData={weatherData} loading={weatherLoading} />
      </div>
      <div className="w-full h-full md:col-span-3">
        <Main weatherData={weatherData} loading={weatherLoading} />
      </div>
    </div>
  );
}
