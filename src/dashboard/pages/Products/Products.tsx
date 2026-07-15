import { useState } from 'react';
import ProductsHeader from './ProductsHeader';
import ProductsTabs, { type ProductTab } from './ProductsTabs';
import ProductsStats from './ProductsStats';
import ProductsView from './ProductsView';
import CategoriesView from './CategoriesView';
import AttributesView from './AttributesView';
import GiftCardsView from './GiftCardsView';

export default function Products() {
  const [tab, setTab] = useState<ProductTab>('products');

  return (
    <div className="space-y-5">
      <ProductsHeader activeTab={tab} />
      <ProductsTabs active={tab} onChange={setTab} />
      <ProductsStats />
      {tab === 'products' && <ProductsView />}
      {tab === 'categories' && <CategoriesView />}
      {tab === 'attributes' && <AttributesView />}
      {tab === 'giftcards' && <GiftCardsView />}
    </div>
  );
}
