import { cn } from "@/lib/utils";

type Variant =
  | "headline-1"
  | "headline-2"
  | "headline-3"
  | "headline-4"
  | "headline-5"
  | "title-1"
  | "title-2"
  | "title-3"
  | "title-4"
  | "label-1"
  | "label-2"
  | "label-3"
  | "label-4"
  | "body-1"
  | "body-2"
  | "body-3"
  | "body-4";

type Breakpoint = "sm" | "md" | "lg" | "xl" | "2xl" | "base";

type TypographyVariant = Variant | Partial<Record<Breakpoint, Variant>>;

interface TypographyProps extends React.HTMLAttributes<HTMLParagraphElement> {
  variant: TypographyVariant;
  color?: string;
}

const VARIANT_MAP: Record<Variant, string> = {
  "headline-1": "text-headline-1",
  "headline-2": "text-headline-2",
  "headline-3": "text-headline-3",
  "headline-4": "text-headline-4",
  "headline-5": "text-headline-5",
  "title-1": "text-title-1",
  "title-2": "text-title-2",
  "title-3": "text-title-3",
  "title-4": "text-title-4",
  "label-1": "text-label-1",
  "label-2": "text-label-2",
  "label-3": "text-label-3",
  "label-4": "text-label-4",
  "body-1": "text-body-1",
  "body-2": "text-body-2",
  "body-3": "text-body-3",
  "body-4": "text-body-4",
};

export default function Typography({
  variant,
  color = "foreground",
  className,
  ...props
}: TypographyProps) {
  let fontSizeClasses = "";

  if (typeof variant === "string") {
    fontSizeClasses = VARIANT_MAP[variant];
  } else {
    const classes: string[] = [];
    if (variant.base) classes.push(VARIANT_MAP[variant.base]);
    if (variant.sm) classes.push(`sm:${VARIANT_MAP[variant.sm]}`);
    if (variant.md) classes.push(`md:${VARIANT_MAP[variant.md]}`);
    if (variant.lg) classes.push(`lg:${VARIANT_MAP[variant.lg]}`);
    if (variant.xl) classes.push(`xl:${VARIANT_MAP[variant.xl]}`);
    if (variant["2xl"]) classes.push(`2xl:${VARIANT_MAP[variant["2xl"]]}`);
    fontSizeClasses = classes.join(" ");
  }

  const colorClass = color !== "foreground" ? `text-${color}` : "";

  return (
    <p className={cn(fontSizeClasses, colorClass, className)} {...props}>
      {props.children}
    </p>
  );
}
