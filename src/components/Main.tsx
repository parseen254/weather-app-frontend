import React from "react";
import type { WeatherData } from "@/types";

interface MainProps {
  weatherData: WeatherData | null;

  loading: boolean;
}

function Main({ weatherData, loading }: MainProps) {
  return (
    <div className="bg-green-500 h-full">
      Aside
      {JSON.stringify({ weatherData, loading })}
    </div>
  );
}

export default Main;
