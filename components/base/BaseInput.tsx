import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"
import React from "react"

const inputVariants = cva(
    "",
    {
        variants: {
            state: {
                default: "",
                error: "",
            }
        },
        defaultVariants: {
            state: "default"
        }
    }
)

export interface BaseInputProps 
    extends React.InputHTMLAttributes<HTMLInputElement>,
        VariantProps<typeof inputVariants> {
            title?: string
            placeholder?: string
            className?: string
            errorMessage?: string
            required?: boolean
        }

export default function BaseInput({
    title, 
    placeholder,
    className,
    state = "default",
    required = false,
    errorMessage,
    children,
    disabled,
    ...props
}: BaseInputProps) {
    return (
        <div className="w-full flex flex-col justify-center items-start gap-1">
            
            <div className="flex justify-start items-center gap-1">
                <label className="text-neutral-800 text-label-3 lg:text-label-2">
                    {title}
                </label>

                { required && (
                    <label className="text-[#D9534F] text-label-3 lg:text-label-2">
                        *
                    </label>
                )}
            </div>

            <input type="text"
                className={cn(
                    `
                    rounded-[12px] 
                    py-3 px-4 
                    placeholder:text-neutral-300 text-neutral-700 
                    text-body-3 lg:text-body-2

                    `
                )}
                placeholder={placeholder}


            />
            
            <label className="text-body-4 text-[#D9534F]">
                { errorMessage }
            </label>
        </div>
    )
}