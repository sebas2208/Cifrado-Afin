import React from 'react'
import './nav.css'
import { useState } from 'react';

const Nav = () => {
  const [activeNav, setActiveNav] = useState('#')
  return (
    <nav>
      <a href="#header" onClick={() => setActiveNav('#header')} className={activeNav === '#header' ? 'active' : ''}>header</a>
      <a href="#about" onClick={() => setActiveNav('#about')} className={activeNav === '#about' ? 'active' : ''}>About</a>
      <a href='#encrypt' onClick={() => setActiveNav('#encrypt')} className={activeNav === '#encrypt' ? 'active' : ''}>Encrypt</a>
      <a href="#contact" onClick={() => setActiveNav('#contact')} className={activeNav === '#contact' ? 'active' : ''}>Contact</a>
    </nav>
  )
}

export default Nav