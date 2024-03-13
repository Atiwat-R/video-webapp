import { useCallback, useEffect, useState } from "react"
import { BsChevronDown, BsSearch, BsBell } from "react-icons/bs"
import MobileMenu from "./MobileMenu"
import NavbarItem from "./NavbarItem"
import AccountMenu from "./AccountMenu"

const TOP_OFFSET = 66

const Navbar = () => {

    const [showMobileMenu, setShowMobileMenu] = useState(false)
    const [showAccountMenu, setShowAccountMenu] = useState(false)
    const [showBackground, setShowBackground] = useState(false)

    const toggleMobileMenu = useCallback(() => {
        setShowMobileMenu((current) => !current)
    }, [])
    const toggleShowAccountMenu = useCallback(() => {
        setShowAccountMenu((current) => !current)
    }, [])

    useEffect(() => {
        const handleScroll = () => {

            if (window.scrollY >= TOP_OFFSET) { // window.scrollY is position on the web page, not scroll speed
                setShowBackground(true)
            } else {
                setShowBackground(false)
            }
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])


    return (
        <nav id="navbar" data-testid="navbar" className='w-full fixed z-40'>
            <div className={`px-4 md:px-16 py-6 flex flex-row items-center transition duration-500 ${showBackground ? "bg-zinc-900 bg-opacity-90" : ""}`}>
                <div id='desktop-menu' className='flex-row ml-8 gap-7 hidden lg:flex'>
                    <NavbarItem label='Home' />
                    <NavbarItem label='About' />
                    <NavbarItem label='Profile' route='/test'/>
                    <NavbarItem label='Option' />
                    <NavbarItem label='Upload' route='/upload' /> 
                </div>
                <div onClick={toggleMobileMenu} className='lg:hidden flex-row items-center gap-2 ml-8 cursor-pointer relative'>
                    <p className='text-white text-sm'>Browse </p>
                    <BsChevronDown className={`w-4 text-white fill-white transition ${showMobileMenu ? 'rotate-180' : 'rotate-0'}`} /> {/** Use backticks ` instead of quotation marks ' or " */}
                    <MobileMenu visible={showMobileMenu} />
                </div>
                <div onClick={toggleShowAccountMenu} id="account-menu-button" data-testid="account-menu-button" className='flex flex-row ml-auto gap-7 items-center '>
                    <div className='text-gray-200 hover:text-gray-300 cursor-pointer transition'>
                        <BsSearch />
                    </div>
                    <div className='text-gray-200 hover:text-gray-300 cursor-pointer transition'>
                        <BsBell />
                    </div>
                    <div className='flex flex-row items-center gap-2 cursor-pointer relative'>
                        <div className='w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden'>
                            <img src='/images/default-green.png' alt=''/>
                        </div> 
                        <BsChevronDown className={`text-white transition ${showAccountMenu ? 'rotate-180' : 'rotate-0'}`} /> {/** Use backticks ` instead of quotation marks ' or " */}
                        <AccountMenu visible={showAccountMenu}/>
                    </div>
                </div>
            </div>
        </nav>
    )
}




export default Navbar

/*


                // No longer show background after NAVBAR_SHOW_TIMEOUT
                const NAVBAR_SHOW_TIMEOUT = 5000 // miliseconds (1000 ms = 1 sec)
                setTimeout(() => {
                    if (window.scrollY < TOP_OFFSET) setShowBackground(false);
                }, NAVBAR_SHOW_TIMEOUT)


*/