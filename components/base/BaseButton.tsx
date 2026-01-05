import { cn } from "@/lib/utils"
import React from "react"

type TypeStyle = "default" | "outline" | "borderless"
type ResponsiveTypeStyle = { base?: TypeStyle; lg?: TypeStyle } | TypeStyle
type ResponsiveVariant = { base?: "primary" | "secondary"; lg?: "primary" | "secondary" } | "primary" | "secondary"

const typeStyleClasses: Record<TypeStyle, Record<string, string>> = {
    default: {
        base: "",
        "primary": "text-white bg-electric-violet-500 hover:bg-electric-violet-700",
        "secondary": "text-white bg-deep-royal-indigo-700 hover:bg-white hover:border hover:border-deep-royal-indigo-700 hover:text-deep-royal-indigo-600",
    },
    outline: {
        base: "border",
        "primary": "text-electric-violet-500 border-electric-violet-500 hover:text-white hover:border-electric-violet-500 hover:bg-electric-violet-500",
        "secondary": "text-deep-royal-indigo-700 border-deep-royal-indigo-700 hover:bg-deep-royal-indigo-700 hover:text-white",
    },
    borderless: {
        base: "bg-transparent border-none",
        "primary": "text-electric-violet-500 hover:bg-neutral-50",
        "secondary": "text-deep-royal-indigo-700 hover:bg-neutral-50",
    }
}

function buildTypeStyleClasses(typeStyle: ResponsiveTypeStyle, variant: ResponsiveVariant): string {
    // Normalize variant to always be an object for easier handling
    const normalizedVariant: { base?: "primary" | "secondary"; lg?: "primary" | "secondary" } = 
        typeof variant === "string" ? { base: variant, lg: variant } : variant
    
    // Normalize typeStyle to always be an object for easier handling
    const normalizedTypeStyle: { base?: TypeStyle; lg?: TypeStyle } = 
        typeof typeStyle === "string" ? { base: typeStyle, lg: typeStyle } : typeStyle

    const classes: string[] = []
    
    // Build base classes
    if (normalizedTypeStyle.base && normalizedVariant.base) {
        const baseClass = typeStyleClasses[normalizedTypeStyle.base].base || ""
        const variantClass = typeStyleClasses[normalizedTypeStyle.base][normalizedVariant.base] || ""
        const combinedClass = cn(baseClass, variantClass)
        if (combinedClass) {
            classes.push(combinedClass)
        }
    }
    
    // Build lg classes
    if (normalizedTypeStyle.lg && normalizedVariant.lg) {
        const baseClass = typeStyleClasses[normalizedTypeStyle.lg].base || ""
        const variantClass = typeStyleClasses[normalizedTypeStyle.lg][normalizedVariant.lg] || ""
        const combinedClass = cn(baseClass, variantClass)
        
        // If base and lg are different (typeStyle or variant), override conflicting base classes at lg
        const typeStyleChanged = normalizedTypeStyle.base && normalizedTypeStyle.base !== normalizedTypeStyle.lg
        const variantChanged = normalizedVariant.base && normalizedVariant.base !== normalizedVariant.lg
        
        if (combinedClass) {
            // If variant changed, use !important to ensure lg classes override base
            if (variantChanged) {
                const prefixedClasses = combinedClass.split(/\s+/)
                    .filter(cls => cls && !cls.startsWith("hover:"))
                    .map(cls => `lg:!${cls}`)
                    .join(" ")
                classes.push(prefixedClasses)
            } else {
                // Prefix each class with lg: (normal case)
                const prefixedClasses = combinedClass.split(/\s+/).map(cls => `lg:${cls}`).join(" ")
                classes.push(prefixedClasses)
            }
        }
        
        if (typeStyleChanged || variantChanged) {
            const baseBaseClass = normalizedTypeStyle.base ? typeStyleClasses[normalizedTypeStyle.base].base || "" : ""
            const baseVariant = normalizedVariant.base || "primary"
            const baseVariantClass = normalizedTypeStyle.base ? typeStyleClasses[normalizedTypeStyle.base][baseVariant] || "" : ""
            
            // Switching from outline to default
            if (normalizedTypeStyle.base === "outline" && normalizedTypeStyle.lg === "default") {
                // Remove border
                classes.push("lg:border-none")
                // Override text color (outline uses colored text, default uses white)
                if (baseVariantClass.includes("text-electric-violet-500")) {
                    classes.push("lg:!text-white")
                }
                if (baseVariantClass.includes("text-deep-royal-indigo-700")) {
                    classes.push("lg:!text-white")
                }
                // Remove border color classes
                classes.push("lg:border-transparent")
                // Ensure background is applied (default style needs background)
                const lgVariant = normalizedVariant.lg || "primary"
                const defaultVariantClass = typeStyleClasses["default"][lgVariant] || ""
                if (defaultVariantClass.includes("bg-electric-violet-500")) {
                    classes.push("lg:!bg-electric-violet-500")
                }
                if (defaultVariantClass.includes("bg-deep-royal-indigo-700")) {
                    classes.push("lg:!bg-deep-royal-indigo-700")
                }
            }
            // Switching from default to outline
            if (normalizedTypeStyle.base === "default" && normalizedTypeStyle.lg === "outline") {
                const lgVariant = normalizedVariant.lg || "primary"
                const defaultVariantClass = typeStyleClasses["default"][lgVariant] || ""
                // Remove background
                if (defaultVariantClass.includes("bg-electric-violet-500")) {
                    classes.push("lg:!bg-transparent")
                }
                if (defaultVariantClass.includes("bg-deep-royal-indigo-700")) {
                    classes.push("lg:!bg-transparent")
                }
            }
            // Switching from borderless to outline
            if (normalizedTypeStyle.base === "borderless" && normalizedTypeStyle.lg === "outline") {
                classes.push("lg:border")
                classes.push("lg:!border-solid")
            }
            // Switching from borderless to default
            if (normalizedTypeStyle.base === "borderless" && normalizedTypeStyle.lg === "default") {
                classes.push("lg:border-none")
            }
            
        }
    }
    
    return classes.join(" ")
}

