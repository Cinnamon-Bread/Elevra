import React, { useState } from 'react'

export const HabitForm = () => {
  const [title, setTitle] = useState('')
  const [quantity, setQuantity] = useState('')
  const [xp, setXp] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (h) => {
    h.preventDefault()

    const habit = {title, quantity, xp}

    const response = await fetch('/api/habits', {
        method: 'POST',
        body: JSON.stringify(habit),
        headers: {
            'Content-Type' : 'application/json'
        }
    })
    const json = await response.json()

    if(!response.ok){
        setError(json.error)
    }

    if(response.ok) {
        setTitle('')
        setQuantity('')
        setXp('')
        setError(null)
        console.log('new Habit added', json)
    }
  } 
  
    return (
        <form onSubmit={handleSubmit}>
            <h3>Add a New Habit</h3>
            <label>Habit Title</label>
            <input
                type='text'
                onChange={(h) => setTitle(h.target.value)}
                value={title}
                ></input>

            <label>Quantity</label>
            <input
                type='number'
                onChange={(h) => setQuantity(h.target.value)}
                value={quantity}
                ></input>


            <label>Amount of Xp</label>
            <input
                type='number'
                onChange={(h) => setXp(h.target.value)}
                value={xp}
                ></input>

            <button>Add Habit</button>
            {error && <div>{error}</div>}
        </form>
    )
}
