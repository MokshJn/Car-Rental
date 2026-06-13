import React from 'react'
import { Link } from 'react-router-dom';
import {assets} from '../../assets/assets'
import { useAppContext } from '../../context/Appcontext';

const NavbarOwner = () => {
    const {user} = useAppContext() ; 

  return (
    <div>
        <div className='flex items-center justify-between px-6 md:px-10 py-4 text-gray-500 border-b border-borderColor relative transition-all'>
            <Link to='/'><img src={assets.logo} alt="logo" className='h-8'/></Link>
            <p>Welcome, {user?.name || "User"}</p>
        </div>
    </div>
  )
}

export default NavbarOwner