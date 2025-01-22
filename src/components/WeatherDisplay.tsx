import { WeatherData } from '@/types';
import { useMemo } from 'react';

interface WeatherDisplayProps {
  data: WeatherData;
}

export default function WeatherDisplay({ data }: WeatherDisplayProps) {
  const currentTemp = useMemo(() => Math.round(data.current.temp - 273.15), [data]);
  const currentFeelsLike = useMemo(() => Math.round(data.current.feels_like - 273.15), [data]);

  return (
    <div className="space-y-4">
      <div className="text-sm text-gray-500">
        Timezone: {data.timezone} (UTC{data.timezone_offset >= 0 ? '+' : ''}{data.timezone_offset / 3600})
      </div>
      <div className="p-4 bg-white rounded-lg shadow">
        <h2 className="text-xl font-bold mb-2">Current Weather</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-4xl font-bold">{currentTemp}°C</p>
            <p className="text-gray-600">Feels like {currentFeelsLike}°C</p>
          </div>
          <div>
            <p className="capitalize">{data.current.weather[0].description}</p>
            <p>Humidity: {data.current.humidity}%</p>
            <p>Wind: {Math.round(data.current.wind_speed * 3.6)} km/h</p>
          </div>
        </div>
      </div>

      <div className="p-4 bg-white rounded-lg shadow">
        <h2 className="text-xl font-bold mb-2">8 Day Forecast</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {data.daily.map((day) => (
            <div key={day.dt} className="p-2 border rounded">
              <p className="font-bold">
                {new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' })}
              </p>
              <p>{Math.round(day.temp.max - 273.15)}°C / {Math.round(day.temp.min - 273.15)}°C</p>
              <p className="capitalize">{day.weather[0].description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
