declare interface Book {
    id: number
    isbn: number
    title: string
    author: string
    category: string
    status: 'active' | 'deactivated'
    createdAt: string
    modifiedAt: string
}
