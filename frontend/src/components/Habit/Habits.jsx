import React from 'react'
import {useEffect, useState} from 'react'

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
      <div>
        <div>
          {habits && habits.map((habit) =>(
            <p key ={habit._id}>{habit.title}</p>
          ))}
        </div>
      </div>
    </>
  )
}

