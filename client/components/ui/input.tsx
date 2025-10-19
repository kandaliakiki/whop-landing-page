import * as React from "react";
import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground h-11 w-full min-w-0 rounded-md border bg-white px-3 py-2 text-base outline-none border-[color:var(--border)]",
        "focus-visible:ring-2 focus-visible:ring-[color:var(--primary)]",
        className
      )}
      {...props}
    />
  );
}

export { Input };
