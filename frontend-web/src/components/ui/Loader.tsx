import React from 'react';
import { Loader2 } from 'lucide-react';

export const Loader: React.FC<{ fullScreen?: boolean; label?: string }> = ({
  fullScreen = false,
  label = 'Loading...',
}) => {
  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/80 backdrop-blur-md">
        <Loader2 className="w-10 h-10 text-primary animate-spin mb-3" />
        <span className="text-sm font-medium text-muted-foreground">{label}</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center p-8 w-full">
      <Loader2 className="w-8 h-8 text-primary animate-spin mb-2" />
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  );
};

export const Skeleton: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`animate-pulse bg-muted rounded-xl ${className}`} />
);
