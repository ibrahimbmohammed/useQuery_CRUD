import type { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import React from 'react';

interface ButtonProps
  extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, disabled, ...props }, ref) => {
    return (
      <button ref={ref} {...props} disabled={disabled} className={className}>
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';

export default Button;
