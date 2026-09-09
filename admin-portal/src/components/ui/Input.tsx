import React, { forwardRef } from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, leftIcon, rightIcon, className = '', id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-xs font-bold text-foreground/90">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3 text-muted-foreground pointer-events-none shrink-0">
              {leftIcon}
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            className={`w-full text-xs font-medium px-3.5 py-2.5 rounded-xl border border-input bg-card text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 shadow-xs ${
              leftIcon ? 'pl-9 sm:pl-10' : ''
            } ${rightIcon ? 'pr-9 sm:pr-10' : ''} ${
              error ? 'border-destructive focus:ring-destructive text-destructive' : ''
            } ${className}`}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 text-muted-foreground shrink-0">{rightIcon}</div>
          )}
        </div>
        {error && <span className="text-[11px] font-semibold text-destructive">{error}</span>}
        {!error && helperText && (
          <span className="text-[11px] text-muted-foreground">{helperText}</span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
