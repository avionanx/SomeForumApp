import { useState,useEffect } from "react"
import Navigation from "../components/Navigation"
import Thread from "../components/Thread"
import CSS from '../css/Forums.module.css'
import { useSearchParams,useNavigate } from "react-router-dom"
import ForumPagination from "../components/ForumPagination"
import CreateThreadButton from "../components/CreateThreadButton"
const Forums = () => {
  const [sessionIsValid, setSessionIsValid] = useState(null)
  const [forums, setForums] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchParams] = useSearchParams()
  const [page, setPage] = useState(getPage())
  const [maxPage, setMaxPage] = useState(1)
  const navigate = useNavigate()

  function getPage() {
    if (searchParams.get('page')) {
      return searchParams.get('page')
    } else {
      return 1
    }
  }
  function changePage(page) {
    console.log('clicked');
    navigate('/forums?page='+page)
  }
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
  useEffect(() => {
    setPage(getPage())
  },[searchParams])
  useEffect(() => {
    const getForums = async () => {
      const res = await fetch('http://localhost:3000/api/forums?page='+page)
      const data = await res.json()
      const forumList = data.threads.map((forum) => {
        return (
          <Thread key={forum._id} id={forum._id} author={forum.author} title={forum.title}/>
        )
      })
      setMaxPage(data.maxPage)
      setForums(forumList)
    }
    getForums()
  },[page])
  return (
    <div>
      <Navigation/>
      <div className={CSS.main_ctn}>
        {sessionIsValid&&<CreateThreadButton/>}
        <div className={CSS.forums_ctn}>
          
          {forums}
          
        </div>
        <ForumPagination changePage={changePage} maxPage={maxPage}/>
      </div>
    </div>
  )
}

export default Forums
