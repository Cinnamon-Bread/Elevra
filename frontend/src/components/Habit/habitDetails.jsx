import { useHabitContext } from '../../Hooks/useHabitsContext'
import React from 'react'

import {formatDistanceToNow} from 'date-fns/formatDistanceToNow'
import useAuthContext from '../../Hooks/useAuthContext'

export const HabitDetails = ({ habit }) => {
  const {dispatch} = useHabitContext()
  const {user} = useAuthContext()
  
  const handleDelete = async ( ) =>{

    if (!user){
      return
    }


    const response = await fetch('/api/habits/' + habit._id, {
      method: 'DELETE',
      headers: {
        'Authorization' : `Bearer ${user.token}`
      }
    })
    const json = await response.json()
  
    if (response.ok){
      dispatch({type: 'DELETE_HABIT', payload: json})
    }
  }

  const handleComplete = async (id) => {
    try {
      const res = await fetch(`/api/habits/` + habit._id, {
        method: 'POST',
        headers: { 
          'Authorization' : `Bearer ${user.token}` }
      })
  
      const data = await res.json()
      if (res.ok) {
        alert(`Habit Completed! XP: ${data.xp}, Level: ${data.level}`)
      } else {
        alert(data.error)
      }
    } catch (err) {
      console.error(err)
      alert('Failed to complete habit')
    }
  }

  return (
    <div className='p-10 bg-zinc-300 m-20 shadow-2xl'>
        <h4>{habit.title}</h4>
        <p><strong>Quantity: </strong> {habit.quantity}</p>
        <p><strong>XP: </strong> {habit.xp}</p>
        <p>{formatDistanceToNow(new Date(habit.createdAt), {addSuffix: true})} </p>
        <span onClick={handleDelete}>Delete</span>
        <button  onClick={handleComplete} className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">Complete</button>
    </div>
  )
}
