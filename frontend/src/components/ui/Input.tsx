import React, { InputHTMLAttributes } from 'react';
import { cn } from '@/utils/cn';// Utility for combining class names

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  className,
  ...props
}) => {
  return (
    <div className="mb-4">
      {label && (
        <label 
          className="block text-gray-700 text-sm font-bold mb-2" 
          htmlFor={props.id}
        >
          {label}
        </label>
      )}
      <input
        className={cn(
          "w-full px-3 py-2 border rounded-md",
          "focus:outline-none focus:ring-2 focus:ring-blue-500",
          "transition-colors duration-300",
          error ? "border-red-500" : "border-gray-300",
          className
        )}
        {...props}
      />
      {error && (
        <p className="text-red-500 text-xs italic mt-1">{error}</p>
      )}
    </div>
  );
};
