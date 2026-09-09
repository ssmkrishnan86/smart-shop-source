import React from 'react';
import { Star } from 'lucide-react';

export interface RatingProps {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  onChange?: (val: number) => void;
}

export const Rating: React.FC<RatingProps> = ({
  value,
  max = 5,
  size = 'md',
  showLabel = false,
  onChange,
}) => {
  const starSizes = { sm: 'w-3.5 h-3.5', md: 'w-4 h-4', lg: 'w-5 h-5' };

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: max }).map((_, idx) => {
        const starValue = idx + 1;
        const isFilled = starValue <= Math.floor(value);
        const isHalf = starValue === Math.ceil(value) && value % 1 !== 0;

        return (
          <button
            type="button"
            key={idx}
            disabled={!onChange}
            onClick={() => onChange && onChange(starValue)}
            className={`${onChange ? 'cursor-pointer hover:scale-110 transition-transform' : 'cursor-default'}`}
          >
            <Star
              className={`${starSizes[size]} ${
                isFilled || isHalf ? 'text-amber-500 fill-amber-500' : 'text-muted-foreground/30'
              }`}
            />
          </button>
        );
      })}
      {showLabel && <span className="ml-1 text-xs font-semibold text-foreground">{value.toFixed(1)}</span>}
    </div>
  );
};
