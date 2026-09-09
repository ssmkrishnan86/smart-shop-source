import React from 'react';
import { LucideIcon } from 'lucide-react';

export interface MetricCardProps {
  title: string;
  value: string;
  change?: string;
  isPositive?: boolean;
  icon: LucideIcon;
  color?: string;
  subtitle?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  isPositive = true,
  icon: Icon,
  color = 'bg-[#FAF2E4] text-[#C59B34]',
  subtitle,
}) => {
  return (
    <div className="p-5 rounded-2xl bg-[#F8F5F0] border border-[#EAE1D0] shadow-xs hover:shadow-md hover:border-[#C59B34]/60 transition-all duration-200 flex items-center justify-between group">
      <div className="space-y-1">
        <span className="text-[11px] font-serif font-bold text-[#6E584B] uppercase tracking-wider">{title}</span>
        <h3 className="font-serif text-2xl font-black text-[#2C1E16] group-hover:text-[#7A1F1E] transition-colors">{value}</h3>
        {change && (
          <div className="flex items-center gap-1.5">
            <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
              isPositive ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-rose-100 text-rose-800 border border-rose-300'
            }`}>
              {change}
            </span>
            {subtitle && <span className="text-[10px] text-[#6E584B] font-medium">{subtitle}</span>}
          </div>
        )}
      </div>
      <div className={`p-3.5 rounded-2xl ${color} border border-[#EAE1D0] shadow-xs shrink-0 group-hover:scale-105 transition-transform duration-200`}>
        <Icon className="w-6 h-6" />
      </div>
    </div>
  );
};
