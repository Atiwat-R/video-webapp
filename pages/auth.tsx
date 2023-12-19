import Input from "@/components/input"
import { useCallback, useState } from "react"

const Auth = () => {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [variant, setVariant] = useState('login') // value for switch between login & register

    const toggleVariant = useCallback(() => {
        let newVal = (currentVariant: any) => currentVariant == "login" ? "register" : "login"
        setVariant(newVal)
    }, [])

    return (
        <div className='flex justify-center'>
            <div className='bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full'>
                <h2 className='text-white text-4xl mb-8 font-semibold'>
                    {variant == 'login' ? 'Sign in' : 'Register'}
                </h2>
                <div className='flex flex-col gap-4'>
                    {variant == 'register' && (
                        <Input 
                            id="username"
                            onChange={(event: any) => setUsername(event.target.value)}
                            value={username}
                            label="Username"
                            type="username"
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
                <button className='bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition'>
                    {variant == 'login' ? 'Login' : 'Sign up'}
                </button>
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