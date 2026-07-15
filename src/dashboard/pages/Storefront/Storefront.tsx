import StorefrontHeader from './StorefrontHeader';
import TemplateToolbar from './TemplateToolbar';
import ThemeGrid from './ThemeGrid';

export default function Storefront() {
  return (
    <div className="space-y-4">
      <StorefrontHeader />
      <TemplateToolbar onMoreConfig={() => window.open('/dashboard/store-info', '_self')} />
      <ThemeGrid />
    </div>
  );
}
