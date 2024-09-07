import './new.css'

import { useContext, useEffect, useState } from 'react'

import { Sidebar } from '../../components/Sidebar'
import { Title } from '../../components/Title'
import { PlusCircle } from 'lucide-react'
import { AuthContext } from '../../contexts/auth'
import { addDoc, collection, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore'
import { db } from '../../services/FirebaseConnections'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'

const listRef = collection(db, 'customers')

export function New() {
   const { user } = useContext(AuthContext)
   const { id } = useParams()

   const [ customers, setCustomers ] = useState([])
   const [ loadCustomer, setLoadCustomer ] = useState(true) 
   const [ selectedCustomer, setSelectedCustomer ] = useState(0) 

   const [ additional, setAdditional ] = useState('')
   const [ subject, setSubject ] = useState('Support')
   const [ status, setStatus ] = useState('Open')

   const [ editTicket, setEditTicket ] = useState(false)

   const navigate = useNavigate()
   
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

            if(id) {
               loadId(list)
            }
         })
         .catch((err)=>{
            console.log(err)
            setLoadCustomer(false)
            setCustomers([ {id: '1', fantasyName: 'Freela'} ])
         })
      }

      loadCustomer()
   }, [ id ])

   async function loadId(list) {
      const docRef = doc(db, "tickets", id)
      await getDoc(docRef)
      .then((snapshot)=>{

         let index = list.findIndex(item => item.id === snapshot.data().clientId)
         setSelectedCustomer(index)
         setSubject(snapshot.data().subject)
         setStatus(snapshot.data().status)
         setAdditional(snapshot.data().additional)
         console.log(snapshot)

         setEditTicket(true)
      })
      .catch((err)=>{
         console.log(err)
         toast.error("Unable to load ticket")
         setEditTicket(false)
      })
   }
   
   function handleChangeCustomer (e) { 
      setSelectedCustomer(e.target.value)
   }
   function handleChangeSelect (e) { 
      setSubject(e.target.value)
   }
   
   function handleChangeOption (e) {
      setStatus(e.target.value)
   }

   async function handleRegister(e) {
      e.preventDefault()

      if(editTicket){
         const docRef = doc(db, "tickets", id)
         await updateDoc(docRef, {
            client: customers[selectedCustomer].fantasyName,
            clientId: customers[selectedCustomer].id,
            subject,
            additional,
            status,
            userId: user.uid
         })
         .then( ()=>{
            toast.info("ticket successfully updated!")
            setSelectedCustomer[0] 
            setAdditional('')
            navigate("/dashboard")
         })
         .catch( (err)=>{
            toast.error("Whoops, error to update, try again later!")
            console.log(err)
         })
         return
      }
      

      await addDoc(collection(db, "tickets"), {
         created: new Date(),
         client: customers[selectedCustomer].fantasyName,
         clientId: customers[selectedCustomer].id,
         subject,
         additional,
         status,
         userId: user.uid
      })
      .then( ()=>{
         toast.success("New ticket registered!")
         setSelectedCustomer[0]
         setAdditional('')
      })
      .catch( (err)=>{
         toast.error("Whoops, error to submit, try again later!")
         console.log(err)
      })
   }
   
   return(
      <div>
         <Sidebar />
         
         <div className="content">
            <Title name={id ? "Update ticket" : "New ticket"}>
               <PlusCircle size={25}/>
            </Title>

            <div className="container">
               <form className="form-profile" onSubmit={handleRegister}>
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
                    <option value="Reports"> Reports </option>
                    <option value="User Management"> User Management </option>
                    <option value="System Maintenance"> System Maintenance </option>
                    <option value="Billing"> Billing </option>
                    <option value="Account Settings"> Account Settings </option>
                    <option value="Feedback"> Feedback </option>
                    <option value="Security"> Security </option>
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

                  <button> {id ? 'Update ticket' : 'Submit'} </button>
                  
               </form>
            </div>
         </div>

      </div>
   )
}