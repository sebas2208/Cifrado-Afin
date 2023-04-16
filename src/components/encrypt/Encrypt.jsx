import React from "react"
import './encrypt.css'
import { useState } from "react";
import diacritics from "diacritics";

const Encrypt = () => {
    const [mensajeCifrar, setMensajeCifrar] = useState('');
    const [mensajeDescifrar, setMensajeDescifrar] = useState('');
    const [claveA, setClaveA] = useState(0);
    const [claveB, setClaveB] = useState(0);
    const [cifrado, setCifrado] = useState('');
    const [decifrado, setDecifrado] = useState('');
    const [estadisticas, setEstadisticas] = useState({});
    
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
          const posicionCifrada = (claveA * posicionOriginal + claveB) % mod;
          const letraCifrada = alfabeto[posicionCifrada];
          encriptado += letraCifrada;
        } else {
          encriptado += letraOriginal;
        }  
      }
      console.log(getPosicionOriginal('K'));
      console.log(((getPosicionOriginal('E') - getPosicionOriginal('K'))*(encontrarModuloInverso(4,mod))%mod));
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

    const decifrarTexto = () => {
      let desencriptado = '';
      const aInverso = encontrarModuloInverso(claveA, alfabeto.length);
      for (let i = 0; i < cifrado.length; i++) {
        const charIndex = alfabeto.indexOf(cifrado[i].toUpperCase());
        if (charIndex === -1) {
          desencriptado -= cifrado[i];
        } else {
          const desencriptadoCharIndex = aInverso * (charIndex - claveB + alfabeto.length) % alfabeto.length;
          desencriptado += alfabeto[desencriptadoCharIndex];
        }
      }
      setDecifrado(desencriptado);
      console.log(contarLetrasRepetidas(mensajeDescifrar));
    };
    
    const calcularClaves = (letra1, letra2) => {
      setClaveB = getPosicionOriginal(letra2);
      setClaveA = (getPosicionOriginal(letra1) - getPosicionOriginal(letra2))
    }

    const negativo = (num) => {
      return num + mod;
    }

    const contarLetrasRepetidas = (texto) => {
      let letrasRepetidas = {};
      for (let i = 0; i < texto.length; i++) {
        const letra = texto[i];
        if (alfabeto.includes(letra)) {
          if (letra in letrasRepetidas) {
            letrasRepetidas[letra]++;
          } else {
            letrasRepetidas[letra] = 1;
          }
        }
      }
      return letrasRepetidas;
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
              <input type="number" id="claveA" defaultValue={0} value={claveA} onChange={(e) => setClaveA(parseInt(e.target.value))} />
            </div>
            <div>
              <label htmlFor="claveB">Valor de b:</label>
              <input type="number" id="claveB" defaultValue={0} value={claveB} onChange={(e) => setClaveB(parseInt(e.target.value))} />
            </div>
            <button type="button" onClick={cifrarTexto}>Cifrar</button>
          </form>
          <div>
              <label htmlFor="mensaje-cifrado">Mensaje cifrado:</label>
              <textarea id="mensaje-cifrado" value={cifrado} readOnly={true} />
            </div>
        </section>
        <section>
          <h2>Decifrado de texto</h2>
          <form>
            <div>
              <label htmlFor="mensaje-a-decifrar">Mensaje a descifrar:</label>
              <textarea id="mensaje-a-decifrar" value={mensajeDescifrar} onChange={(e) => setMensajeDescifrar(e.target.value)}/>
            </div>
            <button type="button" onClick={decifrarTexto}>Descifrar</button>
            <div>
              <label htmlFor="mensaje-decifrado">Mensaje decifrado</label>
              <textarea id="mensaje-limpio" value={decifrado} readOnly={true} />
            </div>
          </form>
        </section>
        <section>
          <h2>Estadísticas del texto</h2>
          <form>
            <div>
              <button type="button">Contar letras repetidas</button>
              <div></div>
            </div>
          </form>
        </section>
      </main>
    );
}

export default Encrypt