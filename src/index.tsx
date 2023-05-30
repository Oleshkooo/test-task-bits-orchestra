import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import { BooksContextProvider } from 'context/BooksContext'

import 'styles/index.css'
import App from './App'

const container = document.getElementById('root') as HTMLElement
const root = createRoot(container)

root.render(
    <StrictMode>
        <BrowserRouter>
            <BooksContextProvider>
                <App />
            </BooksContextProvider>
        </BrowserRouter>
    </StrictMode>,
)
