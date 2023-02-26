import {useNavigate} from 'react-router-dom'    
const CreateThreadButton = () => {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate('/forums/create')
    }
    return(
        <div>
            <button onClick={handleClick}>Create Thread</button>
        </div>
    )
}

export default CreateThreadButton
