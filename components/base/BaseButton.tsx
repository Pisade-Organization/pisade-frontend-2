import { cn } from "@/lib/utils"
import React from "react"

type TypeStyle = "default" | "outline" | "borderless"
type ResponsiveTypeStyle = { base?: TypeStyle; lg?: TypeStyle } | TypeStyle

const typeStyleClasses: Record<TypeStyle, Record<string, string>> = {
    default: {
        base: "",
        "primary": "text-white bg-electric-violet-500 hover:bg-electric-violet-700",
        "secondary": "text-white bg-deep-royal-indigo-700 hover:bg-white hover:border hover:border-deep-royal-indigo-700 hover:text-deep-royal-indigo-600",
    },
    outline: {
        base: "border",
        "primary": "text-electric-violet-500 border-electric-violet-500 hover:border-none hover:bg-electric-violet-500",
        "secondary": "text-deep-royal-indigo-700 border-deep-royal-indigo-700 hover:bg-deep-royal-indigo-700 hover:text-white",
    },
    borderless: {
        base: "bg-transparent border-none",
        "primary": "text-electric-violet-500 hover:bg-neutral-50",
        "secondary": "text-deep-royal-indigo-700 hover:bg-neutral-50",
    }
}

function buildTypeStyleClasses(typeStyle: ResponsiveTypeStyle, variant: "primary" | "secondary"): string {
    if (typeof typeStyle === "string") {
        const baseClass = typeStyleClasses[typeStyle].base || ""
        const variantClass = typeStyleClasses[typeStyle][variant] || ""
        return cn(baseClass, variantClass)
    }

    const classes: string[] = []
    
    if (typeStyle.base) {
        const baseClass = typeStyleClasses[typeStyle.base].base || ""
        const variantClass = typeStyleClasses[typeStyle.base][variant] || ""
        const combinedClass = cn(baseClass, variantClass)
        if (combinedClass) {
            classes.push(combinedClass)
        }
    }
    
    if (typeStyle.lg) {
        const baseClass = typeStyleClasses[typeStyle.lg].base || ""
        const variantClass = typeStyleClasses[typeStyle.lg][variant] || ""
        const combinedClass = cn(baseClass, variantClass)
        if (combinedClass) {
            // Prefix each class with lg:
            const prefixedClasses = combinedClass.split(/\s+/).map(cls => `lg:${cls}`).join(" ")
            classes.push(prefixedClasses)
        }
    }
    
    return classes.join(" ")
}

export interface BaseButtonProps
    extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'typeStyle'> {
            variant?: "primary" | "secondary",
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
    const typeStyleClass = buildTypeStyleClasses(typeStyle, variant)
    const baseClasses = "group inline-flex justify-center items-center gap-2 transition-all duration-200 ease-in-out rounded-[8px] text-label-3 lg:text-label-2 px-4 py-3 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
    
    return (    
        <button 
            disabled={disabled}
            className={cn(
                baseClasses,
                typeStyleClass,
                className
            )}
            style={{
                ...(textColor && { color: textColor }),
                ...(borderColor && { borderColor: borderColor }),
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