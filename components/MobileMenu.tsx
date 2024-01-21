import { useRouter } from "next/router"
import React from "react"

interface MobileMenuItemProps {
    visible?: boolean
}

const MobileMenu: React.FC<MobileMenuItemProps> = ({ visible }) => {

    const router = useRouter()

    if (!visible) return null

    return (
        <div className='bg-black w-56 absolute top-8 left-0 py-5 flex-col border-2 border-gray-500 flex'>
            <div className='flex flex-col gap-4'>

                <div className='px-3 text-center text-white hover:underline'>
                    Home
                </div>
                <div className='px-3 text-center text-white hover:underline'>
                    About
                </div>
                <div className='px-3 text-center text-white hover:underline'>
                    Profile
                </div>
                <div className='px-3 text-center text-white hover:underline'>
                    Option
                </div>
                <div onClick={() => router.push('/upload')} className='px-3 text-center text-white hover:underline'>
                    Upload
                </div>

                {/* TODO: Make MobileMenuItem */}

            </div>
        </div>
    )
}


export default MobileMenu