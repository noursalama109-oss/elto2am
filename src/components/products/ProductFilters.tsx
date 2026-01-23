import { Button } from '@/components/ui/button';
import { CategoryFilter, VehicleFilter } from '@/types/product';

interface ProductFiltersProps {
  categoryFilter: CategoryFilter;
  vehicleFilter: VehicleFilter;
  onCategoryChange: (category: CategoryFilter) => void;
  onVehicleChange: (vehicle: VehicleFilter) => void;
}

const ProductFilters = ({
  categoryFilter,
  vehicleFilter,
  onCategoryChange,
  onVehicleChange,
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

  return (
    <div className="bg-card rounded-xl border border-border p-4 md:p-6 mb-8">
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
                    ? 'gradient-primary shadow-glow'
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
                    ? 'gradient-primary shadow-glow'
                    : ''
                }
              >
                {vehicle.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;
