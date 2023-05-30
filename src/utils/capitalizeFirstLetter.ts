type CapitalizeFirstLetter = (str: string) => string

export const capitalizeFirstLetter: CapitalizeFirstLetter = str =>
    str.charAt(0).toUpperCase() + str.slice(1)
