import { TrendingUp } from 'lucide-react';
import { useCategories } from '../../../hooks/useCategories';
import { useProducts } from '../../../hooks/useProducts';

export default function ProductsStats() {
  const { data: productsResponse } = useProducts();
  const { data: categories = [] } = useCategories();

  const products = productsResponse?.data ?? [];
  const totalProducts = products.length;
  const totalValue = products.reduce((sum, product) => {
    const firstPrice = Number(product.variants?.[0]?.price ?? 0);
    return sum + (Number.isFinite(firstPrice) ? firstPrice : 0);
  }, 0);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0,
    }).format(value);

  const stats = [
    { label: 'Total Products Value', value: formatCurrency(totalValue), change: 'Updated now', up: true },
    { label: 'Total Categories', value: String(categories.length), change: 'Live', up: true },
    { label: 'Total Products', value: String(totalProducts), change: 'Live', up: true },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {stats.map(({ label, value, change, up }) => (
        <div key={label} className="bg-white rounded-xl border border-slate-100 p-4 sm:p-5">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 mb-2">
            {label}
          </p>
          <p className="text-xl sm:text-2xl font-bold text-slate-900">{value}</p>
          <div className={`flex items-center gap-1 mt-2 text-[11px] font-medium ${up ? 'text-emerald-500' : 'text-red-400'}`}>
            <TrendingUp size={12} strokeWidth={2} />
            {change}
          </div>
        </div>
      ))}
    </div>
  );
}
