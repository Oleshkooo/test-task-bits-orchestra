import { cn } from 'utils/cn'

import { TableItem } from './TableItem'

interface TableProps extends React.HTMLAttributes<HTMLDivElement> {
    books: Book[]
}

export const Table: React.FC<TableProps> = ({ className, books }) => {
    return (
        <div className={cn('relative overflow-x-auto', className)}>
            <table className="w-full text-left text-sm">
                <thead className="bg-slate-100 text-xs uppercase">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Book title
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Author name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Category
                        </th>
                        <th scope="col" className="px-6 py-3">
                            ISBN
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Created At
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Modified At
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {books?.map(book => (
                        <TableItem key={book.id} book={book} />
                    ))}
                </tbody>
            </table>
        </div>
    )
}
