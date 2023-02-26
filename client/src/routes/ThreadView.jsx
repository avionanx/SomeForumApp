import { useEffect,useState } from "react"
import Navigation from "../components/Navigation"
import { useParams } from "react-router-dom"
import CreateReplyButton from "../components/CreateReplyButton"
const ThreadView = (props) => {
    const {id} = useParams()
    const [thread, setThread] = useState(null)
    const [replies, setReplies] = useState(null)
    const [sessionIsValid, setSessionIsValid] = useState(null)
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
    useEffect(()=>{
        const getThread = async () => {
            const res = await fetch(`http://localhost:3000/api/forums/thread/${id}`, {
                method: 'GET',
                credentials: 'include',
            })
            const data = await res.json()
            setThread(data)
            const dataReplies = data.replies.map((reply) => {
                return (
                    <div key={reply._id}>
                        <p>{reply.text}</p>
                        <p>{reply.author}</p>
                    </div>
                )
            })
            setReplies(dataReplies)
        }
        getThread()
    },[])

  return (
    <>
    <Navigation/>
    {thread?(
        <div>
            {sessionIsValid&&(<CreateReplyButton/>)}
            <h1>{thread.thread.title}</h1>
            <p>{thread.thread.text}</p>
            <p>{thread.thread.author}</p>
            {replies}
        </div>
    ):(
        <div>
            <h1>Loading...</h1>
        </div>
    )}
    
    </>
  )
}

export default ThreadView
