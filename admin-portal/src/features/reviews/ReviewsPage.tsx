import React from 'react';
import { Star, ShieldAlert } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export const ReviewsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Platform Reviews Moderation Queue</h1>
        <p className="text-xs text-slate-500 mt-0.5">Filter flagged customer comments, inspect suspicious rating spikes & maintain review integrity.</p>
      </div>

      <div className="p-8 rounded-2xl bg-white border border-amber-200 shadow-sm text-center space-y-3">
        <Star className="w-12 h-12 text-[#DAA520] mx-auto" />
        <h3 className="font-extrabold text-base text-slate-900">0 Pending Flagged Reviews</h3>
        <p className="text-xs text-slate-500">AI sentiment filter & automated fake review detection is active.</p>
      </div>
    </div>
  );
};
