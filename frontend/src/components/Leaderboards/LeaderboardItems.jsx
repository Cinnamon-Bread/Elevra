import React from 'react'

const LeaderboardItems = () => {
  return (
    <div>
        {item()}
    </div>
  )
}

const item = () => {
    return (
        <div className='flex'>
            <div>
                <img src ="../frontend/public/vite.svg"></img>
                <div>
                    <h3>Name</h3>
                    <span>Location</span>
                </div>
                <div>
                    <span>Score</span>
                </div>
            </div>
        </div>
    )
}


export default LeaderboardItems