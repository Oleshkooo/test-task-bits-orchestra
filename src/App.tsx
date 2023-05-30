import { Toaster } from 'react-hot-toast'
import { Route, Routes } from 'react-router-dom'

import { Footer } from 'components/Footer'
import { TailwindIndicator } from 'components/TailwindIndicator'
import { Book } from 'pages/Book/Book'
import { Dashboard } from 'pages/Dashboard/Dashboard'

const App: React.FC = () => {
    return (
        <div className="flex min-h-screen flex-col justify-between bg-white">
            <Toaster />
            <div className="container">
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/book" element={<Book />} />
                </Routes>
            </div>
            <Footer name="Oleshkooo" link="https://github.com/Oleshkooo" />
            <TailwindIndicator />
        </div>
    )
}

export default App
