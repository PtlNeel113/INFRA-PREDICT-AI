import React, { ButtonHTMLAttributes } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-semibold transition-all duration-200 rounded-xl focus:outline-none focus:ring-4 disabled:opacity-50 disabled:cursor-not-allowed select-none cursor-pointer hover-lift';

  const sizeStyles = {
    sm: 'text-xs px-3 py-2 gap-1.5 h-9',
    md: 'text-sm px-4 py-2.5 gap-2 h-11',
    lg: 'text-base px-6 py-3.5 gap-2.5 h-13',
  };

  const variantStyles = {
    primary:
      'bg-[#1557D6] text-white hover:bg-[#0A1B33] active:bg-[#0A1B33] focus:ring-[#1557D6]/20 shadow-elevated border border-[#1557D6]',
    secondary:
      'bg-white text-[#0B1220] hover:bg-[rgba(21,87,214,0.04)] active:bg-[rgba(21,87,214,0.08)] focus:ring-[#1557D6]/10 shadow-lifted border border-[rgba(15,30,50,0.12)]',
    accent:
      'bg-[#8EDC35] text-[#0A1B33] hover:bg-[#7BC82E] active:bg-[#6BB526] focus:ring-[#8EDC35]/20 shadow-elevated border border-[#8EDC35]',
    danger:
      'bg-[#DC2626] text-white hover:bg-[#B91C1C] active:bg-[#991B1B] focus:ring-[#DC2626]/20 shadow-elevated border border-[#DC2626]',
    ghost:
      'text-[#536174] hover:text-[#0B1220] hover:bg-[rgba(15,30,50,0.04)] focus:ring-[rgba(15,30,50,0.08)] active:bg-[rgba(15,30,50,0.08)]',
  };

  return (
    <button
      className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? <Loader2 className="w-4 h-4 animate-spin shrink-0" /> : leftIcon}
      <span className="truncate">{children}</span>
      {!isLoading && rightIcon}
    </button>
  );
};
