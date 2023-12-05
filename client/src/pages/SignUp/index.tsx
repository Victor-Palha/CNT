import { useState } from "react"
import { Link } from "react-router-dom"
import instance from "../../lib/axios"

export function SignUp(){
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPass, setConfirmPass] = useState('')

    async function signUp(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault()
        if(password !== confirmPass){
            alert('Password does not match')
            return
        }
        const res = await instance('/api/signup',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                username,
                email,
                password
            }
        })

        if(res.status === 201){
            alert('Sign Up Success')
            setPassword('')
            setConfirmPass('')
            setEmail('')
            setUsername('')
        }
        
    }
    return (
        <div className='flex h-screen justify-center items-center'>
        <form className='max-w-md flex flex-col gap-4' onSubmit={(e)=>signUp(e)}>
            <h1 className="
            text-4xl
            font-bold
            text-center
            text-blue-500
            transition
            hover:text-blue-700
            ">
            Cyber Net Cards
            </h1>
            <input 
                type="text" placeholder='Username' className='w-full px-1 py-2 rounded border-none' 
                value={username} 
                onChange={(e)=> setUsername(e.target.value)}
                required
            />
            <input 
                type="email" placeholder='Email' className='w-full px-1 py-2 rounded border-none' 
                value={email} 
                onChange={(e)=> setEmail(e.target.value)}
                required
            />
            <input 
                type="password" placeholder='Password' className='w-full px-1 py-2 rounded border-none'
                value={password} 
                onChange={(e)=> setPassword(e.target.value)}
                required
            />
            <input 
                type="password" placeholder='Confirm Password' className='w-full px-1 py-2 rounded border-none'
                value={confirmPass} 
                onChange={(e)=> setConfirmPass(e.target.value)}
                required
            />
            <Link to='/login' className='text-blue-500 hover:text-blue-700 text-center'>
                Already have an account? Login
            </Link>
            <button type="submit" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full transition'>
            Sign Up
            </button>
        </form>
      </div>
    )
}