import { useState, createContext, useEffect } from "react";
import { auth, db, storage } from '../services/FirebaseConnections'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


export const AuthContext = createContext({})

export function AuthProvider( { children } ) {
   const [ user, setUser ] = useState(null)

   const [ loadingAuth, setLoadingAuth ] = useState(false)
   const [ loading, setLoading ] = useState(true)
   const navigate = useNavigate()
   
   useEffect( ()=>{
      async function loadUser(){
         const storageUser = localStorage.getItem('@tickets')

         if(storageUser) {
            setUser(JSON.parse(storageUser))
            setLoading(false)
         }
         setLoading(false)
      }

      loadUser()
   }, [])

   // logar user
   async function signIn( email, password ) {
      setLoadingAuth(true)
      
      await signInWithEmailAndPassword(auth, email, password)
      .then( async (value)=> {
         let uid = value.user.uid

         const docRef = doc(db, 'users', uid)
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
         toast.success("Welcome!")
         navigate('/dashboard')
      })
      .catch( (err) => {
         console.log(`error: ${err}`)
         setLoadingAuth(false)
         toast.error('Whoops, something is missing!')
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
            toast.success("Welcome!")
            navigate('/dashboard')
         })
      })
      .catch( (err) => {
         console.log(`error: ${err}`)
         setLoadingAuth(false)
         toast.error('Whoops, something is missing!')
      })
   }


   // logout user
   async function logout() {
      await signOut(auth)
      localStorage.removeItem('@tickets')
      setUser(null)
   }
   
   
   function storageUser(data) {
      localStorage.setItem('@tickets', JSON.stringify(data))
   }

   return (
      <AuthContext.Provider 
         value={{ 
            signed: !!user, // !! transforma em boolean, nesse caso, como user é null = signed: false   ||  se tem algum dado dentro de user, !!user retorna "true"
            user,
            setUser,
            signIn,
            signUp,
            logout,
            loadingAuth,
            loading,
            storageUser
         }}
      >
      {[children]}
      </AuthContext.Provider> 
   )
}