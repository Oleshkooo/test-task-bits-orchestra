import { Github } from 'lucide-react'

interface FooterProps {
    name: string
    link: string
}

export const Footer: React.FC<FooterProps> = ({ name, link }) => {
    return (
        <footer className="flex justify-center bg-slate-100 py-3 text-slate-500">
            <a href={link} target="_blank" className="flex cursor-pointer justify-center gap-2">
                <Github />
                {name}
            </a>
        </footer>
    )
}
