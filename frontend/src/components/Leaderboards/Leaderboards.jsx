import React from 'react'
import LeaderboardItems from './LeaderboardItems'

export const Leaderboards = () => {

  const handleClick = (e) => {
    
  }



  return (
    <div className='flex justify-center items-center'>
      <h1>LeaderBoard</h1>
      <div >
        <button data-id="7">7 Days</button>
        <button data-id="30">30 Days</button>
        <button data-id="0">All Time</button>
        {LeaderboardItems()}

      </div>
    </div>
  )
}
