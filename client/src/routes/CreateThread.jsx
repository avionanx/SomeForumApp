import Navigation from '../components/Navigation'
import {useEffect, useState} from 'react'
import {Route, redirect,useNavigate} from 'react-router-dom'
import CSS from '../css/CreateThread.module.css'
const CreateThread = () => {
  const [sessionIsValid, setSessionIsValid] = useState(null)
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
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
  const handleSubmit = async (e) => {
    e.preventDefault()
    try{
      const res = await fetch('http://localhost:3000/api/forums/', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: title,
          text: body
        })
      })
      const data = await res.json()
      if(data.success){
        navigate('/forums/'+data.threadId)
      }
    }catch(err){
      console.log(err)
    }
  }
  const handleTitleChange = (e) => {
    setTitle(e.target.value)
  }
  const handleBodyChange = (e) => {
    setBody(e.target.value)
  }
  if(sessionIsValid === null){
    return (
      <p>Loading...</p>
    )
  }else if (sessionIsValid === true){
    return (
      <>
        <Navigation/>
        <div className={CSS.main_ctn}>
            <div className={CSS.form_ctn}>
                <input value={title} onChange={handleTitleChange} type={'text'} placeholder={'Title'}></input>
                <input value={body} onChange={handleBodyChange} type={'text'} placeholder={'Body'}></input>
                <button onClick={handleSubmit}>Submit</button>
            </div>
        </div>
      </>
    )
  }else if(sessionIsValid === false){
    return navigate('/login')
  }
}
export default CreateThread