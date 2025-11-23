import * as React from "react";
import { NativeSelectField, NativeSelectRoot } from "@chakra-ui/react";
import { cn } from "../lib/utils";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOption[];
  placeholder?: string;
  error?: boolean;
  helperText?: string;
  label?: string;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, options, placeholder, error, helperText, label, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="text-sm font-medium mb-1 block">
            {label}
          </label>
        )}
        <NativeSelectRoot size="md" className={cn("w-full", className)}>
          <NativeSelectField
            ref={ref}
            {...props}
            className={cn(
              "w-full",
              error && "border-red-500"
            )}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </NativeSelectField>
        </NativeSelectRoot>
        {helperText && (
          <p className={cn(
            "text-sm mt-1",
            error ? "text-red-500" : "text-gray-600"
          )}>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

export { Select };
