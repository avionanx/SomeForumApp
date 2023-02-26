import {useState,useEffect} from 'react'
import Navigation from '../components/Navigation'
import { useNavigate } from 'react-router-dom'
import CSS from '../css/Register.module.css'
const Register = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
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
          setSessionIsValid(data.success )
        }catch(err){
          console.log(err)
          setSessionIsValid(false)
        }
      }
      verifySession()
      },[])

  const register = async () => {
    if (password !== confirm){
      return alert('Passwords do not match')
    }
      const res = await fetch('http://localhost:3000/api/auth/register', {
          method: 'POST',
          credentials: 'include',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              username,
              password
          })
      })
      const data = await res.json()
      if(data.success){
          navigate('/')
      }
  }
  const handleSubmit = (e) => {
      e.preventDefault()
  }
  const handleUsernameInput = (e) =>{
      setUsername(e.target.value)
  }
  const handlePasswordInput = (e) =>{
      setPassword(e.target.value)
  }
  const handleConfirmInput = (e) =>{
      setConfirm(e.target.value)
}
  if(sessionIsValid === null){
    return (
      <p>Loading...</p>
    )
  }else if (sessionIsValid === true){
    return navigate('/')
  }else if(sessionIsValid === false){
  return (
    <>
      <Navigation/>
      <div className={CSS.main_ctn}>
        <div className={CSS.register_form}>
          <input onChange={handleUsernameInput} type={'text'} placeholder={'your username'} value={username}></input>
          <input onChange={handlePasswordInput} type={'password'} placeholder={'your password'} value={password}></input>
          <input onChange={handleConfirmInput} type={'password'} placeholder={'confirm your password'} value={confirm}></input>
          <button onClick={register}>Register</button>
        </div>
      </div>
    </>
  )
  }
}

export default Register
