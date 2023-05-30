import { useEffect, useState } from 'react'

import { Button } from 'components/Button'
import { useBooksContext } from 'context/BooksContext'

import { FilterButtons, type FilterButtonType } from './components/FilterButtons'
import { Table } from './components/Table'

export const Dashboard: React.FC = () => {
    const { books } = useBooksContext()

    const [filteredBooks, setFilteredBooks] = useState([] as Book[])
    const [activeButton, setActiveButton] = useState<FilterButtonType>('active')

    useEffect(() => {
        const filtered =
            activeButton === 'all' ? books : books.filter(book => book.status === activeButton)
        setFilteredBooks(filtered)
    }, [activeButton, books])

    return (
        <div className="py-5">
            <div className="flex flex-wrap justify-between gap-5 pt-3">
                <div className="flex flex-wrap gap-5">
                    <FilterButtons active={activeButton} setActive={setActiveButton} />
                    <span className="inline-flex h-10 items-center justify-center rounded-md bg-slate-100 px-4 py-2 text-sm">
                        Showing {filteredBooks.length} from {books.length}
                    </span>
                </div>
                <Button to="/book" variant="ghost">
                    Add Book
                </Button>
            </div>
            <Table books={filteredBooks} className="mt-8" />
        </div>
    )
}
