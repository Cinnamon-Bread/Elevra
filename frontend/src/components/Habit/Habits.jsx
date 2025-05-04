import React from 'react'
import {useEffect, useState} from 'react'
import { useHabitContext } from '../../Hooks/useHabitsContext'
import { HabitDetails } from "./habitDetails"
import { HabitForm } from './habitForm'
import useAuthContext from '../../Hooks/useAuthContext'

export const Habits = () => {
  const {habits, dispatch} = useHabitContext()
  const {user} =  useAuthContext()
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    const fetchHabit = async () =>{
      const response = await fetch('/api/habits', {
        headers:{
          'Authorization' : `Bearer ${user.token}`
      } 
    })
      const json = await response.json()

      if(response.ok){
        dispatch({type: 'SET_HABITS', payload: json})
      }
    }
    if (user) {
      fetchHabit()
    }

  }, [dispatch, user])





  return (
    <div className='p-6'>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-zinc-700 dark:text-zinc-100">Your Habits</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add New Habit
        </button>
      </div>

      {habits && habits.map(habit => (
        <HabitDetails key={habit._id} habit={habit} />
      ))}

      {showForm && <HabitForm onClose={() => setShowForm(false)} />}
    </div>
  )
}

