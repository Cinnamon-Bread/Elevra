
import React from 'react'

export const HabitDetails = ({ habit }) => {
  return (
    <div className='p-10 bg-zinc-300 m-20 shadow-2xl'>
        <h4>{habit.title}</h4>
        <p><strong>Quantity</strong>{habit.quantity}</p>
        <p><strong>XP</strong>{habit.xp}</p>
        <p>{habit.createdAt}</p>
    </div>
  )
}
