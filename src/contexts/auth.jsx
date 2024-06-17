import { useState, createContext, useEffect } from "react";
import { auth, db, storage } from '../services/FirebaseConnections'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


export const AuthContext = createContext({})

export function AuthProvider( { children } ) {
   const [ user, setUser ] = useState(null)

   const [ loadingAuth, setLoadingAuth ] = useState(false)

   const navigate = useNavigate()
   
   // logar user
   function signIn( email, password ) {
      setLoadingAuth(true)
      
      signInWithEmailAndPassword(auth, email, password)
      .then( async (value)=> {
         let uid = value.user.uid

         const docRef = doc(db, "users", uid)
         const docSnap = await getDoc(docRef)

         let userData = {
            uid,
            name: docSnap.data().name,
            email,
            avatarUrl: docSnap.data().avatarUrl
         }

         setUser(userData)
         storageUser(userData)
         setLoadingAuth(false)
         toast.success('Bem-vindo(a) de volta!')
      })
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
            storageUser(userData)
            setLoadingAuth(false)
            toast.success("Seja bem-vindo(a)!")
            navigate('/dashboard')
         })
      })
      .catch( (err) => {
         console.log(`erro ao cadastrar: ${err}`)
      })
   }

   function storageUser(data) {
      localStorage.setItem('@tickets', JSON.stringify(data))
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