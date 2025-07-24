import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-8 md:h-12 w-full rounded-md border-none bg-white px-4 py-5 text-base ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-primaryDark placeholder:text-[#A8A8A8] outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50 md:text-sm hover:ring-2 hover:ring-primary transition-all duration-200",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
