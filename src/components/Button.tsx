import { cva, type VariantProps } from 'class-variance-authority'
import { forwardRef, memo } from 'react'
import { Link } from 'react-router-dom'

import { cn } from 'utils/cn'

const buttonVariants = cva(
    'inline-flex items-center justify-center rounded-md text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none data-[state=open]:bg-slate-100',
    {
        variants: {
            variant: {
                default: 'bg-slate-900 text-white hover:bg-slate-700',
                destructive: 'bg-red-500 text-white hover:bg-red-600',
                outline: 'bg-transparent border border-slate-200 hover:bg-slate-100',
                subtle: 'bg-slate-100 text-slate-900 hover:bg-slate-200',
                ghost: 'bg-transparent hover:bg-slate-100 data-[state=open]:bg-transparent',
                link: 'bg-transparent underline-offset-4 hover:underline text-slate-900 hover:bg-transparent',
            },
            size: {
                default: 'h-10 py-2 px-4',
                sm: 'h-9 px-2',
                lg: 'h-11 px-8',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    },
)

interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    to?: (typeof Link)['prototype']['props']['to']
    state?: (typeof Link)['prototype']['props']['state']
}

export const Button = memo(
    forwardRef<HTMLButtonElement, ButtonProps>(
        ({ className, children, to, state, variant, size, ...props }, ref) => {
            if (to !== undefined) {
                return (
                    <Link
                        to={to}
                        state={state}
                        className={cn(buttonVariants({ variant, size, className }))}
                    >
                        {children}
                    </Link>
                )
            }
            return (
                <button
                    ref={ref}
                    className={cn(buttonVariants({ variant, size, className }))}
                    {...props}
                >
                    {children}
                </button>
            )
        },
    ),
)
Button.displayName = 'Button'
