import { ChevronDown } from 'lucide-react'
import { useState, type HTMLAttributes } from 'react'

import { capitalizeFirstLetter } from 'utils/capitalizeFirstLetter'

import { cn } from 'utils/cn'

interface SelectProps extends HTMLAttributes<HTMLDivElement> {
    selected: string
    setSelected: React.Dispatch<React.SetStateAction<string>>
    options: string[]
}

export const Select: React.FC<SelectProps> = ({
    className,
    selected,
    setSelected,
    options,
    children,
}) => {
    const [isOpen, setIsOpen] = useState(false)

    const handleOpen = () => {
        setIsOpen(prev => !prev)
    }

    const handleSelect = (option: SelectProps['selected']) => {
        setSelected(option)
        setIsOpen(false)
    }

    return (
        <div className={cn('relative', className)}>
            <div
                onClick={handleOpen}
                className={cn(
                    'flex w-full items-center justify-between rounded-md border border-slate-300 bg-transparent p-2',
                    selected.length === 0 && 'text-slate-400',
                )}
            >
                {selected.length === 0 ? children : capitalizeFirstLetter(selected)}
                <ChevronDown
                    className={cn('transition-all duration-200', isOpen && 'rotate-180 transform')}
                />
            </div>
            <ul
                className={cn(
                    'absolute mt-1 max-h-0 w-full overflow-y-auto rounded border-0 bg-white font-normal transition-all duration-300',
                    isOpen && 'max-h-40 border border-slate-300',
                )}
            >
                {options?.map(option => {
                    return (
                        <li
                            key={option}
                            onClick={() => {
                                handleSelect(option)
                            }}
                            className="rounded p-2 transition-all duration-200 hover:bg-slate-50"
                        >
                            {option}
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
