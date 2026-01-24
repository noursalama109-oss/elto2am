export type Brand = 'dayon' | 'hogan' | 'cmg' | 'halawa' | 'other';

export type ProductSection = 
  | 'towing' // آلات الجر
  | 'shocks' // المساعدين
  | 'filters' // الفلاتر
  | 'electrical' // الكهرباء
  | 'wheels' // الجنوط
  | 'lights' // الإضاءة
  | 'covers' // الأغطية والوش
  | 'horns' // الكلاكسات
  | 'other'; // أخرى

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: 'accessories' | 'essentials';
  vehicleType: 'motorcycle' | 'tricycle' | 'both';
  brand: Brand;
  section: ProductSection;
  
  description?: string;
  inStock: boolean;
}

export type CategoryFilter = 'all' | 'accessories' | 'essentials';
export type VehicleFilter = 'all' | 'motorcycle' | 'tricycle';
export type BrandFilter = 'all' | Brand;

export const sectionLabels: Record<ProductSection, string> = {
  towing: 'آلات الجر',
  shocks: 'المساعدين',
  filters: 'الفلاتر',
  electrical: 'الكهرباء',
  wheels: 'الجنوط',
  lights: 'الإضاءة',
  covers: 'الأغطية والوش',
  horns: 'الكلاكسات',
  other: 'أخرى',
};
