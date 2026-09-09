import React from 'react';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'maroon' | 'gold' | 'outline' | 'ghost' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  disabled,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-bold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none active:scale-[0.98]';

  const variants = {
    primary:
      'gold-gradient-btn font-serif uppercase tracking-wider',
    secondary:
      'maroon-gradient-btn font-serif uppercase tracking-wider',
    maroon:
      'maroon-gradient-btn font-serif uppercase tracking-wider',
    gold:
      'gold-gradient-btn font-serif uppercase tracking-wider',
    outline:
      'border border-[#C5A059] bg-transparent hover:bg-[#FAF5EC] text-[#6B131E] focus:ring-[#C5A059]',
    ghost:
      'bg-transparent hover:bg-[#FAF5EC] text-[#261C14] focus:ring-[#C5A059]',
    danger:
      'bg-rose-700 text-white hover:bg-rose-800 focus:ring-rose-600 shadow-md',
    success:
      'bg-emerald-700 text-white hover:bg-emerald-800 focus:ring-emerald-600 shadow-md',
  };

  const sizes = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-xs sm:text-sm px-4 py-2.5 gap-2',
    lg: 'text-sm sm:text-base px-6 py-3.5 gap-2.5 font-extrabold',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin shrink-0" />
      ) : (
        <>
          {leftIcon && <span className="shrink-0">{leftIcon}</span>}
          {children && <span>{children}</span>}
          {rightIcon && <span className="shrink-0">{rightIcon}</span>}
        </>
      )}
    </button>
  );
};
