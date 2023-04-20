import React from "react"
import './encrypt.css'
import { useState } from "react";
import diacritics from "diacritics";

const Encrypt = () => {
    const [mensajeCifrar, setMensajeCifrar] = useState('');
    const [mensajeDescifrar, setMensajeDescifrar] = useState('');
    const [claveACifrado, setClaveACifrado] = useState(0);
    const [claveBCifrado, setClaveBCifrado] = useState(0);
    const [claveADescifrado, setClaveADescifrado] = useState(0);
    const [claveBDescifrado, setClaveBDescifrado] = useState(0);
    const [cifrado, setCifrado] = useState('');
    const [decifrado, setDecifrado] = useState('');
    const [letraMayor1, setLetraMayor1] = useState('');
    const [letraMayor2, setLetraMayor2] = useState('');
    
    const alfabeto = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.split("");
    const mod = alfabeto.length;

    const limpiarTexto = (texto) => {
      texto = texto.toUpperCase();
      texto = diacritics.remove(texto);
      texto = texto.replace(/[^a-zA-ZñÑ]/g, '');
      
      return texto;
    };

    const getPosicionOriginal = (letra) => {
      return alfabeto.indexOf(letra);
    }

    const cifrarTexto = () => {
      let encriptado = '';
      let mensajeLimpio = limpiarTexto(mensajeCifrar);
      for (let i = 0; i < mensajeLimpio.length; i++) {
        const letraOriginal = mensajeLimpio[i].toUpperCase();
        const posicionOriginal = alfabeto.indexOf(letraOriginal);
        if (getPosicionOriginal(letraOriginal) !== -1) {
          const posicionCifrada = (claveACifrado * posicionOriginal + claveBCifrado) % mod;
          const letraCifrada = alfabeto[posicionCifrada];
          encriptado += letraCifrada;
        } else {
          encriptado += letraOriginal;
        }  
      }
      setCifrado(encriptado)
    };
    
    const encontrarModuloInverso = (a, m) => {
      for (let i = 1; i < m; i++) {
        if (((a % m) * (i % m)) % m === 1) {
          return i;
        }     
      }
      return 1;
    }

    const validarNegativo = (num) => num < 0;

    const crearDiccionario = (text) => {
      const dicccionario = {};
      for (let i = 0; i < text.length; i++) {
        const char = text[i];
        dicccionario[char] = dicccionario[char] ? dicccionario[char] + 1 : 1;
      }
      return dicccionario;
    }

    const decifrarTexto = () => {
      let desencriptado = '';
      let dicccionarioPalabras = {};
      let mensajeLimpio = limpiarTexto(mensajeDescifrar);
      dicccionarioPalabras = crearDiccionario(mensajeLimpio);

      let mayor1 = 0;
      for (let a in dicccionarioPalabras ) {
        if (mayor1 < dicccionarioPalabras[a]) {
          mayor1 = dicccionarioPalabras[a];
          setLetraMayor1(a);
        }
      }
      
      let mayor2 = 0;
      for (let a in dicccionarioPalabras ) {
        if (mayor2 < dicccionarioPalabras[a] && a !== letraMayor1) {
          mayor2 = dicccionarioPalabras[a];
          setLetraMayor2(a);
        }
      }

      let valorB = getPosicionOriginal(letraMayor2) ;

      setClaveBDescifrado(valorB);

      let valorA = ((getPosicionOriginal(letraMayor1) - getPosicionOriginal(letraMayor2))*(encontrarModuloInverso(4,mod))%mod)

      if (validarNegativo(valorA)) {
        valorA = valorA + mod;
      } 

      setClaveADescifrado(valorA);



      const aInverso = encontrarModuloInverso(claveADescifrado, alfabeto.length);
      for (let i = 0; i < mensajeLimpio.length; i++) {
        const charIndex = alfabeto.indexOf(mensajeLimpio[i].toUpperCase());
        if (charIndex === -1) {
          desencriptado -= mensajeLimpio[i];
        } else {
          const desencriptadoCharIndex = aInverso * (charIndex - claveBDescifrado + alfabeto.length) % alfabeto.length;
          desencriptado += alfabeto[desencriptadoCharIndex];
        }
      }
      setDecifrado(desencriptado);
      console.log(desencriptado)

    };

    return (
      <main id='encrypt'>
        <section>
          <h2>Cifrado de texto</h2>
          <form>
            <div>
              <label htmlFor="mensaje">Mensaje a cifrar:</label>
              <textarea id="mensaje" value={mensajeCifrar} onChange={(e) => setMensajeCifrar(e.target.value)} />
            </div>
            <div>
              <label htmlFor="claveA">Valor de a:</label>
              <input type="number" id="claveA" value={claveACifrado} onChange={(e) => setClaveACifrado(parseInt(e.target.value))} />
            </div>
            <div>
              <label htmlFor="claveB">Valor de b:</label>
              <input type="number" id="claveB" value={claveBCifrado} onChange={(e) => setClaveBCifrado(parseInt(e.target.value))} />
            </div>
            <button className="btn btn-primary" type="button" onClick={cifrarTexto}>Cifrar</button>
            <div>
              <label htmlFor="mensaje-cifrado">Mensaje cifrado:</label>
              <textarea id="mensaje-cifrado" value={cifrado} readOnly={true} />
            </div>
            <button className="btn" type="button" onClick={() => window.location.reload()}>Limpiar</button>
          </form>
        </section>
        <section>
          <h2>Decifrado de texto</h2>
          <form>
            <div>
              <label htmlFor="mensaje-a-decifrar">Mensaje a descifrar:</label>
              <textarea id="mensaje-a-decifrar" value={mensajeDescifrar} onChange={(e) => setMensajeDescifrar(e.target.value)}/>
            </div>
            <button className="btn btn-primary" type="button" onClick={decifrarTexto}>Descifrar</button>
            <div>
              <p>El valor de A es: {claveADescifrado}</p>
              <p>El valor de B es: {claveBDescifrado}</p>
              <p>La primera letra más repetida es: {letraMayor1}</p>
              <p>La segunda letra más repetida es: {letraMayor2}</p>
            </div>
            <div>
              <label htmlFor="mensaje-decifrado">Mensaje decifrado</label>
              <textarea id="mensaje-limpio" value={decifrado} readOnly={true} />
            </div>
            <button className="btn" type="button" onClick={() => window.location.reload()}>Limpiar</button>
          </form>
        </section>
      </main>
    );
}

export default Encrypt