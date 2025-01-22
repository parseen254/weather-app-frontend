interface StoredCity {
  name: string;
  country: string;
  lat: number;
  lon: number;
}

const STORED_CITY_KEY = 'weatherapp_selected_city';

export const getStoredCity = (): StoredCity | null => {
  if (typeof window === 'undefined') return null;
  const stored = sessionStorage.getItem(STORED_CITY_KEY);
  return stored ? JSON.parse(stored) : null;
};

export const storeCity = (city: StoredCity): void => {
  if (typeof window === 'undefined') return;
  sessionStorage.setItem(STORED_CITY_KEY, JSON.stringify(city));
};
