import './SignIn.css'

import { useState } from 'react'

import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom'

export function SignIn() {

   const [ email, setEmail ] = useState('')
   const [ password, setPassword ] = useState('')

   return (
      <div className='container-center'>
         <div className="login">
            <div className="login-area">
               <img src={logo} alt="Logo do sistema" />
            </div>
            <form>
               <h1>Entrar</h1>
               <input 
                  type="text"
                  placeholder='exemplo@email.com'
                  value={email}
                  onChange={ (e) => setEmail(e.target.value)}
               />
               <input 
                  type="password"
                  placeholder='******'
                  value={password}
                  onChange={ (e) => setPassword(e.target.value)}
               />

               <input type="submit" value="Acessar"/>
            </form>
            <Link to='/register'>Criar conta</Link>
         </div>
      </div>
   )
}