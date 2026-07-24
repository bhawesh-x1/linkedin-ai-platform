import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
  glow?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card: React.FC<CardProps> = ({
  children,
  hoverEffect = false,
  glow = false,
  padding = 'md',
  className = '',
  ...props
}) => {
  const paddingStyles = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const hoverStyles = hoverEffect 
    ? 'hover:-translate-y-1 hover:shadow-floating transition-all duration-300 hover:border-brand-indigo/30' 
    : '';

  const glowStyles = glow ? 'shadow-glow border-brand-indigo/30' : '';

  return (
    <div
      className={`glass-panel rounded-2xl ${paddingStyles[padding]} ${hoverStyles} ${glowStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
