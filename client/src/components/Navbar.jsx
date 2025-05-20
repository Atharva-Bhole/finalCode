import React from 'react'
import { Link } from 'react-router'
const Navbar = () => {
  return (
    <nav className='flex justify-evenly py-2 text-white bg-gray-900 cursor-default poppins-regular'>
        <div className='text-2xl hover:text-blue-400 transition-all'><Link to={'/'}>Institute Portal </Link></div>
        <div className='text-xl'>
            <Link to={'/'} className='mx-3 hover:text-blue-400 transition-all'>Home</Link>
            <Link to={'/register'} className='mx-3 hover:text-blue-400 transition-all'>Create Trainer</Link>
            <Link to={'/trainers'} className='mx-3 hover:text-blue-400 transition-all'>View Trainers</Link>
            <Link to={'/subject/all'} className='mx-3 hover:text-blue-400 transition-all'>Subject</Link>
        </div>
    </nav>
  )
}

export default Navbar