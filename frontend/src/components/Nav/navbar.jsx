import {Menu , X} from "lucide-react"
import React, { useState } from 'react'
import logo from '../../assets/logo.png'
import navItems from "./navItems"
import {Link} from 'react-router-dom'
import useLogout from '../../Hooks/useLogout'
import useAuthContext from "../../Hooks/useAuthContext"



const navbar = () => {
    const[isOpen, setIsOpen] = useState(false);
    
    const toggleNavbar = () => {
      setIsOpen(!isOpen);
    };

    const {logout} = useLogout()

    const handleClick = () => {
        logout()
    }
    
    const {user} = useAuthContext()


    return (
    <>
       <nav className="sticky bg-zinc-950/10 top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-700/80">
            <div className="container px-4 m-auto relative text-sm">
                <div className="flex justify-between item-center">
                    <div className="flex items-center flex-shrink-0">
                        <Link className = "flex" to="/">
                            <img className='h-10 w-10 mr-2' src={logo} alt="Elevra" />
                            <span className="p-1 text-xl font-bold tracking-wide text-white">Elevra</span>
                        </Link>       
                    </div>
                    <ul className="hidden p-3 lg:flex ml-14 space-x-12">
                        {navItems.map((items, index) => (
                            <li className = "font-atkin text-gray-200 hover:text-amber-400 transition-colors duration-200" key={index}>
                                <Link to={items.href}>{items.label}</Link>
                            </li>
                        ))}
                        {!user && (
                                <div className="hidden p-3 lg:flex ml-14 space-x-12 font-atkin hover:text-amber-300">
                                    <Link to="/login">Login</Link>
                                    <Link to="/signup">Signup</Link>
                                </div>
                        )}
                        {user && (
                            <div className="flex flex-col justify-center space-y-1 text-right ml-auto font-atkin">
                                <p className="text-sm text-amber-300">Level {user.level} — {user.xp} XP</p>
                                <p className="text-xs text-gray-400">{user.email}</p>
                                <button
                                    className="text-red-400 hover:text-red-600 text-sm transition"
                                    onClick={handleClick}
                                >
                                    Log out
                                </button>
                            </div>
                            )}
                    </ul>
                    <div className="lg:hidden md:flex flex-col justify-end">
                        <button onClick={toggleNavbar}>
                            {isOpen ? <X/> : <Menu/> }
                        </button>
                    </div>
                </div>
                {isOpen &&(
                    <div className="fixed text-center right-0 z-20 bg-neutral-900 w-full p-12 flex flex-col justify-center item-center lg:hidden">
                        <ul>
                            {navItems.map((items, index) => (
                                <li key={index} className="font-atkin hover:text-amber-300 py-4">
                                    <Link to={items.href}>{items.label}</Link>
                                </li>
                                )
                            )}{!user && (
                                <div className="font-atkin hover:text-amber-300">
                                    <Link to="/login">Login</Link>
                                    <Link to="/signup">Signup</Link>
                                </div>
                            )}
                            
                            {user && (
                                <div>
                                    <p>Level {user.level} — {user.xp} XP</p>
                                    <span>{user.email}</span>
                                    <button className="font-atkin hover:text-amber-300 py-4" onClick={handleClick}>Log out</button>
                                </div>
                                )}
                            
                        </ul> 
                    </div>
                )}
            </div>
       </nav> 
       
    </>
  )
}

export default navbar