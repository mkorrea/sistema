import { useState, createContext, useEffect } from "react";
import { auth, db } from '../services/FirebaseConnections'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";


export const AuthContext = createContext({})

export function AuthProvider( { children } ) {
   const [ user, setUser ] = useState(null)

   const [ loadingAuth, setLoadingAuth ] = useState(false)
   
   // logar user
   function signIn( email, password ) {
      console.log(email)
      console.log(password)
      alert("foi")
   }
   
   // cadastrar novo user
   async function signUp( name, email, password ) {
      setLoadingAuth(true)
      await createUserWithEmailAndPassword(auth, email, password)
      .then( async (value) => {
         let uid = value.user.uid

         await setDoc(doc(db, 'users', uid), {
            name: name,
            avatarUrl: null,
         })
         .then( ()=> {
            let userData = {
               uid,
               name,
               email,
               avatarUrl: null
            }
            setUser(userData)
            setLoadingAuth(false)
         })
      })
      .catch( (err) => {
         console.log(`erro ao cadastrar: ${err}`)
      })
   }

   return (
      <AuthContext.Provider 
         value={{ 
            signed: !!user, // !! transforma em boolean, nesse caso, como user é null = signed: false   ||  se tem algum dado dentro de user, !!user retorna "true"
            user,
            signIn,
            signUp,
            loadingAuth
         }}
      >
      {[children]}
      </AuthContext.Provider> 
   )
}