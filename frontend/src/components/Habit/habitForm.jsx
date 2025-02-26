import React, { useState } from 'react'
import { useHabitContext } from '../../Hooks/useHabitsContext'

export const HabitForm = () => {
  
  const {dispatch} = useHabitContext()
  const [title, setTitle] = useState('')
  const [quantity, setQuantity] = useState('')
  const [xp, setXp] = useState('')
  const [error, setError] = useState('')
  const [emptyFields, setEmptyFields] = useState([])

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
        setEmptyFields(json.emptyFields)
    }

    if(response.ok) {
        setTitle('')
        setQuantity('')
        setXp('')
        setError(null)
        setEmptyFields([])
        console.log('new Habit added', json)
        dispatch({type: 'CREATE_HABIT', payload: json})
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
                class={emptyFields.includes('title') ? 'error' : ''}
                ></input>

            <label>Quantity</label>
            <input
                type='number'
                onChange={(h) => setQuantity(h.target.value)}
                value={quantity}
                class={emptyFields.includes('quantity') ? 'error' : ''}
                ></input>


            <label>Amount of Xp</label>
            <input
                type='number'
                onChange={(h) => setXp(h.target.value)}
                value={xp}
                class={emptyFields.includes('xp') ? 'error' : ''}
                ></input>

            <button>Add Habit</button>
            {error && <div>{error}</div>}
        </form>
    )
}
