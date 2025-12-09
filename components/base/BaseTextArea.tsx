import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"
import React from "react"
import Typography from "./Typography"

const textAreaVariants = cva(
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

export interface BaseTextAreaProps 
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
        VariantProps<typeof textAreaVariants> {
            title?: string
            placeholder?: string
            className?: string
            errorMessage?: string
            required?: boolean
            rows?: number
        }

export default function BaseTextArea({
    title, 
    placeholder,
    className,
    state = "default",
    required = false,
    errorMessage,
    disabled,
    readOnly,
    rows = 4,
    ...props
}: BaseTextAreaProps) {
    return (
        <div className=" w-full flex flex-col gap-1">
            
            <div className="w-full flex justify-start items-center gap-1">
                <Typography variant={{ base: "label-3", lg: "label-2" }} color="neutral-800">
                    { title }
                </Typography>

                { required && (
                    <Typography variant={{ base: "label-3", lg: "label-2" }} color="[#D9534F]">
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
                    `,
                    readOnly && "bg-neutral-50"
                )}
            >
                <textarea
                    className={cn(
                        `
                        w-full
                        outline-none
                        placeholder:text-neutral-300 text-neutral-700 
                        text-body-3
                        resize-none
                        `,
                        readOnly && "bg-neutral-50"
                    )}
                    placeholder={placeholder}
                    readOnly={readOnly}
                    disabled={disabled}
                    rows={rows}
                    {...props}
                />
            </div>

            <Typography variant="body-4" color="[#D9534F]">
                { errorMessage }
            </Typography>
        </div>
    )
}

