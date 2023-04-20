import React from 'react'
import './header.css'
import ME from '../../assets/imagen.jpg'

const Header = () => {
  return (
    <header id='header'>
        <div className="container header__container">
            <h2>Bienvenido</h2>
            <h1>Cifrado Afín</h1>
            <h4 className="text-light">En esta pagina web podras hacer el cifrado y descifrado Afin</h4>
            <div className="me">
                <img src={ME} alt="imagen" />
            </div>
            
        </div>
    </header>
  )
}

export default Header