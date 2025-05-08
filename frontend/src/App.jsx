import React from 'react'
import {Hero} from './components/Landing/Hero'
import Navbar from './components/Nav/navbar'
import {Home} from './components/Home/Home'
import { BrowserRouter as Router, Routes, Route ,Navigate} from 'react-router-dom'
import { Habits } from './components/Habit/Habits'
import Profile from './components/Profile/Profile'
import Rewards  from './components/Rewards/Rewards'
import Leaderboards  from './components/Leaderboards/Leaderboards'
import Login from './components/Auth/login'
import Signup from './components/Auth/signup'
import useAuthContext from './Hooks/useAuthContext'
import UpdateProfile from './components/Profile/UpdateProfile'

const App = () => {
  const{user} = useAuthContext()

  return (
    <>
      <div className='w-full h-full'>
        <Router>
          <Navbar/>
            <Routes>
              <Route path='/' element= {user ? <Home/> : <Navigate to= "/Login"/>}/>
              <Route path='/Habits' element= {user ? <Habits/> : <Navigate to= "/Login"/>}/>
              <Route path='/Habit' element= {user ? <Habits/> : <Navigate to= "/Login"/>}/>
              <Route path='/Profile' element={user ? <Profile/> : <Navigate to= "/Login"/>}/>
              <Route path='/Rewards' element={user ? <Rewards/> : <Navigate to= "/Login"/>}/>
              <Route path='/Leaderboard'element={user ? <Leaderboards/> : <Navigate to= "/Login"/>}/>
              <Route path='/Login'element={!user ? <Login/> : <Navigate to= "/"/>}/>
              <Route path='/Signup'element={!user ? <Signup/> : <Navigate to= "/"/>}/>
              <Route path="/update-profile" element={user? <UpdateProfile/> : <Navigate to= "/Login"/>} />
            </Routes>
          <div className='max-w-7xl mx-auto pt-20 px-6'>
          </div>
        </Router>
      </div>
    </>
  )
}

export default App