import React from 'react'
import Hero from './componets/Hero'
import Navbar from './componets/navbar'

const App = () => {
  return (
    <>
      <Navbar/>
      <div className='max-w-7xl mx-auto pt-20 px-6'>
        <Hero /> 
      </div>
      
    </>
  )
}

export default App