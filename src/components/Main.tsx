import type { SearchResponse, WeatherData } from "@/types";

import Image from "next/image";
import React from "react";
import SearchForm from "@/components/SearchForm";
import { UnitSystem } from "@/constants";
import UnitToggle from "@/components/UnitToggle";
import { getLocaleDate } from "@/utils";

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
  units: UnitSystem;
  onUnitsChange: (units: UnitSystem) => void;
}

function Main({
  weatherData,
  loading: parentLoading,
  onCitySelect,
  onSearch,
  searchLoading,
  results,
  units,
  onUnitsChange,
}: MainProps) {
  return (
    <div className="h-full p-6 px-12">
      <div className="flex items-center justify-between gap-4">
        <SearchForm
          onSearch={onSearch}
          onCitySelect={onCitySelect}
          results={results}
          loading={searchLoading}
        />
        <UnitToggle value={units} onChange={onUnitsChange} />
      </div>

      {weatherData && !parentLoading && (
        <div className="flex flex-col items-between gap-24 w-full h-full">
          <ThreeDayForecast weatherData={weatherData} units={units} />
          <OtherDetails weatherData={weatherData} units={units} />
        </div>
      )}
    </div>
  );
}

function ThreeDayForecast({
  weatherData,
  units,
}: {
  weatherData: WeatherData;
  units: UnitSystem;
}) {
  const tempUnit = units === "metric" ? "°C" : "°F";
  return (
    <div className="mt-16">
      <div className="grid grid-cols-3 gap-4">
        {weatherData.daily.slice(1, 4).map((day) => (
          <div
            key={day.dt}
            className="p-2 py-8 border rounded flex flex-col items-center gap-2"
          >
            <p className="font-bold">
              {(() => {
                const date = getLocaleDate(day.dt, weatherData.timezone_offset);
                return (
                  <span>
                    {date.weekday} {date.day}
                    <sup>{date.suffix}</sup> {date.month}
                  </span>
                );
              })()}
            </p>
            <Image
              src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@4x.png`}
              alt={day.weather[0].description || "Weather Icon"}
              width={200}
              height={200}
              priority={false}
              placeholder="empty"
            />
            <p>
              {Math.round(day.temp.max)} {tempUnit} - {Math.round(day.temp.min)}
              {tempUnit}
            </p>
            <p className="capitalize">{day.weather[0].description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function OtherDetails({
  weatherData,
  units,
}: {
  weatherData: WeatherData;
  units: UnitSystem;
}) {
  const speedUnit = units === "metric" ? "KM/H" : "MPH";
  return (
    <div className="mt-4 flex h-ful gap-4 w-full justify-between">
      <div className="p-2 py-8 border rounded gap-16 flex flex-col items-center flex-1">
        <p className="font-medium">Wind Status</p>
        <h1 className="text-4xl font-semibold">
          {weatherData.current.wind_speed} {speedUnit}
        </h1>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12.8 19.6A2 2 0 1 0 14 16H2" />
          <path d="M17.5 8a2.5 2.5 0 1 1 2 4H2" />
          <path d="M9.8 4.4A2 2 0 1 1 11 8H2" />
        </svg>
      </div>
      <div className="p-2 py-8 border rounded flex flex-col items-center flex-1 gap-16">
        <p className="font-medium">Humidity</p>
        <h1 className="text-4xl font-semibold">
          {weatherData.current.humidity} %
        </h1>
        <progress
          className="progress progress-flat-secondary progress-xl"
          value={weatherData.current.humidity}
          max="100"
        ></progress>
      </div>
    </div>
  );
}
export default Main;
