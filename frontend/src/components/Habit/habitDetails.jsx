import { useHabitContext } from '../../Hooks/useHabitsContext'
import React from 'react'

import {formatDistanceToNow} from 'date-fns/formatDistanceToNow'
import useAuthContext from '../../Hooks/useAuthContext'

export const HabitDetails = ({ habit }) => {
  const {dispatch} = useHabitContext()
  const {user, dispatch : authDispatch} = useAuthContext()
  
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

  const handleComplete = async () => {
    if (!user || !user.token) {
      console.error("User not logged in.");
      return;
    }
  
    try {
      console.log("Sending token:", user.token)

      const response = await fetch('/api/habits/complete/' + habit._id, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
  
      const json = await response.json()
      if (!response.ok) throw new Error(json.error || "Failed to complete habit");
  
      if (response.ok) {

        authDispatch({ type: 'UPDATE_USER_XP', payload: { ...json.user, token: json.token } });
        localStorage.setItem('user',JSON.stringify({...user,
          xp: json.user.xp,level: json.user.level,token: json.token}))
        
      } else {
        alert(json.error)
      }
  
      alert('Habit completed!');
    } catch (err) {
      console.error(err)
      alert('Failed to complete habit')
    }
  }




  return (
    <div className="p-6 bg-zinc-800 shadow-lg rounded-lg border border-zinc-700 space-y-2">
      <h4 className="text-xl font-semibold text-white">{habit.title}</h4>
      <p className="text-zinc-50"><strong>Quantity:</strong> {habit.quantity}</p>
      <p className="text-zinc-50"><strong>XP:</strong> {habit.xp}</p>
      <p className="text-sm text-zinc-400 italic">
        {formatDistanceToNow(new Date(habit.createdAt), { addSuffix: true })}
      </p>
      <div className="flex justify-between items-center pt-4">
        <button
          onClick={handleComplete}
          className="bg-emerald-500 text-white px-3 py-1 rounded hover:bg-emerald-600 transition"
        >
          Complete
        </button>
        <button
          onClick={handleDelete}
          className="text-red-500 hover:underline"
        >
          Delete
        </button>
      </div>
    </div>
  )
}
