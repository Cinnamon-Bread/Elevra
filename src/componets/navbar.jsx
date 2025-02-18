import React from 'react'

const navbar = () => {
  return (
    <>

        <nav className='mb-2 shadow px-4'>
            <div className='relative max-w-screen-lg mx-auto py-4 flex sm:items-center sm:justify-between'>
                <a className='text-2x1 flex items-center font-black' href="index.html">
                    <span>Elevra</span>
                </a>
                <input className='peer-hidden' type='checkbox' id="navbar-open"></input>
                <label className='cursor-pointer aboslute right-0 mt-1 text-xl' for="navbar-open">
                    <svg></svg>
                </label>
                <nav className='peer-checked:block hidden' mt-4 sm:mt-0>
                    <ul className='flex flex-col sm:gap-x-8'>
                        <li><a className='hover:text-zinc-100' href="#">Home</a></li>
                        <li><a className='hover:text-zinc-100'href="#">Habits</a></li>
                        <li><a className='hover:text-zinc-100'href="#">Leaderboard</a></li>
                        <li><a className='hover:text-zinc-100'href="#">Profile</a></li>
                        <li><a className="hover:bg-zinc-100 hover:text-zinc-950 px-6 py-2 rounded-xl  bg-zinc-950 font-medium text-zinc-100"href='#'>Login</a></li>
                    </ul>
                </nav>
            </div>
        </nav>
    

    </>
  )
}

export default navbar