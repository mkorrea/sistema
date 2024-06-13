import { useState, createContext, useEffect } from "react";

export const AuthContext = createContext({})

export function AuthProvider( { children } ) {
   const [ user, setUser ] = useState(null)

   function signIn(email, password) {
      console.log(email)
      console.log(password)
      alert("foi")
   }
   
   return (
      <AuthContext.Provider 
         value={{ 
            signed: !!user, // !! transforma em boolean, nesse caso, como user é null = signed: false   ||  se tem algum dado dentro de user, !!user retorna "true"
            user,
            signIn
         }}
      >
      {[children]}
      </AuthContext.Provider> 
   )
}