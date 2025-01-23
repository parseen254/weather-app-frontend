import Image from "next/image";
import React from "react";
import { UnitSystem } from "@/constants";
import type { WeatherData } from "@/types";
import { getLocaleDate } from "@/utils";

interface AsideProps {
  weatherData: WeatherData | null;
  loading: boolean;
  selectedCity: { name: string; country: string } | null;
  units: UnitSystem;
}

function Aside({ weatherData, selectedCity, units }: AsideProps) {
  const tempUnit = units === "metric" ? "°C" : "°F";
  return (
    <div className="h-full flex flex-col justify-between items-center">
      <div className="flex flex-col items-center gap-4">
        <Image
          src={`https://openweathermap.org/img/wn/${weatherData?.current.weather[0].icon}@4x.png`}
          alt={weatherData?.current.weather[0].description || "Weather Icon"}
          width={300}
          height={300}
        />
        <div className="p-4 flex items-center flex-col gap-4">
          <h2 className="text-xl font-semibold">
            {weatherData?.current.temp} {tempUnit}
          </h2>
          <h3 className="text-xl font-semibold">
            {weatherData?.current.weather[0].main}
          </h3>
        </div>
      </div>
      <div className="p-4 pb-12 flex flex-col items-center gap-2">
        <h3 className="text-lg font-semibold">
          {weatherData?.current.dt &&
            weatherData?.timezone_offset &&
            (() => {
              const date = getLocaleDate(
                weatherData.current.dt,
                weatherData.timezone_offset
              );
              return (
                <span>
                  {date.day}
                  <sup>{date.suffix}</sup> {date.month} {date.year}
                </span>
              );
            })()}
        </h3>
        <h3 className="text-lg font-semibold">
          {selectedCity?.name}, {selectedCity?.country}
        </h3>
      </div>
    </div>
  );
}

export default Aside;
