
import React from 'react';

type ActionButtonProps = {
  label: string;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
  ariaLabel?: string;
};

const variantClasses = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700',
  secondary: 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50',
};

export function ActionButton({
  label,
  variant = 'primary',
  onClick,
  ariaLabel,
}: ActionButtonProps) {
  const classes = `
    w-full py-2 px-4 text-sm font-medium rounded-md transition-colors
    ${variantClasses[variant]}
  `;
  return (
    <button
      type="button"
      className={classes}
      onClick={onClick}
      aria-label={ariaLabel ?? label}
    >
      {label}
    </button>
  );
}
