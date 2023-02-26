import {useState,useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import Navigation from '../components/Navigation'
import CSS from '../css/Login.module.css'
const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
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

    const login = async () => {
        const res = await fetch('http://localhost:3000/api/auth/login', {
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
                    <div className={CSS.login_form}>
                        <input onChange={handleUsernameInput} type={'text'} placeholder={'your username'} value={username}></input>
                        <input onChange={handlePasswordInput} type={'password'} placeholder={'your password'} value={password}></input>
                        <button onClick={login}>Login</button>
                    </div>
                </div>
            </>
          )
      }

}

export default Login
