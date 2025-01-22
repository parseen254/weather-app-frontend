export interface City {
  id: number;
  name: string;
  country: string;
  lat: number;
  lon: number;
}

export interface NeighborCity extends City {
  distance: number;
}

export interface CitySearchResult {
  city: City;
  neighbors: NeighborCity[];
}

export interface SearchResponse {
  data: CitySearchResult[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface WeatherData {
  // Define your weather response type based on the actual API response
  // This is a basic example
  current: {
    temp: number;
    humidity: number;
    wind_speed: number;
    weather: {
      description: string;
      icon: string;
    }[];
  };
  daily: Array<{
    temp: {
      day: number;
    };
    weather: {
      description: string;
      icon: string;
    }[];
  }>;
}
