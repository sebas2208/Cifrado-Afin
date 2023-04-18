import React from 'react'
import './header.css'
import ME from '../../assets/imagen.jpg'
import HeaderSocials from './HeaderSocials'

const Header = () => {
  return (
    <header id='header'>
        <div className="container header__container">
            <h5>Hola, soy</h5>
            <h1>Sebastian Cubillos</h1>
            <h5 className="text-light">En esta pagina web podras hacer el cifrado y descifrado Afin</h5>
            <HeaderSocials />

            <div className="me">
                <img src={ME} alt="imagen" />
            </div>
            
        </div>
    </header>
  )
}

export default Header