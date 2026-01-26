import { Button } from '@/components/ui/button';
import { CategoryFilter, VehicleFilter, BrandFilter, brandLabels } from '@/types/product';

interface ProductFiltersProps {
  categoryFilter: CategoryFilter;
  brandFilter: BrandFilter;
  onCategoryChange: (category: CategoryFilter) => void;
  onBrandChange: (brand: BrandFilter) => void;
}

const ProductFilters = ({
  categoryFilter,
  brandFilter,
  onCategoryChange,
  onBrandChange,
}: ProductFiltersProps) => {
  const categories: { value: CategoryFilter; label: string }[] = [
    { value: 'all', label: 'الكل' },
    { value: 'accessories', label: 'اكسسوارات' },
    { value: 'essentials', label: 'كماليات' },
  ];

  const brands: { value: BrandFilter; label: string }[] = [
    { value: 'all', label: 'الكل' },
    { value: 'dayon', label: brandLabels.dayon },
    { value: 'hogan', label: brandLabels.hogan },
    { value: 'cmg', label: brandLabels.cmg },
    { value: 'halawa', label: brandLabels.halawa },
    { value: 'bajaj', label: brandLabels.bajaj },
    { value: 'other', label: brandLabels.other },
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
