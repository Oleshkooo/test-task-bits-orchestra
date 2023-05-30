import { ChevronLeft } from 'lucide-react'
import moment from 'moment'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useLocation, useNavigate } from 'react-router-dom'

import { Button } from 'components/Button'
import { Input, InputError } from 'components/Input'
import { Select } from 'components/Select'
import { bookCategories } from 'config/books'
import { useBooksContext } from 'context/BooksContext'
import { useInput } from 'hooks/use-input'

export const Book: React.FC = () => {
    const location = useLocation()
    const navigate = useNavigate()

    const { setBooks } = useBooksContext()

    const isEdit = location.state != null
    const actionString = isEdit ? 'Edit' : 'Add'

    const [selected, setSelected] = useState('')

    const {
        value: title,
        error: titleError,
        bind: bindTitle,
        reset: resetTitle,
    } = useInput(location.state?.book?.title ?? '', value => {
        if (value.length === 0) {
            return 'Title cannot be empty!'
        }
        if (value.length > 50) {
            return 'Title cannot be longer than 50 characters!'
        }
        if (value.length < 3) {
            return 'Title cannot be shorter than 3 characters!'
        }
        return ''
    })
    const {
        value: author,
        error: authorError,
        bind: bindAuthor,
        reset: resetAuthor,
    } = useInput(location.state?.book?.author ?? '', value => {
        if (value.length === 0) {
            return 'Author cannot be empty!'
        }
        if (value.length > 50) {
            return 'Author cannot be longer than 50 characters!'
        }
        if (value.length < 3) {
            return 'Author cannot be shorter than 3 characters!'
        }
        return ''
    })
    const {
        value: isbn,
        error: isbnError,
        bind: bindIsbn,
        reset: resetIsbn,
    } = useInput(location.state?.book?.isbn ?? '', value => {
        if (value.length === 0) {
            return 'ISBN cannot be empty!'
        }
        if (value.length > 50) {
            return 'ISBN cannot be longer than 50 characters!'
        }
        if (value.length < 3) {
            return 'ISBN cannot be shorter than 3 characters!'
        }
        if (isNaN(Number(value))) {
            return 'ISBN must be a number!'
        }
        return ''
    })

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            if (titleError.length !== 0 || authorError.length !== 0 || isbnError.length !== 0) {
                toast.error('Invalid inputs!')
                return
            }
            if (selected.length === 0) {
                toast.error('Select category!')
                return
            }

            const book: Omit<Book, 'id'> & {
                id?: number
            } = {
                isbn: Number(isbn) ?? 0,
                title,
                author,
                category: selected,
                status: location.state?.book?.status ?? 'active',
                createdAt: moment().toJSON(),
                modifiedAt: '',
                ...(isEdit && {
                    id: location.state.book.id,
                    modifiedAt: moment().toJSON(),
                }),
            }

            const resPromise = await (async () => {
                if (isEdit) {
                    return await fetch(
                        `http://localhost:3001/books/${String(location.state.book.id)}`,
                        {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(book),
                        },
                    )
                }
                return await fetch('http://localhost:3001/books', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(book),
                })
            })()

            if (!resPromise.ok) {
                toast.error('Something went wrong!')
                return
            }

            const res = await resPromise.json()

            setBooks(prev => {
                if (isEdit) {
                    return prev.map(b => {
                        if (b.id === location?.state?.book?.id) {
                            return res
                        }
                        return b
                    })
                }
                return [res, ...prev]
            })

            resetTitle()
            resetAuthor()
            resetIsbn()
            setSelected('')

            toast.success(`${actionString}ed book!`)

            navigate('/')
        } catch (error) {
            toast.error('Something went wrong!')
            console.error(error)
        }
    }

    return (
        <div className="mt-5 flex min-h-[90vh] items-center justify-center py-5">
            <div className="absolute left-5 top-5">
                <Button to="/" variant="ghost">
                    <ChevronLeft />
                    Back
                </Button>
            </div>
            <div className="w-[450px] rounded-lg bg-gray-50 p-9 transition-all duration-300 hover:shadow-md">
                <h1 className="text-center text-2xl font-bold text-slate-900 sm:text-3xl md:text-4xl">
                    {actionString} Book
                </h1>
                <form onSubmit={handleSubmit} className="mt-3 flex flex-col gap-5">
                    <div className="flex flex-col">
                        <label htmlFor="title" className="mb-1 text-slate-600">
                            Title
                        </label>
                        <Input type="text" id="title" placeholder="Title" required {...bindTitle} />
                        <InputError condition={titleError.length !== 0} className="mt-1">
                            {titleError}
                        </InputError>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="author" className="mb-1 text-slate-600">
                            Author
                        </label>
                        <Input
                            type="text"
                            id="author"
                            placeholder="Author"
                            required
                            {...bindAuthor}
                        />
                        <InputError condition={authorError.length !== 0} className="mt-1">
                            {authorError}
                        </InputError>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="isbn" className="mb-1 text-slate-600">
                            International Standard Book Number
                        </label>
                        <Input type="text" id="isbn" placeholder="ISBN" required {...bindIsbn} />
                        <InputError condition={isbnError.length !== 0} className="mt-1">
                            {isbnError}
                        </InputError>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="category" className="mb-1 text-slate-600">
                            Category
                        </label>
                        <Select
                            options={bookCategories}
                            selected={selected}
                            setSelected={setSelected}
                        >
                            Category
                        </Select>
                    </div>
                    <Button type="submit">{actionString} book</Button>
                </form>
            </div>
        </div>
    )
}
