import { createContext, memo, useContext, useEffect, useState } from 'react'

interface BooksContextType {
    books: Book[]
    setBooks: React.Dispatch<React.SetStateAction<Book[]>>
}
interface BooksContextProviderProps {
    children?: React.ReactNode
}
type UseBooksContext = () => BooksContextType

const BooksContext = createContext<BooksContextType>(null as unknown as BooksContextType)

export const BooksContextProvider: React.FC<BooksContextProviderProps> = memo(({ children }) => {
    const [books, setBooks] = useState<Book[]>([] as Book[])

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const fetchRes = await fetch('http://localhost:3001/books?_sort=id&_order=desc')
                const res = (await fetchRes.json()) as Book[]
                setBooks(res?.reverse())
            } catch (error) {
                console.error(error)
            }
        }
        void fetchBooks()
    }, [])

    return <BooksContext.Provider value={{ books, setBooks }}>{children}</BooksContext.Provider>
})
BooksContextProvider.displayName = 'BooksContextProvider'

export const useBooksContext: UseBooksContext = () => {
    const context = useContext<BooksContextType>(BooksContext)

    if (context == null)
        throw new Error('useBooks context must be used within a BooksContext Provider')

    return context
}
