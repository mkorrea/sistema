import "./dashboard.css"

import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"

import { AuthContext } from "../../contexts/auth"
import { Sidebar } from "../../components/Sidebar"
import { Title } from "../../components/Title"

import { Backpack, Edit, Edit2, Loader, MessageSquare, Plus, Search } from "lucide-react"
import { collection, getDocs, limit, orderBy, query, startAfter } from "firebase/firestore"
import { db } from "../../services/FirebaseConnections"
import { format } from "date-fns"

const listRef = collection(db, "tickets")

export function Dashboard() {
   
   const [ tickets, setTickets ] = useState([])
   const [ loading, setLoading ] = useState(true)

   const [ isEmpty, setIsEmpty ] = useState(false)
   const [ lastDoc, setLastDoc ] = useState()
   const [ loadingMore, setLoadingMore ] = useState(false)

   useEffect(()=>{
      async function loadTickets() {
         const q = query(listRef, orderBy('created', 'desc'), limit(5))

         const querySnapshot = await getDocs(q)
         setTickets([])
         updateState(querySnapshot)   

         setLoading(false)
      }

         loadTickets()
      

      return ()=>{

      }
   },[])

   async function updateState(querySnapshot){
      const isCollectionEmpty = querySnapshot.size === 0
      // se a lista de tickets nao estiver vazia:
      if(!isCollectionEmpty) {
         let list = []
         querySnapshot.forEach((doc) => {
            list.push({
               id: doc.id,
               created: doc.data().created,
               createdFormat: format(doc.data().created.toDate(), 'dd/MM/yyyy'),
               client: doc.data().client,
               clientId: doc.data().clientId,
               subject: doc.data().subject,
               additional: doc.data().additional,
               status: doc.data().status
            })
         });
         const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1] // taking last document
         setLastDoc(lastDoc)
         
         setTickets(tickets => [...tickets, ...list])
         setIsEmpty(false)
      } else {
         setIsEmpty(true)
      }
      setLoadingMore(false)
   }
   

   async function handleSearchMore() {
      setLoadingMore(true)

      const q = query(listRef, orderBy('created', 'desc'), startAfter(lastDoc), limit(5))
      const querySnapshot = await getDocs(q)
      await updateState(querySnapshot)
   }
   
   if(loading) {
      return(
         <div>
            <Sidebar />
         <div className="content">
            <Title name="Dashboard" >
               <MessageSquare size={25} />
            </Title>
         

            <div className="container dashboard">
               <span>Searching tickets...</span>
               <Loader className='loading-icon'/>
            </div>
         </div>     

         </div>
      )
   }

   return (
      <div>
         <Sidebar />
         <div className="content">
            <Title name="Dashboard" >
               <MessageSquare size={25} />
            </Title>

            <>
               

               {tickets.length === 0 ? (
                  <div className="container dashboard">
                     <span> No tickets found... </span>

                     <Link to="/dashboard/new" className="new">
                        <Plus color="#fff" size={25}/>
                        New ticket
                     </Link>
                  </div>
               ) : (
                  <>
                  <Link to="/dashboard/new" className="new">
                     <Plus color="#fff" size={25}/>
                     New ticket
                  </Link>

                  <table>
                     <thead>
                        <tr>
                           <th scope="col"> Client </th>
                           <th scope="col"> Topic </th>
                           <th scope="col"> Status </th>
                           <th scope="col"> Registered in </th>
                           <th scope="col"> # </th>
                        </tr>
                     </thead>

                     <tbody>
                        {tickets.map((item, index)=>{
                           return(
                              <tr key={index}>
                                 <td data-label="Client"> {item.client} </td>
                                 <td data-label="Topic"> {item.subject} </td>
                                 <td data-label="Status">
                                    <span className="badge" style={{ background: item.status === 'Open' ? 'var(--green500)' : 'var(--gray400)' }}>
                                       {item.status}
                                    </span>
                                 </td>
                                 <td data-label="Registered in"> {item.createdFormat} </td>
                                 <td data-label="#"> 
                                       <button className="action" style={{background: 'var(--blue600)'}}>
                                       <Search color="#fff" size={17} /> 
                                    </button>  
                                    <button className="action" style={{background: 'var(--yellow500)'}}>
                                       <Edit2 color="#fff" size={17} />
                                    </button>
                                 </td>
                              </tr>
                           )
                        })}


                     </tbody>
                  </table>

                  { loadingMore && <h3> Searching more tickets... </h3> }
                  { !loadingMore && !isEmpty && <button className="btn-more" onClick={ handleSearchMore }> Search more tickets </button> }
                  
                  </>
               )}

            </>
         </div>
      </div>
   )
}