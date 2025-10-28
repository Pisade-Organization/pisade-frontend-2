import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"
import React from "react"
import Typography from "./Typography"

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
            leftIcon?: React.ReactNode
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
    leftIcon,
    ...props
}: BaseInputProps) {
    return (
        <div className=" w-full flex flex-col gap-1">
            
            <div className="w-full flex justify-start items-center gap-1">
                <Typography variant={{ base: "label-3", lg: "label-2" }} color="neutral-800">
                    { title }
                </Typography>

                { required && (
                    <Typography variant={{ base: "label-3", lg: "label-2" }} className="text-[#D9534F]">
                        *
                    </Typography>
                )}
            </div>

            <div className={cn(
                    `
                    inline-flex gap-[10px]
                    w-full
                    rounded-[12px]
                    py-3 px-4
                    border border-neutral-50
                    `
                )}
            >
                { leftIcon }

                <input type="text"
                    className={cn(
                        `
                        w-full
                        outline-none
                        placeholder:text-neutral-300 text-neutral-700 
                        text-body-3
                        `
                    )}
                    placeholder={placeholder}
                    {...props}


                />


            </div>


            <Typography variant="body-4" className="text-[#D9534F]">
                { errorMessage }
            </Typography>
        </div>
    )
}