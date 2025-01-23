import { UNITS, type UnitSystem } from "@/constants";

interface StoredCity {
  name: string;
  country: string;
  lat: number;
  lon: number;
}

const STORED_CITY_KEY = "weatherapp_selected_city";
const STORED_UNITS_KEY = "weatherapp_units";

export const getStoredCity = (): StoredCity | null => {
  if (typeof window === "undefined") return null;
  const stored = sessionStorage.getItem(STORED_CITY_KEY);
  return stored ? JSON.parse(stored) : null;
};

export const storeCity = (city: StoredCity): void => {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(STORED_CITY_KEY, JSON.stringify(city));
};

export const getStoredUnits = (): UnitSystem | null => {
  try {
    if (typeof window === "undefined") return null;
    const stored = sessionStorage.getItem(STORED_UNITS_KEY);
    return stored && (stored === UNITS.METRIC || stored === UNITS.IMPERIAL)
      ? stored
      : UNITS.METRIC;
  } catch {
    return UNITS.METRIC;
  }
};

export const storeUnits = (units: UnitSystem): void => {
  try {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(STORED_UNITS_KEY, units);
    }
  } catch (error) {
    console.warn("Failed to store units preference:", error);
  }
};
