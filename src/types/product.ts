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
  heart_of_machine: 'قلب المكنة',
  valves: 'الصبابات والتاكيهات',
  clutch: 'الديسك والدبرياج',
  //قسم الكهرباء
  batteries: 'البطاريات',
  Burning_kit: 'طقم الحرق',
  lighting: 'الإضاءة',
  starter: 'المارش والكهرباء',
  //  قسم العفشة والتحكم
  shocks: 'المساعدين',
  Control: 'التحكم',
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
  Fiberglass_sheet_metal_sets: 'أطقم الفيبر والصاج',
  Motor_covers: 'اغطية الماتور',
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
// قائمة الأوصاف للأقسام الفرعية
export const subSectionDescriptions: Record<string, string> = {
  'lighting': "فوانيس أمامية وخلفية، إشارات، لمبات LED",
  'cylinder': "بستم، شمبر، بنز، جوانات وش السلندر",
  'heart_of_machine': "كرنك، حدافة، كاتينة، تروس كاتينة",
  'valves': "صبابات سحب وطرد، شواكيش",
  'clutch': "ورق دبرياج، ديسك كامل، سلك دبرياج",
  'batteries': "بمختلف الأمبيرات",
  'Burning_kit': "بوجيهات، موبينة حريق، وحدة الـ CDI، بلاطة الشحن",
  'starter': "مارش، ضفيرة كهرباء كاملة، كتاوت",
  'shocks': "مساعدين أمامية، مساعدين خلفية، طقم إصلاح مساعد",
  'Control': "رقبة الموتوسيكل، بلي رقبة، جادون",
  'swingarm': "مقص خلفي، جلب مقص",
  'brake_pads': "تيل أمامي، تيل خلفي - عادي وباكم",
  'master_cylinder': "خزنة فرامل علوية وسفلية، خراطيم باكم",
  'brake_drums': "أسطوانات الفرامل الديسك",
  'chain_kit': "ترس أمامي، ترس خلفي، جنزير ، الة جر كاملة",
  'speedometer': "عداد سرعة، عداد بنزين، سلك عداد",
  'carburetor': "كاربيراتير كامل، طقم إصلاح كاربيراتير",
  'fuel_tank': "تنفيس بنزين، حنفية بنزين، خرطوم بنزين",
  'filters': "فلتر هواء، فلتر بنزين",
  'Fiberglass_sheet_metal_sets': "فيبر كامل، رفارف أمامية وخلفية،طقم صاج",
  'Motor covers': "وش الزيت، وش الترس، غطاء وش زيت، وطقم طبب الزيت",
  'seats': "شاسيه كرسي، كسوة كرسي",
  'mirrors': "مرايات جانبية بأنواعها",
  'tires': "كاوتش خارجي، شمبر داخلي",
  'rims': "جنوط سبور، جنوط سلك، صرة عجل",
  'engine_oil': "زيوت المحرك بمختلف اللزوجات 20W50 و 10W40 من كبرى الشركات،زيت باكم للفرامل",
  'cleaners': " شحم حراري للأجزاء المتحركة، اسبري جنزير، منظف كاربيراتير",
  'gear': "خوذ، قفازات، أقفال حماية",
  'mods': "شكمانات تربو، مقابض معدلة، ستيكرات",
};
// ربط الأقسام الفرعية بالأقسام الرئيسية
export const sectionSubSections: Record<ProductSection, ProductSubSection[]> = {
  engine: ['cylinder', 'heart_of_machine', 'valves', 'clutch'],
  electrical: ['batteries', 'lighting', 'starter','Burning_kit'],
  suspension: ['shocks', 'Control', 'swingarm'],
  brakes: ['brake_pads', 'master_cylinder', 'brake_drums'],
  drivetrain: ['chain_kit', 'speedometer'],
  fuel: ['carburetor', 'fuel_tank', 'filters'],
  body: ['Fiberglass_sheet_metal_sets', 'seats', 'mirrors','Motor_covers'],
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
