import { 
  Cog, 
  Zap, 
  Car, 
  Disc, 
  Link2, 
  Fuel, 
  Layers, 
  Circle, 
  Droplets, 
  Sparkles,
  LucideIcon
} from 'lucide-react';

export type Brand = 'dayon' | 'hogan' | 'cmg' | 'halawa' | 'bajaj' | 'other';

// الأقسام الرئيسية
export type ProductSection = 
  | 'engine'        // قسم المحرك
  | 'electrical'    // قسم الكهرباء والإضاءة
  | 'suspension'    // قسم العفشة
  | 'brakes'        // قسم الفرامل
  | 'drivetrain'    // قسم الجر والسرعة
  | 'fuel'          // قسم الكاربيراتير والوقود
  | 'body'          // قسم الهيكل الخارجي والفيبر
  | 'wheels'        // قسم الإطارات والجنوط
  | 'oils'          // قسم الزيوت والشحوم
  | 'accessories';  // قسم الكماليات والإكسسوارات

// الأقسام الفرعية
export type ProductSubSection = 
  // المحرك
  | 'cylinder'          // مجموعة السلندر
  | 'internal_motion'   // منظومة الحركة الداخلية
  | 'valves'            // الصبابات والتاكيهات
  | 'clutch'            // الديسك والدبرياج
  // الكهرباء
  | 'batteries'         // البطاريات
  | 'ignition'          // منظومة الحريق
  | 'lighting'          // الإضاءة
  | 'starter'           // المارش والكهرباء
  //  العفشة
  | 'shocks'            // المساعدين
  | 'steering'          // التوجيه
  | 'swingarm'          // المقصات
  // الفرامل
  | 'brake_pads'        // تيل الفرامل
  | 'master_cylinder'   // خزنة وماستر
  | 'brake_drums'       // الطنابير
  // الجر
  | 'chain_kit'         // طقم الجر
  | 'speedometer'       // العدادات
  // الوقود
  | 'carburetor'        // الكاربيراتير
  | 'fuel_tank'         // خزان البنزين
  | 'filters'           // الفلاتر
  // الهيكل
  | 'fairings'          // أطقم الفيبر
  | 'seats'             // المقاعد
  | 'mirrors'           // المرايات
  // العجلات
  | 'tires'             // الكاوتش
  | 'rims'              // الجنوط
  // الزيوت
  | 'engine_oil'        // زيوت المحرك
  | 'cleaners'          // المنظفات
  // الكماليات
  | 'gear'              // تجهيزات
  | 'mods'              // تعديلات
  | 'other';            // أخرى

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: 'accessories' | 'essentials';
  brand: Brand;
  section: ProductSection;
  subSection?: ProductSubSection;
  description?: string;
  inStock: boolean;
}

export type CategoryFilter = 'all' | 'accessories' | 'essentials';
export type VehicleFilter = 'all' | 'motorcycle' | 'tricycle';
export type BrandFilter = 'all' | Brand;

// تسميات الأقسام الرئيسية
export const sectionLabels: Record<ProductSection, string> = {
  engine: 'قسم المحرك',
  electrical: 'قسم الكهرباء والإضاءة',
  suspension: 'قسم العفشة',
  brakes: 'قسم الفرامل',
  drivetrain: 'قسم الجر والسرعة',
  fuel: 'قسم الكاربيراتير والوقود',
  body: 'قسم الهيكل الخارجي والفيبر',
  wheels: 'قسم الإطارات والجنوط',
  oils: 'قسم الزيوت والشحوم',
  accessories: 'قسم الكماليات والإكسسوارات',
};

// أيقونات الأقسام الرئيسية
export const sectionIcons: Record<ProductSection, LucideIcon> = {
  engine: Cog,
  electrical: Zap,
  suspension: Car,
  brakes: Disc,
  drivetrain: Link2,
  fuel: Fuel,
  body: Layers,
  wheels: Circle,
  oils: Droplets,
  accessories: Sparkles,
};

// تسميات الأقسام الفرعية
export const subSectionLabels: Record<ProductSubSection, string> = {
  // قسم المحرك
  cylinder: 'مجموعة السلندر',
  internal_motion: 'منظومة الحركة الداخلية',
  valves: 'الصبابات والتاكيهات',
  clutch: 'الديسك والدبرياج',
  //قسم الكهرباء
  batteries: 'البطاريات',
  ignition: 'منظومة الحريق',
  lighting: 'الإضاءة',
  starter: 'المارش والكهرباء',
  //قسم العفشة
  shocks: 'المساعدين',
  steering: 'التوجيه',
  swingarm: 'المقصات',
  //قسم الفرامل
  brake_pads: 'تيل الفرامل',
  master_cylinder: 'خزنة وماستر',
  brake_drums: 'الطنابير',
  //قسم الجر
  chain_kit: 'الات الجر',
  speedometer: 'العدادات',
  //قسم الوقود
  carburetor: 'الكاربيراتير',
  fuel_tank: 'خزان البنزين',
  filters: 'الفلاتر',
  //قسم الهيكل
  fairings: 'أطقم الفيبر',
  seats: 'المقاعد',
  mirrors: 'المرايات',
  //قسم العجلات
  tires: 'الكاوتش',
  rims: 'الجنوط',
  //قسم الزيوت
  engine_oil: 'زيوت المحرك',
  cleaners: 'المنظفات',
  //قسم الكماليات
  gear: 'تجهيزات',
  mods: 'تعديلات',
  other: 'أخرى',
};

// ربط الأقسام الفرعية بالأقسام الرئيسية
export const sectionSubSections: Record<ProductSection, ProductSubSection[]> = {
  engine: ['cylinder', 'internal_motion', 'valves', 'clutch'],
  electrical: ['batteries', 'lighting', 'starter'],
  suspension: ['shocks', 'steering', 'swingarm'],
  brakes: ['brake_pads', 'master_cylinder', 'brake_drums'],
  drivetrain: ['chain_kit', 'speedometer'],
  fuel: ['carburetor', 'fuel_tank', 'filters'],
  body: ['fairings', 'seats', 'mirrors'],
  wheels: ['tires', 'rims'],
  oils: ['engine_oil', 'cleaners'],
  accessories: ['gear', 'mods', 'other'],
};

// تسميات الماركات
export const brandLabels: Record<Brand, string> = {
  dayon: 'دايون',
  hogan: 'هوجان',
  cmg: 'CMG',
  halawa: 'حلاوة',
  bajaj: 'باجاج',
  other: 'أخرى',
};
