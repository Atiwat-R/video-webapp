import { useRouter } from "next/router"
import React from "react"

interface NavbarItemProps {
    label: string
    route?: string
    customClassName?: string
}

const NavbarItem: React.FC<NavbarItemProps> = ({ label , route , customClassName }) => {

    const router = useRouter()
    const defaultClassName = 'text-white cursor-pointer hover:text-gray-300 transition'

    return (
        <div id="navbar-item" data-testid="navbar-item" onClick={() => router.push(route || '/')} className={customClassName || defaultClassName}>
            {label}
        </div>
    )
}


export default NavbarItem