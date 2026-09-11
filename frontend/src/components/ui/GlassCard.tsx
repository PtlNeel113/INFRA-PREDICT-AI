import React from 'react';
import { cn } from '../../utils/cn';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'card' | 'panel' | 'surface';
  hover?: boolean;
  onClick?: () => void;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className,
  variant = 'card',
  hover = false,
  onClick,
}) => {
  const variantStyles = {
    card: 'neo-card',
    panel: 'neo-panel',
    surface: 'neo-surface',
  };

  return (
    <div
      className={cn(
        'rounded-2xl',
        variantStyles[variant],
        hover && 'hover-lift cursor-pointer',
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
