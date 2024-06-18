import './SignUp.css'

import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth'

import logo from '../../assets/logo.png'
import { Loader } from 'lucide-react'

export function SignUp() {
   const [ name, setName ] = useState('')
   const [ email, setEmail ] = useState('')
   const [ password, setPassword ] = useState('')

   const  { signUp, loadingAuth } = useContext(AuthContext)

   async function handleRegister(e) {
      e.preventDefault()

      if ( name !== '' && email !== '' && password !== '') {
         await signUp( name, email, password )
      }
   }

    
   return (
      <div className='container-center'>
         <div className="login">
            <div className="login-area">
               <img src={logo} alt="Logo do sistema" />
            </div>
            <form onSubmit={handleRegister}>
               <h1>Nova conta</h1>
               <input 
                  type="text"
                  placeholder='Seu nome'
                  value={name}
                  onChange={ (e) => setName(e.target.value)}
               />
               <input 
                  type="text"
                  placeholder='exemplo@email.com'
                  value={email}
                  onChange={ (e) => setEmail(e.target.value)}
               />
               <input 
                  type="password"
                  placeholder='********'
                  value={password}
                  onChange={ (e) => setPassword(e.target.value)}
               />

               <button type="submit"> 
                  {
                     loadingAuth ? <Loader className='loading-icon'/> :  'Cadastrar'
                  }
               </button>
            </form>
            <Link to='/'>Já possui uma conta ? Faça login! </Link>
         </div>
      </div>
   )
}

