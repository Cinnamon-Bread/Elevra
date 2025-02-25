import React from 'react'
import {useEffect, useState} from 'react'
import { HabitDetails } from "./habitDetails"
import { HabitForm } from './habitForm'

export const Habits = () => {
  const[habits, setHabits] = useState(null)

  useEffect(() => {




    const fetchHabit = async () =>{
      const response = await fetch('/api/habits')
      const json = await response.json()

      if(response.ok){
        setHabits(json)
      }
    }
    fetchHabit()
  }, [])





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

