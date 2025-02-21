import React from 'react'
import {Hero} from './components/Landing/Hero'
import Navbar from './components/Nav/navbar'
import {Home} from './components/Home/Home'

const App = () => {
  return (
    <>
      <Navbar/>
      <Home/>
      <div className='max-w-7xl mx-auto pt-20 px-6'>
        {/* <Hero /> */}
      </div>
      
    </>
  )
}

export default App