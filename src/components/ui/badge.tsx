import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground",
        cyberpunk: "border-cyan-500/50 bg-cyan-950/30 text-cyan-300 hover:bg-cyan-900/40 hover:text-cyan-100 shadow-[0_0_5px_rgba(0,240,255,0.2)]",
        selected: "border-cyan-500/80 bg-cyan-800/50 text-cyan-100 shadow-[0_0_8px_rgba(0,240,255,0.4)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  clickable?: boolean;
  active?: boolean;
}

function Badge(
  { className, variant, clickable, active, ...props }: BadgeProps
) {
  const baseStyles = badgeVariants({ variant: active ? "selected" : variant });
  
  return (
    <div 
      className={cn(
        baseStyles, 
        clickable && "cursor-pointer",
        className
      )} 
      {...props} 
    />
  )
}

export { Badge, badgeVariants }
