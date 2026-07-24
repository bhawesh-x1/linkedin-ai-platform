import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'neutral';
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon
}) => {
  const variantStyles = {
    primary: 'bg-brand-indigo/10 text-brand-indigo border-brand-indigo/20 dark:bg-brand-indigo/20 dark:text-brand-blue',
    secondary: 'bg-brand-violet/10 text-brand-violet border-brand-violet/20',
    success: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400',
    warning: 'bg-amber-500/10 text-amber-600 border-amber-500/20 dark:text-amber-400',
    danger: 'bg-rose-500/10 text-rose-600 border-rose-500/20 dark:text-rose-400',
    neutral: 'bg-surfaceLight text-bodyLight border-borderLight dark:bg-surfaceDark dark:text-bodyDark dark:border-borderDark',
  };

  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5 font-medium gap-1',
    md: 'text-xs px-2.5 py-1 font-semibold gap-1.5',
  };

  return (
    <span className={`inline-flex items-center rounded-full border ${variantStyles[variant]} ${sizeStyles[size]}`}>
      {icon}
      {children}
    </span>
  );
};
