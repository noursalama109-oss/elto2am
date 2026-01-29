import { ProductSection, sectionLabels, sectionIcons } from '@/types/product';
import { cn } from '@/lib/utils';

interface SectionFilterProps {
  sections: ProductSection[];
  selectedSection: ProductSection | 'all';
  onSectionChange: (section: ProductSection | 'all') => void;
  productCounts: Record<ProductSection, number>;
}

const SectionFilter = ({ sections, selectedSection, onSectionChange, productCounts }: SectionFilterProps) => {
  return (
    <div className="overflow-x-auto scrollbar-hide -mx-4 px-4 mb-8">
      <div className="flex gap-3 pb-2" style={{ minWidth: 'max-content' }}>
        {/* All Products Button */}
        <button
          onClick={() => onSectionChange('all')}
          className={cn(
            "flex items-center gap-2 px-4 py-2.5 rounded-full border transition-all duration-200 whitespace-nowrap flex-shrink-0",
            selectedSection === 'all'
              ? "bg-primary text-primary-foreground border-primary shadow-md"
              : "bg-card text-foreground border-border hover:border-primary/50 hover:bg-accent/50"
          )}
        >
          <span className="font-medium text-sm">الكل</span>
          <span className={cn(
            "text-xs px-2 py-0.5 rounded-full",
            selectedSection === 'all' ? "bg-primary-foreground/20" : "bg-muted"
          )}>
            {Object.values(productCounts).reduce((a, b) => a + b, 0)}
          </span>
        </button>

        {/* Section Buttons */}
        {sections.map((section) => {
          const SectionIcon = sectionIcons[section];
          const count = productCounts[section] || 0;
          
          if (count === 0) return null;

          return (
            <button
              key={section}
              onClick={() => onSectionChange(section)}
              className={cn(
                "flex items-center gap-2 px-4 py-2.5 rounded-full border transition-all duration-200 whitespace-nowrap flex-shrink-0",
                selectedSection === section
                  ? "bg-primary text-primary-foreground border-primary shadow-md"
                  : "bg-card text-foreground border-border hover:border-primary/50 hover:bg-accent/50"
              )}
            >
              <SectionIcon className="w-4 h-4" />
              <span className="font-medium text-sm">{sectionLabels[section].replace('قسم ', '')}</span>
              <span className={cn(
                "text-xs px-2 py-0.5 rounded-full",
                selectedSection === section ? "bg-primary-foreground/20" : "bg-muted"
              )}>
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SectionFilter;
