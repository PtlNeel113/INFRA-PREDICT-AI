import React, { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '../../utils/cn';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      className = '',
      id,
      ...props
    },
    ref,
  ) => {
    const inputId = id || (label ? label.toLowerCase().replace(/[^a-z0-9]/g, '-') : undefined);

    return (
      <div className="w-full text-left">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-[11px] font-black text-[var(--neo-text-primary)] uppercase tracking-wider mb-1.5"
          >
            {label}
          </label>
        )}
        <div className="relative rounded-xl">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#1557D6]">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              'w-full rounded-xl neo-input px-3.5 py-2.5 text-sm text-[var(--neo-text-primary)] placeholder:text-slate-400 focus:outline-none transition-all duration-150',
              error
                ? 'border-[#DC2626] focus:border-[#DC2626] focus:ring-2 focus:ring-red-500/20'
                : 'border-[rgba(200,212,226,0.6)] focus:border-[#1557D6] focus:ring-2 focus:ring-[#1557D6]/20',
              leftIcon ? 'pl-10' : '',
              rightIcon ? 'pr-10' : '',
              className,
            )}
            {...props}
          />
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center">
              {rightIcon}
            </div>
          )}
        </div>
        {error && <p className="mt-1.5 text-xs font-medium text-[#DC2626]">{error}</p>}
        {!error && helperText && <p className="mt-1.5 text-xs text-slate-500">{helperText}</p>}
      </div>
    );
  },
);
Input.displayName = 'Input';
