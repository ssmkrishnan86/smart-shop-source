export * from '../interfaces';
export * from '../enums';

export type ThemeMode = 'light' | 'dark' | 'system';

export type FilterParams = {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  brand?: string;
  rating?: number;
  search?: string;
  sortBy?: string;
  page?: number;
  limit?: number;
};
