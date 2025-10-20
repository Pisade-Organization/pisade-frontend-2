import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const buttonVariants = cva(
    "inline-flex justify-center items-center transition-all duration-200 ease-in-out rounded-[8px] text-label-3 lg:text-label-2 px-4 py-3 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed ",
    {
        variants: {
            variant: {
                primary: "",
                secondary: "",
            },
            typeStyle: {
                default:  "",
                outline: "border",
                borderless: "bg-transparent border-none"
            },

        },
        compoundVariants: [
            {
                variant: "primary",
                typeStyle: "default",
                class: "text-white bg-electric-violet-500 hover:bg-electric-violet-700"
            }, 
            {
                variant: "secondary",
                typeStyle: "default",
                class: "text-white bg-deep-royal-indigo-700 hover:bg-white hover:border hover:border-deep-royal-indigo-700"
            },
            {
                variant: "primary",
                typeStyle: "outline",
                class: "text-electric-violet-500 border-electric-violet-500 hover:border-none hover:bg-electric-violet-500"
            },
            {
                variant: "secondary",
                typeStyle: "outline",
                class: "text-deep-royal-indigo-700 border-deep-royal-indigo-700 hover:bg-deep-royal-indigo-700 hover:text-white"
            },
            {
                variant: "primary",
                typeStyle: "borderless",
                class: "text-electric-violet-500 hover:bg-neutral-50"
            },
            {
                variant: "primary",
                typeStyle: "borderless",
                class: "text-deep-royal-indigo-700 hover:bg-neutral-50"
            }
        ]
    }
)

export interface BaseButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {}

export default function BaseButton({
    className,
    variant = "primary",
    typeStyle = "default",
    children,
    disabled,
    ...props
}: BaseButtonProps) {
    return (    
        <button 
            disabled={disabled}
            className={cn(
                buttonVariants({ variant, typeStyle, className })
            )}
            {...props}
        >
            {children}
        </button>
    )
}