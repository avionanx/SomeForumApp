import { useNavigate,useParams } from "react-router-dom"
const CreateReplyButton = () => {
    const navigate = useNavigate()
    const {id} = useParams()
  return (
    <div>
        <button onClick={() => navigate(`/forums/${id}/create`)}>Create Reply</button>
    </div>
  )
}

export default CreateReplyButton
