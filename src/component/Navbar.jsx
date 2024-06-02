import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-800 flex justify-between items-center px-5 text-white h-14 '>
      <div className='logo font-bold text-xl'>
        <span className='text-green-700'>&lt;</span>
        Pass
        <span className='text-green-700'>OP/&gt;</span>
      </div>
      {/* <ul>
        <li className='flex gap-4'>
          <a className='hover:font-bold' href="/">Home</a>
          <a className='hover:font-bold' href="#">Contact</a>
          <a className='hover:font-bold' href="#">About</a>
        </li>
      </ul> */}
      <div>
        <button className=' bg-green-600 p-1 rounded-full flex justify-between items-center font-bold pr-3'>
          <img className='w-10 left-0' src="icons/github.png" alt="" /> <a href="https://github.com/vishaaal05?tab=repositories" target='_blank' >Github</a>
        </button>

      </div>
    </nav>
  )
}

export default Navbar