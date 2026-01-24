export type Brand = 'dayon' | 'hogan' | 'cmg' | 'halawa' | 'other';

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: 'accessories' | 'essentials';
  vehicleType: 'motorcycle' | 'tricycle' | 'both';
  brand: Brand;
  isBestSeller?: boolean;
  description?: string;
  inStock: boolean;
}

export type CategoryFilter = 'all' | 'accessories' | 'essentials';
export type VehicleFilter = 'all' | 'motorcycle' | 'tricycle';
export type BrandFilter = 'all' | Brand;
