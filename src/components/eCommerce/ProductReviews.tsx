import { Star, User } from 'lucide-react';
import type { Review } from '../../types/ecommerce';

interface ProductReviewsProps {
  reviews: Review[];
  productName: string;
  averageRating: number;
  totalCount: number;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

const ProductReviews = ({ reviews, productName, averageRating, totalCount }: ProductReviewsProps) => {
  return (
    <section className="rounded-xl bg-white p-4 sm:p-6 shadow-sm border border-slate-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-slate-900">Đánh giá ({totalCount})</h2>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-amber-500">
            <Star size={18} fill="currentColor" />
            <span className="font-semibold text-slate-700">{averageRating}</span>
          </div>
          <span className="text-slate-500 text-sm">/ 5</span>
        </div>
      </div>
      {reviews.length === 0 ? (
        <p className="text-slate-500 text-center py-8">Chưa có đánh giá nào cho {productName}.</p>
      ) : (
        <ul className="space-y-6">
          {reviews.map((review) => (
            <li key={review.id} className="border-b border-slate-100 pb-6 last:border-0 last:pb-0">
              <div className="flex items-start gap-3">
                <div className="shrink-0 w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500">
                  <User size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-medium text-slate-900">{review.userName}</span>
                    <div className="flex items-center gap-1 text-amber-500">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          fill={i < review.rating ? 'currentColor' : 'none'}
                          className={i < review.rating ? '' : 'text-slate-200'}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-slate-500">{formatDate(review.createdAt)}</span>
                  </div>
                  <p className="mt-2 text-slate-600 text-sm leading-relaxed">{review.content}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default ProductReviews;
