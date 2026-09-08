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
    card: 'glass-card',
    panel: 'glass-panel',
    surface: 'glass-surface',
  };

  return (
    <div
      className={cn(
        'rounded-xl',
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
