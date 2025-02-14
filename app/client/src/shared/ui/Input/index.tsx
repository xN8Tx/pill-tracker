import React from "react";

import { cn } from "@/shared/lib";

export type InputProps = React.ComponentProps<"input"> & {
  label: string;
  icon?: React.ReactNode;
  rootClassName?: string;
  labelColor?: string;
  error?: string;
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, icon, error, labelColor, ...props }, ref) => {
    const id = React.useId();

    return (
      <div className={cn("group w-full", props.rootClassName)}>
        <div className="relative w-full">
          <label
            htmlFor={id}
            className={cn(
              "origin-start absolute top-1/2 block -translate-y-1/2 cursor-text px-3 text-sm text-muted-foreground/70 transition-all group-focus-within:pointer-events-none group-focus-within:top-0 group-focus-within:cursor-default group-focus-within:text-xs group-focus-within:font-medium group-focus-within:text-foreground has-[+input:not(:placeholder-shown)]:pointer-events-none has-[+input:not(:placeholder-shown)]:top-0 has-[+input:not(:placeholder-shown)]:cursor-default has-[+input:not(:placeholder-shown)]:text-xs has-[+input:not(:placeholder-shown)]:font-medium has-[+input:not(:placeholder-shown)]:text-foreground pointer-events-none",
            )}
          >
            <span
              className={(cn("inline-flex bg-background px-2"), labelColor)}
            >
              {label}
            </span>
          </label>
          <input
            type={type}
            className={cn(
              "flex h-9 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm shadow-black/5 transition-shadow placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/20 disabled:cursor-not-allowed disabled:opacity-50",
              type === "search" &&
                "[&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none [&::-webkit-search-results-button]:appearance-none [&::-webkit-search-results-decoration]:appearance-none",
              type === "file" &&
                "p-0 pr-3 italic text-muted-foreground/70 file:me-3 file:h-full file:border-0 file:border-r file:border-solid file:border-input file:bg-transparent file:px-3 file:text-sm file:font-medium file:not-italic file:text-foreground",
              className,
            )}
            ref={ref}
            {...props}
            placeholder=""
          />
          {icon && (
            <div className="absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-muted-foreground/80 peer-disabled:opacity-50">
              {icon}
            </div>
          )}
        </div>
        {error && (
          <p
            className="mt-1 px-2 text-xs text-destructive"
            role="alert"
            aria-live="polite"
          >
            {error}
          </p>
        )}
      </div>
    );
  },
);
