import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../context/authcontext'; 
import axios from 'axios'


export const Home = () => {
  const { user } = useContext(AuthContext)
  const [habits, setHabits] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!user || !user.token) {
          console.warn("No user or token available yet")
          return
        }

        const userRes = await fetch('/api/user/me', {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        })

        const habitsRes = await fetch('/api/habits', {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        })

        const userData = await userRes.json()
        const habitsData = await habitsRes.json()

        setHabits(habitsData)
        setLoading(false)
      } catch (err) {
        console.error('Error loading data:', err)
        setLoading(false)
      }
    }

    fetchData()
  }, [user])

  if (loading) 
    return <div className="text-center mt-20 text-amber-400">Loading...</div>
  if (!user) {
    return <p>Error loading user.</p>
  }
  return (
    <>
      <div className="min-h-screen bg-zinc-900 text-white flex flex-col md:flex-row">
      
      {/* Profile Sidebar (Left) */}
      <div className="md:w-1/3 w-full bg-zinc-800 p-6 border-r border-zinc-700">
        <h2 className="text-2xl font-bold text-amber-400 mb-4">Profile</h2>
        <div className="bg-zinc-900 p-4 rounded shadow-md text-center">
          <img
            src="/avatar-placeholder.png"
            alt="Avatar"
            className="w-24 h-24 mx-auto rounded-full mb-2 border-4 border-amber-500"
          />
          <h3 className="text-lg font-semibold">{user?.username || 'Guest'}</h3>
          <p className="text-zinc-400">Level {user?.level || 0}</p>
          <div className="mt-2 bg-zinc-700 rounded-full h-4">
            <div
              className="bg-amber-500 h-4 rounded-full"
              style={{ width: `${(user?.xp / (user?.level * 100)) * 100}%` }}
            ></div>
          </div>
          <p className="text-sm mt-1">XP: {user?.xp} / {user?.level * 100}</p>
        </div>
      </div>

      {/* Habits Section (Right) */}
      <div className="md:w-2/3 w-full p-6">
        <h2 className="text-2xl font-bold text-amber-400 mb-4">Your Habits</h2>
        <div className="space-y-4">
          {habits.length === 0 ? (
            <p className="text-zinc-400">No habits yet. Start by creating one!</p>
          ) : (
            habits.map((habit) => (
              <div key={habit._id} className="bg-zinc-800 p-4 rounded shadow-md">
                <h3 className="text-lg font-semibold">{habit.title}</h3>
                <p className="text-sm text-zinc-300">
                  Difficulty: {habit.difficulty} • XP: {habit.xp} • {habit.completed ? '✅ Completed' : '⏳ Incomplete'}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
      
    </div>
    </>
  )
}

