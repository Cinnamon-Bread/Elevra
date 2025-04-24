import React, { useState } from 'react'
import { useHabitContext } from '../../Hooks/useHabitsContext'
import useAuthContext from '../../Hooks/useAuthContext'

export const HabitForm = () => {
  
  const {dispatch} = useHabitContext()
  const {user} = useAuthContext()
  const [title, setTitle] = useState('')
  const [quantity, setQuantity] = useState('')
  const [xp, setXp] = useState('')
  const [error, setError] = useState('')
  const [emptyFields, setEmptyFields] = useState([])


  const handleSubmit = async (h) => {
    h.preventDefault()

    if (!user) {
        setError('Must be logged in')
        return
    }

    const habit = {title, quantity, xp}

    const response = await fetch('/api/habits', {
        method: 'POST',
        body: JSON.stringify(habit),
        headers: {
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${user.token}`
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
            <div className='flex flex-auto'>
                <div className='block'>
                    <h3>Add a New Habit</h3>
                    <label>Habit Title</label>
                    <div className='p-10 mt-10 mb-20 w-full border-zinc-300 border-1 box-border'>
                        <input
                            type='text'
                            onChange={(h) => setTitle(h.target.value)}
                            value={title}
                            className={emptyFields.includes('title') ? 'error' : ''}
                            ></input>
                    </div>
                    <label>Quantity</label>
                    <div className='p-10 mt-10 mb-20 w-full border-zinc-300 border-1 box-border'>
                        <input
                            type='number'
                            onChange={(h) => setQuantity(h.target.value)}
                            value={quantity}
                            className={emptyFields.includes('quantity') ? 'error' : ''}
                            ></input>
                    </div>


                    <label>Amount of Xp</label>
                    <div className='p-10 mt-10 mb-20 w-full border-zinc-300 rounded-sm box-border'>
                        <input
                            type='number'
                            onChange={(h) => setXp(h.target.value)}
                            value={xp}
                            className={emptyFields.includes('xp') ? 'error' : ''}
                            ></input> 
                    </div>

                    <button className='bg-emerald-300 border-0 text-zinc-100 p-10 font-atkin rounded-sm cursor-pointer'
                    >Add Habit
                    </button>
                    {error && <div className='p-10 bg-red-400 rounded-sm border-1 text-zinc-100 m-20'>{error}</div>}
                </div>
            </div>
        </form>
    )
}
