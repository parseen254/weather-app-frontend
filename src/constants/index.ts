export const DEFAULT_CITY = {
  name: "Nairobi",
  country: "KE",
  lat: -1.28333,
  lon: 36.816669
};

export const UNITS = {
  METRIC: 'metric',
  IMPERIAL: 'imperial',
} as const;

export type UnitSystem = typeof UNITS[keyof typeof UNITS];

export const UNIT_SYMBOLS = {
  [UNITS.METRIC]: {
    temp: '°C',
    speed: 'km/h',
    distance: 'km',
  },
  [UNITS.IMPERIAL]: {
    temp: '°F',
    speed: 'mph',
    distance: 'mi',
  },
} as const;
