import {useState,useEffect} from 'react'
import { useNavigate,useParams } from 'react-router-dom'
const CreateReply = (props) => {
    const [reply, setReply] = useState('')
    const [sessionIsValid, setSessionIsValid] = useState(null)
    const navigate = useNavigate()
    const {id} = useParams()
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
        const res = await fetch(`http://localhost:3000/api/forums/thread/${id}`,{
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                text: reply
            })
        })
        const data = await res.json()
        if(data.success){
            navigate(`/forums/${id}`)
        }else{
            console.log(data)
            navigate(`/forums/${id}`)
        }
    }
    const handleReplyInput = (e) =>{
        setReply(e.target.value)
    }
    if(sessionIsValid === null){
        return (
          <p>Loading...</p>
        )
    }else if (sessionIsValid === true){
        return (
            <div>
                <input onChange={handleReplyInput} type={'text'} placeholder={'your reply'} value={reply}></input>
                <button onClick={handleSubmit}>Submit</button>
            </div>
          )
    }else if(sessionIsValid === false){
        return navigate('/login')
    }
}

export default CreateReply
