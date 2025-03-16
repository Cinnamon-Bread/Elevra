import React from 'react'
import {useEffect} from 'react'
import { useHabitContext } from '../../Hooks/useHabitsContext'
import { HabitDetails } from "./habitDetails"
import { HabitForm } from './habitForm'
import useAuthContext from '../../Hooks/useAuthContext'

export const Habits = () => {
  const {habits, dispatch} = useHabitContext()
  const {user} =  useAuthContext()

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
    <>
      <div className='p-6'>
        <div>
          {habits && habits.map((habit) =>(
            <HabitDetails key={habit._id} habit={habit}/>
          ))}
        </div>
        <HabitForm/>
      </div>
    </>
  )
}

