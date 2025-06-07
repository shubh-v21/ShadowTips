import React from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

interface SelectOption {
  value: string;
  label: string;
}

interface CustomSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOption[];
  label?: string;
  wrapperClassName?: string;
}

const CustomSelect = React.forwardRef<HTMLSelectElement, CustomSelectProps>(
  ({ className, options, label, wrapperClassName, ...props }, ref) => {
    return (
      <div className={cn("relative", wrapperClassName)}>
        {label && (
          <label className="block text-sm font-medium text-cyan-400 mb-1">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            className={cn(
              "w-full h-10 pl-3 pr-10 py-2 text-cyan-100 bg-slate-800 rounded-md border border-cyan-800/50 appearance-none focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500",
              className
            )}
            ref={ref}
            {...props}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <ChevronDown className="h-4 w-4 text-cyan-400" />
          </div>
        </div>
      </div>
    );
  }
);

CustomSelect.displayName = "CustomSelect";

export { CustomSelect };
