import { forwardRef, memo } from 'react'

import { cn } from 'utils/cn'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    value?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const Input = memo(
    forwardRef<HTMLInputElement, InputProps>(({ value, onChange, className, ...props }, ref) => {
        return (
            <input
                ref={ref}
                value={value}
                onChange={onChange}
                className={cn(
                    'flex h-10 rounded-md border border-slate-300 bg-transparent px-3 py-2 text-sm transition-all duration-300 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
                    className,
                )}
                {...props}
            />
        )
    }),
)
Input.displayName = 'Input'

//

interface InputErrorProps extends React.HTMLAttributes<HTMLSpanElement> {
    condition: boolean
}

export const InputError: React.FC<InputErrorProps> = memo(
    ({ className, condition, children, ...props }) => {
        if (!condition) return null

        return (
            <span className={cn('text-sm text-red-500', className)} {...props}>
                {children}
            </span>
        )
    },
)
