import './SignIn.css'

import { useState, useContext } from 'react'
import { AuthContext } from '../../contexts/auth'

import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom'

import { Loader } from 'lucide-react'

export function SignIn() {

   const [ email, setEmail ] = useState('')
   const [ password, setPassword ] = useState('')

   
   const  { signIn, loadingAuth } = useContext(AuthContext)

   async function handleSignIn(e) {
      e.preventDefault()

      if(email !== '' && password !== ''){
         await signIn(email, password)
      }
   }

   return (
      <div className='container-center'>
         <div className="login">
            <div className="login-area">
               <img src={logo} alt="Logo do sistema" />
            </div>
            <form onSubmit={handleSignIn}>
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

               <button type="submit"> 
                  {  
                     loadingAuth ? <Loader className='loading-icon'/> :  'Acessar'
                  }   
               </button>
            </form>
            <Link to='/register'>Criar conta</Link>
         </div>
      </div>
   )
}