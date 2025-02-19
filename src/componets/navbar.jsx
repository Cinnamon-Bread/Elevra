import {Menu , X} from "lucide-react"
import React, { useState } from 'react'
import logo from '../assets/logo.png'
import {navItems} from "../componets/navItems"

const navbar = () => {
    const{isOpen, setIsOpen} = useState(false);
    
    const toggleNavbar = () => {
      setIsOpen(!isOpen);
    };
    


  return (
    <>
       <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-700/80">
            <div className="container px-4 mx-auto relative text-sm">
                <div className="flex justify-between item-center">
                    <div className="flex items-center flex-shrink-0">
                        <img className='h-10 w-10 mr-2' src={logo} alt="Elevra" />
                        <span className="text-xl tracking-tight">Elevra</span>
                    </div>
                    <ul className="hidden lg:flex ml-14 space-x-12">
                        {navItems.map((items, index) => (
                            <li key={index}>
                                <a href={items.href}>{items.label}</a>
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
            </div>
       </nav> 
    </>
  )
}

export default navbar