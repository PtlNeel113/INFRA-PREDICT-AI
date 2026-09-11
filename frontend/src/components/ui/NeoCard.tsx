import React from 'react';
import { cn } from '../../utils/cn';

export interface NeoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  elevation?: 1 | 2 | 3 | 4;
  variant?: 'raised' | 'inset' | 'flat';
  interactive?: boolean;
  active?: boolean;
}

export const NeoCard: React.FC<NeoCardProps> = ({
  children,
  className,
  elevation = 2,
  variant = 'raised',
  interactive = false,
  active = false,
  onClick,
  ...props
}) => {
  const elevationStyles = {
    1: 'neo-raised-sm',
    2: 'neo-card',
    3: 'neo-panel',
    4: 'neo-floating',
  };

  const variantStyles = {
    raised: elevationStyles[elevation],
    inset: elevation === 1 ? 'neo-inset-sm rounded-xl' : 'neo-inset rounded-2xl',
    flat: 'bg-[var(--neo-surface)] border border-[rgba(200,212,226,0.5)] rounded-xl',
  };

  return (
    <div
      className={cn(
        variantStyles[variant],
        interactive && 'hover:scale-[1.008] transition-all duration-200 cursor-pointer',
        active && 'neo-active',
        className
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};

