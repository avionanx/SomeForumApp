import React from 'react'
import CSS from '../css/Thread.module.css'
import { useNavigate } from 'react-router-dom'
const Thread = (props) => {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate(`/forums/${props.id}`)
  }
  return (
    <div className={CSS.thread} id={props.id} onClick={handleClick}>
      <p>{props.title}</p>
      <p>By {props.author}</p>
    </div>
  )
}

export default Thread
