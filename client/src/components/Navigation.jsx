import { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import CSS from '../css/Navigation.module.css'
const Navigation = () => {
    const [user, setUser] = useState(null)
    useEffect(()=>{
        const fetchUser = async () => {
            try{
                const res = await fetch('http://localhost:3000/api/users/me', {
                    method: 'GET',
                    credentials: 'include',
                })
                const data = await res.json()
                setUser(data.user)
            }catch(err){
                console.log(err)
            }
        }
        fetchUser()
    },[])
  return (
    <nav>
        <ul>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/forums">Forums</Link>
            </li>
        </ul>
        <ul>
            {user?(<li><Link to="/profile">{user}</Link></li>):(<li><Link to="/register">Register</Link></li>)}
            {user?(<li><Link to="/logout">Logout</Link></li>):(<li><Link to="/login">Login</Link></li>)}
        </ul>
    </nav>
  )
}

export default Navigation
