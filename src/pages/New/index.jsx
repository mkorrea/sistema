import './new.css'

import { useContext, useEffect, useState } from 'react'

import { Sidebar } from '../../components/Sidebar'
import { Title } from '../../components/Title'
import { PlusCircle } from 'lucide-react'
import { AuthContext } from '../../contexts/auth'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../services/FirebaseConnections'

const listRef = collection(db, 'customers')

export function New() {
   const { user } = useContext(AuthContext)

   const [ customers, setCustomers ] = useState([])
   const [ loadCustomer, setLoadCustomer ] = useState(true) 
   const [ selectedCustomer, setSelectedCustomer ] = useState(0) 

   const [ additional, setAdditional ] = useState('')
   const [ subject, setSubject ] = useState('Support')
   const [ status, setStatus ] = useState('Open')


   useEffect( ()=>{
      async function loadCustomer() {
         const querySnapshot = await getDocs(listRef)
         .then((snapshot)=>{
            let list = []

            snapshot.forEach((doc)=>{
               list.push({
                  id: doc.id,
                  fantasyName: doc.data().fantasyName
               })
            })

            if(snapshot.docs.size === 0){
               console.log('No companies found!')
               setCustomers([ {id: '1', fantasyName: 'Freela'} ])
               setLoadCustomer(false)
               return
            }
            setCustomers(list)
            setLoadCustomer(false)
         })
         .catch((err)=>{
            console.log(err)
            setLoadCustomer(false)
            setCustomers([ {id: '1', fantasyName: 'Freela'} ])
         })
      }

      loadCustomer()
   }, [])

   function handleChangeCustomer (e) { 
      setSelectedCustomer(e.target.value)
   }
   function handleChangeSelect (e) { 
      setSubject(e.target.value)
   }
   
   function handleChangeOption (e) {
      setStatus(e.target.value)
   }
   
   return(
      <div>
         <Sidebar />
         
         <div className="content">
            <Title name="New ticket">
               <PlusCircle size={25}/>
            </Title>

            <div className="container">
               <form className="form-profile">
                  <label> Clients </label>
                     {
                        loadCustomer ? (
                           <input type='text' disabled={true}value='Loading...' />
                        ) : (
                           <select value={selectedCustomer} onChange={handleChangeCustomer}>
                              {customers.map((item, index)=>{
                                 return (
                                    <option key={index} value={index}> 
                                       {item.fantasyName} 
                                    </option>
                                 )
                              })}
                           </select>
                        )
                     }

                  
                  <label> Subject </label>
                     <select value={subject} onChange={ handleChangeSelect }>
                        <option value="Support"> Support </option>
                        <option value="Technical Visit"> Technical Visit </option>
                        <option value="Financial"> Financial </option>
                     </select>
                     
                  <label> Status </label>
                  <div className="status">
                     <input 
                        type="radio"
                        name='radio'
                        value="Open" 
                        onChange={ handleChangeOption }
                        checked={ status === 'Open'}
                        id="Open" 
                        />
                     <label htmlFor='Open'> Open </label>

                     <input 
                        type="radio"
                        name='radio'
                        value="Progress"  
                        onChange={ handleChangeOption }
                        checked={ status === 'Progress'}
                        id="Progress"  
                        />
                     <label htmlFor='Progress'> In progress </label>

                     <input 
                        type="radio"
                        name='radio'
                        value="Resolved"  
                        onChange={ handleChangeOption }
                        checked={ status === 'Resolved'}
                        id="Resolved"  
                     />
                     <label htmlFor='Resolved'> Resolved </label>
                  </div>
                  
                  <label> Additional info </label>
                  <textarea 
                     type="text"
                     placeholder='Describe your problem (optional)'
                     value={additional}
                     onChange={ (e)=>setAdditional(e.target.value) }
                  />

                  <button> Submit </button>
                  
               </form>
            </div>
         </div>

      </div>
   )
}