export interface BaseButtonProps
    extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'typeStyle'> {
            variant?: ResponsiveVariant,
            typeStyle?: ResponsiveTypeStyle,
            iconLeft?: React.ReactNode,
            iconRight?: React.ReactNode,
            textColor?: string,
            borderColor?: string
        }

export default function BaseButton({
    className,
    variant = "primary",
    typeStyle = "default",
    iconLeft,
    iconRight,
    children,
    disabled,
    textColor,
    borderColor,
    style,
    ...props
}: BaseButtonProps) {
    const normalizedVariant: ResponsiveVariant = typeof variant === "string" ? variant : variant
    const typeStyleClass = buildTypeStyleClasses(typeStyle, normalizedVariant)
    const baseClasses = "group inline-flex justify-center items-center gap-2 transition-all duration-200 ease-in-out rounded-[8px] text-label-3 lg:text-label-2 px-3 py-2 lg:px-4 lg:py-3 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
    
    return (    
        <button 
            disabled={disabled}
            className={cn(
                baseClasses,
                typeStyleClass,
                className,
                borderColor && !borderColor.startsWith("#") && `border-${borderColor}`,
                textColor && !textColor.startsWith("#") && `text-${textColor}`
            )}
            style={{
                ...(borderColor?.startsWith("#") && { borderColor }),
                ...(textColor?.startsWith("#") && { color: textColor }),
                ...style
            }}
            {...props}
        >
            {iconLeft && <span className="flex items-center [&_svg]:stroke-current [&_svg]:transition-colors [&_svg]:duration-200">{iconLeft}</span>}
            {children}
            {iconRight && <span className="flex items-center w-5 h-5 [&_svg]:stroke-current [&_svg]:transition-colors [&_svg]:duration-200">{iconRight}</span>}
        </button>
    )
}