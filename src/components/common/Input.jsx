import React from "react";
import { cn } from "../../utils/cn";

export const Input = React.forwardRef(
  (
    {
      className,
      label,
      error,
      icon,
      endIcon,
      onEndIconClick,
      required,
      ...props
    },
    ref
  ) => {
    return (
      <div className="w-full">

        {/* 🔷 Label */}
        {label && (
          <label className="mb-1.5 block text-sm font-medium text-slate-700">
            {label} {required && <span className="text-red-500">*</span>}
          </label>
        )}

        {/* 🔷 Input Wrapper */}
        <div className="relative">

          {/* Left Icon */}
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
              {icon}
            </div>
          )}

          {/* Input */}
          <input
            ref={ref}
            className={cn(
              "flex h-10 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 shadow-sm",
              icon && "pl-10",
              endIcon && "pr-10",
              error &&
                "border-red-500 focus:border-red-500 focus:ring-red-500/20",
              className
            )}
            {...props}
          />

          {/* Right Icon */}
          {endIcon && (
            <div
              className={cn(
                "absolute right-3 top-1/2 -translate-y-1/2 text-slate-400",
                onEndIconClick && "cursor-pointer hover:text-slate-600"
              )}
              onClick={onEndIconClick}
            >
              {endIcon}
            </div>
          )}
        </div>

        {/* 🔴 Error Message */}
        {error && (
          <p className="mt-1 text-xs text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";