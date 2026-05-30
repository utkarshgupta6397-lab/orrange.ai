"use client";

import { motion } from "framer-motion";
import { forwardRef } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  children: React.ReactNode;
}

const sizeClasses = {
  sm: "h-9 px-4 text-sm",
  md: "h-12 px-7 text-[15px]",
  lg: "h-14 px-8 text-base",
};

const variantClasses = {
  primary:
    "bg-orange text-white border border-orange rounded-lg font-semibold hover:bg-orange-hover active:scale-[0.98]",
  secondary:
    "bg-white text-text-primary border border-border rounded-lg font-semibold hover:border-border-strong hover:bg-bg-secondary active:scale-[0.98]",
  ghost:
    "bg-transparent text-orange border border-transparent rounded-lg font-semibold hover:text-orange-hover active:scale-[0.98] group",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", children, className = "", ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: variant === "primary" ? 1.01 : 1 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.15 }}
        className={`
          inline-flex items-center justify-center gap-2 cursor-pointer
          font-sans tracking-[-0.01em] transition-all duration-150
          ${sizeClasses[size]}
          ${variantClasses[variant]}
          ${className}
        `}
        {...(props as React.ComponentPropsWithoutRef<typeof motion.button>)}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";

export default Button;
