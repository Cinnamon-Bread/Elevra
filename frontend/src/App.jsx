import React from 'react'
import {Hero} from './components/Landing/Hero'
import Navbar from './components/Nav/navbar'
import {Home} from './components/Home/Home'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { Habits } from './components/Habit/Habits'
import { Profile } from './components/Profile/Profile'
import { Rewards } from './components/Rewards/Rewards'
import { Leaderboards } from './components/Leaderboards/Leaderboards'


const App = () => {
  return (
    <>
      <div className='w-full h-full'>
        <Router>
          <Navbar/>
            <Routes>
              <Route path='/' element= {<Home/>}/>
              <Route path='/Habits' element= {<Habits/>}/>
              <Route path='/Habit' element= {<Habits/>}/>
              <Route path='/Profile' element={<Profile/>}/>
              <Route path='/Rewards' element={<Rewards/>}/>
              <Route path='/Leaderboard'element={<Leaderboards/>}/>
            </Routes>
          <div className='max-w-7xl mx-auto pt-20 px-6'>
          </div>
        </Router>
      </div>
    </>
  )
}

export default App