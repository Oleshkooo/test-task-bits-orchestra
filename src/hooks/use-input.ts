import { useCallback, useState } from 'react'

type UseInput = (
    initialValue: string,
    validation?: (value: ReturnType<UseInput>['value']) => ReturnType<UseInput>['error'],
) => {
    value: string
    setValue: React.Dispatch<React.SetStateAction<string>>
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    reset: () => void
    error: string
    bind: {
        value: ReturnType<UseInput>['value']
        onChange: ReturnType<UseInput>['onChange']
    }
}

export const useInput: UseInput = (initialValue, validation) => {
    const [value, setValue] = useState(initialValue)
    const [error, setError] = useState('')

    const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value
        setValue(inputValue)
    }, [])

    const onBlur = useCallback(
        (e: React.FocusEvent<HTMLInputElement>) => {
            const inputValue = e.target.value

            if (validation != null) {
                const validationError = validation(inputValue)
                setError(validationError)
            }
        },
        [validation],
    )

    const reset = useCallback(() => {
        setValue(initialValue)
        setError('')
    }, [initialValue])

    return {
        value,
        setValue,
        onChange,
        onBlur,
        reset,
        error,
        bind: {
            value,
            onChange,
            onBlur,
        },
    } as const
}
