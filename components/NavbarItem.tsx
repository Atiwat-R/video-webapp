import { useRouter } from "next/router"
import React from "react"

interface NavbarItemProps {
    label: string
    route?: string
}

const NavbarItem: React.FC<NavbarItemProps> = ({ label , route }) => {

    const router = useRouter()

    return (
        <div onClick={() => router.push(route || '/')} className='text-white cursor-pointer hover:text-gray-300 transition'>
            {label}
        </div>
    )
}


export default NavbarItem