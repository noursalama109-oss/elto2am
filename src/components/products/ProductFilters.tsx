import { Button } from '@/components/ui/button';
import { CategoryFilter, VehicleFilter, BrandFilter } from '@/types/product';

interface ProductFiltersProps {
  categoryFilter: CategoryFilter;
  vehicleFilter: VehicleFilter;
  brandFilter: BrandFilter;
  onCategoryChange: (category: CategoryFilter) => void;
  onVehicleChange: (vehicle: VehicleFilter) => void;
  onBrandChange: (brand: BrandFilter) => void;
}

const ProductFilters = ({
  categoryFilter,
  vehicleFilter,
  brandFilter,
  onCategoryChange,
  onVehicleChange,
  onBrandChange,
}: ProductFiltersProps) => {
  const categories: { value: CategoryFilter; label: string }[] = [
    { value: 'all', label: 'الكل' },
    { value: 'accessories', label: 'اكسسوارات' },
    { value: 'essentials', label: 'كماليات' },
  ];

  const vehicles: { value: VehicleFilter; label: string }[] = [
    { value: 'all', label: 'الكل' },
    { value: 'motorcycle', label: 'موتوسيكل' },
    { value: 'tricycle', label: 'تروسيكل' },
  ];

  const brands: { value: BrandFilter; label: string }[] = [
    { value: 'all', label: 'الكل' },
    { value: 'dayon', label: 'دايون' },
    { value: 'hogan', label: 'هوجان' },
    { value: 'cmg', label: 'CMG' },
    { value: 'halawa', label: 'حلاوة' },
    { value: 'other', label: 'أخرى' },
  ];

  return (
    <div className="bg-card rounded-xl border border-border p-4 md:p-6 mb-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Category Filter */}
          <div className="flex-1">
            <h3 className="font-semibold mb-3 text-sm text-muted-foreground">التصنيف</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <Button
                  key={cat.value}
                  variant={categoryFilter === cat.value ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => onCategoryChange(cat.value)}
                  className={
                    categoryFilter === cat.value
                      ? 'gradient-primary shadow-glow text-white'
                      : ''
                  }
                >
                  {cat.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Vehicle Filter */}
          <div className="flex-1">
            <h3 className="font-semibold mb-3 text-sm text-muted-foreground">نوع المركبة</h3>
            <div className="flex flex-wrap gap-2">
              {vehicles.map((vehicle) => (
                <Button
                  key={vehicle.value}
                  variant={vehicleFilter === vehicle.value ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => onVehicleChange(vehicle.value)}
                  className={
                    vehicleFilter === vehicle.value
                      ? 'gradient-primary shadow-glow text-white'
                      : ''
                  }
                >
                  {vehicle.label}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Brand Filter */}
        <div>
          <h3 className="font-semibold mb-3 text-sm text-muted-foreground">الماركة</h3>
          <div className="flex flex-wrap gap-2">
            {brands.map((brand) => (
              <Button
                key={brand.value}
                variant={brandFilter === brand.value ? 'default' : 'outline'}
                size="sm"
                onClick={() => onBrandChange(brand.value)}
                className={
                  brandFilter === brand.value
                    ? 'gradient-primary shadow-glow text-white'
                    : ''
                }
              >
                {brand.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;