import Input from "@/components/input"
import axios from "axios"
import { useCallback, useState } from "react"
import { signIn } from "next-auth/react"
// import { useRouter } from "next/router"

import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'

const Auth = () => {

    // const router = useRouter()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [variant, setVariant] = useState('login') // value for switch between login & register

    const toggleVariant = useCallback(() => {
        let newVal = (currentVariant: any) => currentVariant == "login" ? "register" : "login"
        setVariant(newVal)
    }, [])

    // Sign in existing user
    const login = useCallback(async () => {
        await signIn('credentials', {
            email,
            password,
            // redirect: false,
            callbackUrl: '/profiles'
        }).then(() => {
            // router.push('/')
            console.log("Login Success")
        }).catch((error) => {
            console.log(error)
        })
    },[email, password])

    // Sign in using OAuth
    const OAuthLogin = (service: string) => {
        signIn(service, { callbackUrl: '/profiles' })
    }

    // Register new user
    const register = useCallback(async () => {
        await axios.post("/api/register", {
            name,
            email,
            password
        }).then(() => {
            login()
        }).catch((error) => {
            console.log(error)
        })
    },[name, email, password])

    return (
        <div className='flex justify-center'>
            <div className='bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full'>
                <h2 className='text-white text-4xl mb-8 font-semibold'>
                    {variant == 'login' ? 'Sign in' : 'Register'}
                </h2>
                <div className='flex flex-col gap-4'>
                    {variant == 'register' && (
                        <Input 
                            id="name"
                            onChange={(event: any) => setName(event.target.value)}
                            value={name}
                            label="Username"
                            type="name"
                        />
                    )}
                    <Input 
                        id="email"
                        onChange={(event: any) => setEmail(event.target.value)}
                        value={email}
                        label="Email"
                        type="email"
                    />
                    <Input 
                        id="password"
                        onChange={(event: any) => setPassword(event.target.value)}
                        value={password}
                        label="Password"
                        type="password"
                    />
                </div>
                <button onClick={variant == 'login' ? login : register} className='bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition active:bg-red-800'>
                    {variant == 'login' ? 'Login' : 'Sign up'}
                </button>
                <div className="flex flex-row items-center gap-4 mt-8 justify-center">
                    <div onClick={() => OAuthLogin('google')} className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition active:opacity-90">
                        <FcGoogle size={32}/>
                    </div>
                    <div onClick={() => OAuthLogin('github')} className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition active:opacity-90">
                        <FaGithub size={32}/>
                    </div>
                </div>
                <p className="text-neutral-500 mt-12 flex justify-center">
                    {variant == 'login' ? 'First time?' : 'Already have an account?'}
                    <span className="text-white ml-1 hover:underline cursor-pointer" onClick={toggleVariant}>
                        {variant == 'login' ? 'Create an account' : 'Sign in'}
                    </span>
                </p>
            </div>
        </div>
    )
}

export default Auth





    //  // Sign in existing user
    // const login = useCallback(async () => {
    //     try {
    //         await signIn('credentials', {
    //             email,
    //             password,
    //             redirect: false,
    //             callbackUrl: '/'
    //         })
    //         // Upon successful login, redirect
    //         router.push('/')
    //     } catch (error) {
    //         console.log(error)
    //     }
    // },[email, password])


    // // Register new user
    // const register = useCallback(async () => {
    //     try {
    //         await axios.post("/api/register", {
    //             name,
    //             email,
    //             password
    //         })
    //         login()
    //     } catch (error) {
    //         console.log(error)
    //     }
    // },[name, email, password])


