import { UNITS, type UnitSystem } from '@/constants';
import { useCallback, useEffect, useState, useRef } from "react";
import { getStoredUnits, storeUnits } from '@/utils/storage';
import type { WeatherData } from '@/types';

export function useWeather() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [units, setUnits] = useState<UnitSystem>(UNITS.METRIC);
  const lastCoordinates = useRef<{ lat: number; lon: number } | null>(null);

  // Load stored units after mount
  useEffect(() => {
    const storedUnits = getStoredUnits();
    if (storedUnits) {
      setUnits(storedUnits);
    }
  }, []);

  // Store units when they change and reload data if we have coordinates
  useEffect(() => {
    storeUnits(units);
    if (lastCoordinates.current) {
      fetchWeather(lastCoordinates.current.lat, lastCoordinates.current.lon);
    }
  }, [units]);

  const fetchWeather = useCallback(
    async (lat: number, lon: number) => {
      try {
        setLoading(true);
        setError(null);
        lastCoordinates.current = { lat, lon };
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/weather?lat=${lat}&lon=${lon}&units=${units}`
        );

        if (!response.ok) throw new Error("Failed to fetch weather data");

        const data: WeatherData = await response.json();
        setWeatherData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    },
    [units]
  );

  return {
    weatherData,
    loading,
    error,
    fetchWeather,
    units,
    setUnits
  };
}
