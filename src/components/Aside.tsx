import React from "react";
import type { WeatherData } from "@/types";

interface AsideProps {
  weatherData: WeatherData | null;

  loading: boolean;
  selectedCity: { name: string; country: string } | null;
}

function Aside({}: AsideProps) {
  return <div className="bg-green-500 h-full">Aside</div>;
}

export default Aside;
