import Navigation from '../components/Navigation'
import {useEffect, useState} from 'react'
import {Route, redirect,useNavigate} from 'react-router-dom'
const PrivateRoute = () => {
  const [sessionIsValid, setSessionIsValid] = useState(null)
  const navigate = useNavigate()
  useEffect(()=>{
    const verifySession = async () => {
      try{
        const res = await fetch('http://localhost:3000/api/auth/session', {
          method: 'GET',
          credentials: 'include',
      })
        const data = await res.json()
        setSessionIsValid(data.success)
      }catch(err){
        console.log(err)
        setSessionIsValid(false)
      }
    }
    verifySession()
    },[])
  if(sessionIsValid === null){
    return (
      <p>Loading...</p>
    )
  }else if (sessionIsValid === true){
    return (
      <>
        <Navigation/>
        <p>private route</p>
      </>
    )
  }else if(sessionIsValid === false){
    return navigate('/login')
  }
}

export default PrivateRoute
