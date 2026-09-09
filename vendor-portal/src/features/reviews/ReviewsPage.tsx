import React from 'react';
import { Star, MessageSquare } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export const ReviewsPage: React.FC = () => {
  const reviews = [
    { id: 'rev_1', customer: 'Deepak V.', product: 'Brass Ganesha Idol', rating: 5, comment: 'Exquisite antique brass craftsmanship! Highly blessed with the purchase.', date: '2026-08-05' },
    { id: 'rev_2', customer: 'Kavita M.', product: 'Copper Puja Thali Set', rating: 5, comment: 'Pure heavy copper quality thali set. Beautiful packaging.', date: '2026-08-04' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Customer Ratings & Reviews</h1>
        <p className="text-xs text-slate-500 mt-0.5">Moderate customer feedback, inspect 5-star ratings & reply to buyer reviews.</p>
      </div>

      <div className="space-y-4">
        {reviews.map((r) => (
          <div key={r.id} className="p-5 rounded-2xl bg-white border border-amber-200 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-bold text-xs text-slate-900">{r.customer}</span>
                <span className="text-[10px] text-slate-400">on {r.product}</span>
              </div>
              <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                <Star className="w-3.5 h-3.5 fill-current" /> {r.rating}.0 ★
              </div>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed font-medium">"{r.comment}"</p>
            <div className="pt-2 flex justify-end">
              <Button size="sm" variant="outline" leftIcon={<MessageSquare className="w-3.5 h-3.5" />}>
                Reply to Review
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
