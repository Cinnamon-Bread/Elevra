import { useHabitContext } from '../../Hooks/useHabitsContext'
import React from 'react'



export const HabitDetails = ({ habit }) => {
  const {dispatch} = useHabitContext()
  
  const handleClick = async ( ) =>{


    const response = await fetch('/api/habits/' + habit._id, {
      method: 'DELETE'
    })
    const json = await response.json()
  
    if (response.ok){
      dispatch({type: 'DELETE_HABIT', payload: json})
    }
  }

  return (
    <div className='p-10 bg-zinc-300 m-20 shadow-2xl'>
        <h4>{habit.title}</h4>
        <p><strong>Quantity: </strong> {habit.quantity}</p>
        <p><strong>XP: </strong> {habit.xp}</p>
        <p>{ habit.createdAt} </p>
        <span onClick={handleClick}>delete</span>
    </div>
  )
}
