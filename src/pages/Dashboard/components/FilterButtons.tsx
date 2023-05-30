import { memo, useCallback, useMemo } from 'react'

import { Button } from 'components/Button'

interface FilterButtonsProps {
    active: FilterButtonType
    setActive: React.Dispatch<React.SetStateAction<FilterButtonType>>
}

export type FilterButtonType = 'all' | 'active' | 'deactivated'

interface Btn {
    text: string
    type: FilterButtonType
}

const buttons: Btn[] = [
    {
        text: 'Show All',
        type: 'all',
    },
    {
        text: 'Show Active',
        type: 'active',
    },
    {
        text: 'Show Deactivated',
        type: 'deactivated',
    },
]

export const FilterButtons: React.FC<FilterButtonsProps> = memo(({ active, setActive }) => {
    const handleClick = useCallback(
        (filter: FilterButtonType) => {
            setActive(filter)
        },
        [setActive],
    )

    const buttonElements = useMemo(
        () =>
            buttons.map(btn => (
                <Button
                    key={btn.type}
                    variant={active === btn.type ? 'default' : 'outline'}
                    onClick={() => {
                        handleClick(btn.type)
                    }}
                >
                    {btn.text}
                </Button>
            )),
        [active, handleClick],
    )

    return <div className="flex flex-wrap gap-3">{buttonElements}</div>
})
