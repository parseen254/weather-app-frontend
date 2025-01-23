'use client';

import { DEFAULT_CITY, UnitSystem } from "@/constants";
import { getStoredCity, storeCity } from "@/utils/storage";

import Aside from "@/components/Aside";
import Main from "@/components/Main";
import { useCitySearch } from "@/hooks/useCitySearch";
import { useEffect } from "react";
import { useState } from "react";
import { useWeather } from "@/hooks/useWeather";

export default function Home() {
  const { searchCities, loading: searchLoading, results } = useCitySearch();
  const {
    weatherData,
    loading: weatherLoading,
    fetchWeather,
    units,
    setUnits,
  } = useWeather();
  const [selectedCity, setSelectedCity] = useState<{
    name: string;
    country: string;
    lat?: number;
    lon?: number;
  } | null>(null);

  useEffect(() => {
    const storedCity = getStoredCity();
    const cityToUse = storedCity || DEFAULT_CITY;

    setSelectedCity({
      name: cityToUse.name,
      country: cityToUse.country,
      lat: cityToUse.lat,
      lon: cityToUse.lon,
    });

    fetchWeather(cityToUse.lat, cityToUse.lon);
  }, [fetchWeather]);

  const handleCitySelect = (
    lat: number,
    lon: number,
    name: string,
    country: string
  ) => {
    const cityData = { name, country, lat, lon };
    setSelectedCity(cityData);
    storeCity(cityData);
    fetchWeather(lat, lon);
  };

  const handleUnitsChange = (newUnits: UnitSystem) => {
    setUnits(newUnits);
    if (selectedCity?.lat && selectedCity?.lon) {
      fetchWeather(selectedCity.lat, selectedCity.lon);
    }
  };

  return (
    <div className="grid grid-rows-[auto_1fr_auto] md:grid-cols-4 md:grid-rows-none items-center min-h-screen p-0 gap-4 md:p-2 md:gap-8 font-[family-name:var(--font-geist-sans)]">
      <div className="w-full h-full md:col-span-1">
        <Aside
          weatherData={weatherData}
          loading={weatherLoading}
          selectedCity={selectedCity}
          units={units}
        />
      </div>
      <div className="w-full h-full md:col-span-3">
        <Main
          weatherData={weatherData}
          onSearch={searchCities}
          onCitySelect={handleCitySelect}
          results={results}
          loading={searchLoading}
          searchLoading={searchLoading}
          selectedCity={selectedCity}
          units={units}
          onUnitsChange={handleUnitsChange}
        />
      </div>
    </div>
  );
}
