import { cn } from "@/lib/utils";

export function Badge({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border border-border bg-transparent px-2 py-0.5 font-mono text-xs text-muted-foreground transition-colors hover:border-accent/50 hover:text-accent",
        className
      )}
      {...props}
    />
  );
}