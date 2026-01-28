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

export type Brand = 'dayon' | 'hogan' | 'cmg' | 'halawa' | 'boxer' | 'other';

// الأقسام الرئيسية
export type ProductSection = 
  | 'engine'        // قسم المحرك
  | 'electrical'    // قسم الكهرباء والإضاءة
  | 'suspension'    // قسم العفشة والتحكم
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
  | 'engine_products'  // قلب المكنة
  | 'valves'            // الصبابات والتاكيهات
  | 'clutch'            // الديسك والدبرياج
  // الكهرباء
  | 'batteries'         // البطاريات
  | 'burning_kit'       // طقم الحرق
  | 'lighting'          // الإضاءة
  | 'starter'           // المارش والكهرباء
  // العفشة والتحكم
  | 'shocks'            // المساعدين
  | 'control'           // التحكم
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
  | 'fiberglass_sheet_metal_sets'          // أطقم الفيبر والصاج
  | 'motor_covers'      // أغطية الموتور
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
  category: 'essentials';
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
  suspension: 'قسم العفشة والتحكم',
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
  cylinder: 'مجموعة السلندر',
  engine_products: 'قلب المكنة',
  valves: 'الصبابات والتاكيهات',
  clutch: 'الديسك والدبرياج',
  batteries: 'البطاريات',
  burning_kit: 'طقم الحرق',
  lighting: 'الإضاءة',
  starter: 'المارش والكهرباء',
  shocks: 'المساعدين',
  control: 'التحكم',
  swingarm: 'المقصات',
  brake_pads: 'تيل الفرامل',
  master_cylinder: 'خزنة وماستر',
  brake_drums: 'الطنابير',
  chain_kit: 'الات الجر',
  speedometer: 'العدادات',
  carburetor: 'الكاربيراتير',
  fuel_tank: 'خزان البنزين',
  filters: 'الفلاتر',
  fiberglass_sheet_metal_sets: 'أطقم الفيبر والصاج',
  motor_covers: 'اغطية الماتور',
  seats: 'المقاعد',
  mirrors: 'المرايات',
  tires: 'الكاوتش',
  rims: 'الجنوط',
  engine_oil: 'زيوت المحرك',
  cleaners: 'المنظفات',
  gear: 'تجهيزات',
  mods: 'تعديلات',
  other: 'أخرى',
};

// قائمة الأوصاف للأقسام الفرعية
export const subSectionDescriptions: Record<string, string> = {
  'lighting': "فوانيس أمامية وخلفية، إشارات، لمبات LED",
  'cylinder': "بستم، شمبر، بنز، جوانات وش السلندر",
  'engine_products': "كرنك، حدافة، كاتينة، تروس كاتينة",
  'valves': "صبابات سحب وطرد، شواكيش",
  'clutch': "ورق دبرياج، ديسك كامل، سلك دبرياج",
  'batteries': "بمختلف الأمبيرات",
  'burning_kit': "بوجيهات، موبينة حريق، وحدة الـ CDI، بلاطة الشحن",
  'starter': "مارش، ضفيرة كهرباء كاملة، كتاوت",
  'shocks': "مساعدين أمامية، مساعدين خلفية، طقم إصلاح مساعد",
  'control': "رقبة الموتوسيكل، بلي رقبة، جادون",
  'swingarm': "مقص خلفي، جلب مقص",
  'brake_pads': "تيل أمامي، تيل خلفي - عادي وباكم",
  'master_cylinder': "خزنة فرامل علوية وسفلية، خراطيم باكم",
  'brake_drums': "أسطوانات الفرامل الديسك",
  'chain_kit': "ترس أمامي، ترس خلفي، جنزير، آلة جر كاملة",
  'speedometer': "عداد سرعة، عداد بنزين، سلك عداد",
  'carburetor': "كاربيراتير كامل، طقم إصلاح كاربيراتير",
  'fuel_tank': "تنفيس بنزين، حنفية بنزين، خرطوم بنزين",
  'filters': "فلتر هواء، فلتر بنزين",
  'fiberglass_sheet_metal_sets': "فيبر كامل، رفارف أمامية وخلفية، طقم صاج",
  'motor_covers': "وش الزيت، وش الترس، غطاء وش زيت، وطقم طبب الزيت",
  'seats': "شاسيه كرسي، كسوة كرسي",
  'mirrors': "مرايات جانبية بأنواعها",
  'tires': "كاوتش خارجي، شمبر داخلي",
  'rims': "جنوط سبور، جنوط سلك، صرة عجل",
  'engine_oil': "زيوت محرك 4T لزوجة 10W40 و 20W50",
  'cleaners': "شحم حراري للأجزاء المتحركة، اسبري جنزير، منظف كاربيراتير",
  'gear': "خوذ، قفازات، أقفال حماية",
  'mods': "شكمانات تربو، مقابض معدلة، ستيكرات",
  'other': "أخرى"
};

// ربط الأقسام الفرعية بالأقسام الرئيسية 
export const sectionSubSections: Record<ProductSection, ProductSubSection[]> = {
  engine: ['cylinder', 'engine_products', 'valves', 'clutch'],
  electrical: ['batteries', 'lighting', 'starter','burning_kit'],
  suspension: ['shocks', 'control', 'swingarm'],
  brakes: ['brake_pads', 'master_cylinder', 'brake_drums'],
  drivetrain: ['chain_kit', 'speedometer'],
  fuel: ['carburetor', 'fuel_tank', 'filters'],
  body: ['fiberglass_sheet_metal_sets', 'seats', 'mirrors','motor_covers'],
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
  boxer: 'بوكسر',
  other: 'أخرى',
};
