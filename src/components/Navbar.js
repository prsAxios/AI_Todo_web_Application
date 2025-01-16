// src/components/Navbar.js
import React, { useState } from 'react';
import { FaHome, FaUser, FaSun, FaBars, FaPowerOff, FaMoon } from 'react-icons/fa'; // Importing icons from react-icons
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../ThemeContext'; // Import the useTheme hook

const Navbar = () => {

    const [isOpen,setIsOpen] = useState(false);
    const { darkMode, toggleDarkMode } = useTheme();  // Access darkMode and toggleDarkMode

    const user = JSON.parse(sessionStorage.getItem('user'));
    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.removeItem('user');
        navigate('/login');
    };

    const handleMenuBar = () => {
        setIsOpen(!isOpen);

    }

    return (
        <header className={`z-20 top-0 sticky backdrop-blur-sm shadow-2xl  text-black space-x-6 ${darkMode ? 'bg-black/90 text-white' : 'bg-black/30 text-black'}`}>
            <nav className='flex items-center justify-between'>
                {/* {Left part} */}
                <div className='flex items-center'>
                    <buttton
                        onClick={handleMenuBar}
                    >
                    <FaBars className='h-[30px] w-[50px] mr-5 text-4xl'/>
                    </buttton>
                    <img src='/Main_Logo.png' className='h-[60px] w-auto object-contain mr-3 py-2' alt='main logo'/>
                    <p className='text-2xl font-bold'>Doit.</p>
                </div>

                {/* {Right Part} */}
                <div className='flex items-center justify-center text-xl'>

                    
                    <FaHome className='mr-3' />
              

                    <button onClick={toggleDarkMode}>
                        {darkMode ? <FaSun className='mr-3'/> : <FaMoon className='mr-3'/>}
                    </button>

                    <a href='/profile'>
                    <FaUser className='mr-3'/>
                    </a>
                    {user && (
                        <button onClick={handleLogout} className='bg-black rounded-full p-3 text-white'>
                            <FaPowerOff />
                        </button>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
