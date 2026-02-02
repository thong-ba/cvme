import { useState, useEffect } from 'react';
import { Zap } from 'lucide-react';
import ProductCard from './ProductCard.tsx';
import type { Product } from '../../types/ecommerce';

interface FlashSaleProps {
  products: Product[];
  endAt: string;
}

function formatCountdown(endAt: string): string {
  const end = new Date(endAt).getTime();
  const now = Date.now();
  const diff = Math.max(0, end - now);
  const h = Math.floor(diff / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

const FlashSale = ({ products, endAt }: FlashSaleProps) => {
  const [countdown, setCountdown] = useState(formatCountdown(endAt));

  useEffect(() => {
    const t = setInterval(() => setCountdown(formatCountdown(endAt)), 1000);
    return () => clearInterval(t);
  }, [endAt]);

  const list = products.filter((p) => p.inFlashSale).slice(0, 6);
  if (!list.length) return null;

  return (
    <section className="rounded-2xl bg-white p-4 sm:p-6 shadow-sm border border-slate-100">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-red-100 text-red-600">
            <Zap size={20} />
          </div>
          <h2 className="text-lg font-semibold text-slate-900">Flash Sale</h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-500">Kết thúc sau</span>
          <span className="font-mono font-semibold text-red-600 bg-red-50 px-2 py-1 rounded">
            {countdown}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4">
        {list.map((product) => (
          <ProductCard key={product.id} product={product} showFlashSale />
        ))}
      </div>
    </section>
  );
};

export default FlashSale;
