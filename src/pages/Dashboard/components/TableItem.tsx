import moment from 'moment'
import { toast } from 'react-hot-toast'

import { Button } from 'components/Button'
import { useBooksContext } from 'context/BooksContext'
import { cn } from 'utils/cn'

interface TableItemProps {
    book: Book
}

export const TableItem: React.FC<TableItemProps> = ({ book }) => {
    const { setBooks } = useBooksContext()

    const createdAt = moment(book.createdAt).local().format('DD MMMM YYYY, h:mmA')
    const modifiedAt =
        book.modifiedAt === ''
            ? '--'
            : moment(book.modifiedAt).local().format('DD MMMM YYYY, h:mmA')
    const deactivatedClassName = book.status === 'deactivated' ? 'opacity-40' : ''

    const handleStatus = async () => {
        try {
            const fetchRes = await fetch(`http://localhost:3001/books/${String(book.id)}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    status: book.status === 'active' ? 'deactivated' : 'active',
                    modifiedAt: moment().toJSON(),
                }),
            })
            const res = (await fetchRes.json()) as Book

            setBooks(prev => prev.map(book => (book.id === res.id ? res : book)))
            toast.success('Book status changed')
        } catch (error) {
            toast.error('Something went wrong')
            console.error(error)
        }
    }

    const handleDelete = async () => {
        try {
            await fetch(`http://localhost:3001/books/${String(book.id)}`, {
                method: 'DELETE',
            })

            setBooks(prev => prev.filter(b => b.id !== book.id))
            toast.success('Book deleted')
        } catch (error) {
            toast.error('Something went wrong')
            console.error(error)
        }
    }

    return (
        <tr key={book.id} className="border-b bg-white">
            <th
                scope="row"
                className={cn(
                    'whitespace-nowrap px-6 py-4 font-medium transition-all duration-300',
                    deactivatedClassName,
                )}
            >
                {book.title}
            </th>
            <td className={cn('px-6 py-4 transition-all duration-300', deactivatedClassName)}>
                {book.author}
            </td>
            <td className={cn('px-6 py-4 transition-all duration-300', deactivatedClassName)}>
                {book.category}
            </td>
            <td className={cn('px-6 py-4 transition-all duration-300', deactivatedClassName)}>
                {book.isbn}
            </td>
            <td className={cn('px-6 py-4 transition-all duration-300', deactivatedClassName)}>
                {createdAt}
            </td>
            <td className={cn('px-6 py-4 transition-all duration-300', deactivatedClassName)}>
                {modifiedAt}
            </td>
            <td className="flex items-center gap-2 px-6 py-4">
                <Button
                    to={'/book'}
                    state={{ book }}
                    size="sm"
                    variant="ghost"
                    className="text-slate-600 hover:text-slate-900"
                >
                    Edit
                </Button>
                <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleStatus}
                    className="text-slate-600 hover:text-slate-900"
                >
                    {book.status === 'active' ? 'Deactivate' : 'Activate'}
                </Button>
                <Button
                    size="sm"
                    variant="ghost"
                    disabled={book.status === 'active'}
                    onClick={handleDelete}
                    className="text-slate-600 hover:text-slate-900"
                >
                    Delete
                </Button>
            </td>
        </tr>
    )
}
