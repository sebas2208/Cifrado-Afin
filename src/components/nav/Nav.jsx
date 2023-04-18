import React from 'react'
import './nav.css'
import { useState } from 'react';

const Nav = () => {
  const [activeNav, setActiveNav] = useState('#')
  return (
    <nav>
      <a href="#header" onClick={() => setActiveNav('#header')} className={activeNav === '#header' ? 'active' : ''}>Inicio</a>
      <a href='#encrypt' onClick={() => setActiveNav('#encrypt')} className={activeNav === '#encrypt' ? 'active' : ''}>Cifrado Afin</a>
    </nav>
  )
}

export default Nav