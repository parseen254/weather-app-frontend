import React from "react";
import type { WeatherData } from "@/types";

interface AsideProps {
  weatherData: WeatherData | null;

  loading: boolean;
  selectedCity: { name: string; country: string } | null;
}

function Aside({ weatherData, loading }: AsideProps) {
  return (
    <div className="bg-green-500 h-full">
      Aside
      {JSON.stringify({ weatherData, loading })}
    </div>
  );
}

export default Aside;
