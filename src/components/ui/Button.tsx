import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  pill?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  pill = false,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-indigo/50 disabled:opacity-50 disabled:cursor-not-allowed select-none';
  
  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2.5 gap-2',
    lg: 'text-base px-6 py-3.5 gap-2.5',
  };

  const roundedStyle = pill ? 'rounded-full' : 'rounded-xl';

  const variantStyles = {
    primary: 'bg-brand-indigo hover:bg-brand-600 text-white shadow-lg shadow-brand-indigo/25 hover:shadow-brand-indigo/40 active:scale-[0.98]',
    secondary: 'bg-brand-blue/15 text-brand-indigo hover:bg-brand-blue/25 dark:bg-brand-indigo/20 dark:text-brand-blue dark:hover:bg-brand-indigo/30',
    outline: 'border border-borderLight dark:border-borderDark text-headingLight dark:text-headingDark hover:bg-surfaceLight dark:hover:bg-surfaceDark hover:border-brand-indigo/40',
    ghost: 'text-bodyLight dark:text-bodyDark hover:text-headingLight dark:hover:text-headingDark hover:bg-surfaceLight dark:hover:bg-surfaceDark',
    danger: 'bg-statusDanger text-white hover:bg-red-600 shadow-md shadow-statusDanger/20',
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${roundedStyle} ${variantStyles[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin text-current" />
      ) : (
        leftIcon
      )}
      {children}
      {!isLoading && rightIcon}
    </button>
  );
};
