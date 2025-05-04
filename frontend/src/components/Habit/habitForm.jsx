import React, { useState } from 'react'
import { useHabitContext } from '../../Hooks/useHabitsContext'
import useAuthContext from '../../Hooks/useAuthContext'

export const HabitForm = ({ onClose }) => {
  
  const {dispatch} = useHabitContext()
  const {user} = useAuthContext()
  const [title, setTitle] = useState('')
  const [quantity, setQuantity] = useState('')
  const [difficulty, setDifficulty] = useState('easy')
  const [error, setError] = useState('')
  const [emptyFields, setEmptyFields] = useState([])
  const calculateXp = (difficulty) => {
    switch (difficulty) {
      case 'easy':
        return 10;  // Easy habit gets 10 XP
      case 'medium':
        return 20;  // Medium habit gets 20 XP
      case 'hard':
        return 30;  // Hard habit gets 30 XP
      default:
        return 0;   // Default case
    } 
    }

  
  const handleSubmit = async (h) => {
    h.preventDefault()

    if (!user) {
        setError('Must be logged in')
        return
    }

    const xp = calculateXp()
    const habit = {title, quantity, xp, difficulty}

    try{
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
            setDifficulty('easy')
            setError(null)
            setEmptyFields([])
            console.log('new Habit added', json)
            dispatch({type: 'CREATE_HABIT', payload: json})
            onClose()
        } 
    }   catch (err) {
        console.error('Error in handleSubmit:', err)
        setError('There was an error submitting the habit.')
        setEmptyFields([]) 
    }
    
} 
  
return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-zinc-800 p-8 rounded-md w-full max-w-md shadow-lg relative">
        <button
          className="absolute top-3 right-3 text-gray-600 hover:text-red-500"
          onClick={onClose}
        >
          ✖
        </button>

        <h2 className="text-xl font-semibold mb-4 text-zinc-800 dark:text-zinc-100">Add a New Habit</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">Habit Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full p-2 border ${emptyFields.includes('title') ? 'border-red-500' : 'border-zinc-300'} rounded`}
            />
          </div>

          <div>
            <label className="block mb-1">Quantity</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className={`w-full p-2 border ${emptyFields.includes('quantity') ? 'border-red-500' : 'border-zinc-300'} rounded`}
            />
          </div>

          <div>
            <label className="block mb-1">Difficulty</label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full p-2 border border-zinc-300 rounded"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 w-full">
            Add Habit
          </button>

          {error && <div className="bg-red-100 text-red-700 p-2 rounded">{error}</div>}
        </form>
      </div>
    </div>
  )
}

    

