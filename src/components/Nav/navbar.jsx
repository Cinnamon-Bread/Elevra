import {Menu , X} from "lucide-react"
import React, { useState } from 'react'
import logo from '../../assets/logo.png'
import navItems from "./navItems"
import {Link} from 'react-router-dom'

const navbar = () => {
    const[isOpen, setIsOpen] = useState(false);
    
    const toggleNavbar = () => {
      setIsOpen(!isOpen);
    };
    


    return (
    <>
       <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-700/80">
            <div className="container px-4 m-auto relative text-sm">
                <div className="flex justify-between item-center">
                    <div className="flex items-center flex-shrink-0">
                        <Link className = "flex" to="/">
                            <img className='h-10 w-10 mr-2' src={logo} alt="Elevra" />
                            <span className="p-1 text-xl tracking-tight">Elevra</span>
                        </Link>       
                    </div>
                    <ul className="hidden p-3 lg:flex ml-14 space-x-12">
                        {navItems.map((items, index) => (
                            <li key={index}>
                                <Link to={items.href}>{items.label}</Link>
                            </li>

                        )
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
                                <li key={index} className="py-4">
                                <Link to={items.href}>{items.label}</Link>
                                </li>
                                )
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