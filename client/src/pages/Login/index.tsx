import { useContext, useState } from 'react'
import instance from '../../lib/axios'
import { Link, Navigate } from 'react-router-dom'
import { authContext } from '../../context/authContext'

export function Login() {
  const {isAuth, setIsAuth, SavePlayerInformation} = useContext(authContext)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  async function login(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault()
    instance.post("/api/login", {
      email: username,
      password
    }).then(res => {
      // console.log(res.status)
      if(res.status === 201){
        localStorage.setItem('@token:cnt', res.data.token)
        SavePlayerInformation(res.data.player)
        setIsAuth(true)
      }
    }).catch(err => {
      alert(err.response.data.message)
    })
  }

  return (
    <div className='flex h-screen justify-center items-center'>
      {isAuth && (
        <Navigate to='/'/>
      )}
      <form className='max-w-md flex flex-col gap-4 text-white' onSubmit={(e)=>login(e)}>
        <h1 className="
          text-xl
          font-bold
          text-center
          text-blue-500
          transition
          hover:text-blue-700
          cyberpunk-font-og
          cyber-glitch-0
        ">
          Cyber-Net-Cards
        </h1>
        <div className='cyber-input'>
          <input type="text" placeholder='Email' className='w-full px-1 py-2  border-none' 
            value={username} 
            onChange={(e)=> setUsername(e.target.value)}
          />
        </div>
        <div className='cyber-input'>
          <input type="password" placeholder='Password' className='w-full px-1 py-2  border-none'
            value={password} 
            onChange={(e)=> setPassword(e.target.value)}
          />
        </div>
        <Link to='/signup' className='text-blue-500 hover:text-blue-700 text-center'>
            Don't have an account? Sign up
        </Link>
        <button type="submit" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full transition'>
          Login
        </button>
      </form>
    </div>
  )
}
