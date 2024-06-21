import { useState } from "react";

import { Sidebar } from "../../components/Sidebar";
import { Title } from "../../components/Title";

import { User } from "lucide-react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../services/FirebaseConnections";
import { toast } from "react-toastify";

export function Customers() {
   const [ name, setName ] = useState('')
   const [ cnpj, setCnpj ] = useState('')
   const [ address, setAddress ] = useState('')

   async function handleRegister(e) {
      e.preventDefault()

      if(name !== '' && cnpj !== '' && address !== '') {
         await addDoc(collection(db, 'customers'), {
            fantasyName: name,
            cnpj,
            address
         })
         .then( ()=>{
            setName('')
            setCnpj('')
            setAddress('')
            toast.success('Company saved successfully')
         })
         .catch( (err)=>{
            console.log(err)
            toast.error('Error during registration')
         })
      } else {
         toast.error('Please fill out all the fields')
      }
   }
   
   
   return(
      <div>
         <Sidebar />

         <div className="content">
            <Title name="Customers">
               <User size={25} />
            </Title>

            <div className="container">
               <form className="form-profile" onSubmit={ handleRegister }>
                  <label>Fantasy name</label>
                  <input 
                     type="text" 
                     placeholder="Company name"
                     value={name}
                     onChange={ (e)=> setName(e.target.value)}
                  />

                  <label>CNPJ</label>
                  <input 
                     type="text" 
                     placeholder="Enter the CNPJ"
                     value={cnpj}
                     onChange={ (e)=> setCnpj(e.target.value)}
                  />

                  <label>Address</label>
                  <input 
                     type="text" 
                     placeholder="Enter the company address"
                     value={address}
                     onChange={ (e)=> setAddress(e.target.value)}
                  />
                  
                  <button type="submit">
                     Save
                  </button>
               </form>
            </div>
         </div>

         
      </div>
   )
}