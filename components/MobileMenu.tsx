import React from "react"
import NavbarItem from "./NavbarItem"

interface MobileMenuItemProps {
    visible?: boolean
}

const MobileMenu: React.FC<MobileMenuItemProps> = ({ visible }) => {

    if (!visible) return null
    const itemClassName = 'px-3 text-center text-white hover:underline'

    return (
        <div id="mobile-menu" data-testid="mobile-menu" className='bg-black w-56 absolute top-8 left-0 py-5 flex-col border-2 border-gray-500 flex'>
            <div className='flex flex-col gap-4'>
                    <NavbarItem label='Home' customClassName={itemClassName} />
                    <NavbarItem label='About' customClassName={itemClassName} />
                    <NavbarItem label='Profile' customClassName={itemClassName} />
                    <NavbarItem label='Option' customClassName={itemClassName} />
                    <NavbarItem label='Upload' customClassName={itemClassName} route='/upload' /> 
            </div>
        </div>
    )
}

export default MobileMenu
