import React from 'react'

const User = "User"


export const Home = () => {
  return (
    <>
        <div>
          <a>
            <h1 className='max-w-7xl mx-10 pt-10 px-6 text-3xl'>
              Welcome Back {User} !
            </h1>
          </a> 
          <div className='p-6 flex h-screen w-full items-center justify-between'>
            <div className='grid h-full w-full grid-cols-10 grid-rows-10 gap-4'>
              <div className='col-span-5 row-span-5 bg-zinc-300 rounded-3xl flex justify-center items-center'>Profile1</div>
              <div className=' col-span-3 row-span-9 col-start-7 col-end-11 bg-zinc-300 rounded-3xl flex justify-center items-center'>Habits
                <li></li>
              </div>
            </div>
          </div>

        </div>
    </>
  )
}

