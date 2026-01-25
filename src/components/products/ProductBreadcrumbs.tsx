import { Link } from 'react-router-dom';
import { Home, ChevronLeft } from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { ProductSection, ProductSubSection, sectionLabels, subSectionLabels } from '@/types/product';

interface ProductBreadcrumbsProps {
  section?: ProductSection;
  subSection?: ProductSubSection;
}

const ProductBreadcrumbs = ({ section, subSection }: ProductBreadcrumbsProps) => {
  return (
    <Breadcrumb className="mb-6">
      <BreadcrumbList>
        {/* الرئيسية */}
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/" className="flex items-center gap-1.5">
              <Home className="w-4 h-4" />
              الرئيسية
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbSeparator>
          <ChevronLeft className="w-4 h-4" />
        </BreadcrumbSeparator>

        {/* المنتجات */}
        {!section ? (
          <BreadcrumbItem>
            <BreadcrumbPage>المنتجات</BreadcrumbPage>
          </BreadcrumbItem>
        ) : (
          <>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/products">المنتجات</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator>
              <ChevronLeft className="w-4 h-4" />
            </BreadcrumbSeparator>

            {/* القسم الرئيسي */}
            {!subSection ? (
              <BreadcrumbItem>
                <BreadcrumbPage>{sectionLabels[section]}</BreadcrumbPage>
              </BreadcrumbItem>
            ) : (
              <>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to={`/products/${section}`}>{sectionLabels[section]}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator>
                  <ChevronLeft className="w-4 h-4" />
                </BreadcrumbSeparator>

                {/* القسم الفرعي */}
                <BreadcrumbItem>
                  <BreadcrumbPage>{subSectionLabels[subSection]}</BreadcrumbPage>
                </BreadcrumbItem>
              </>
            )}
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default ProductBreadcrumbs;
