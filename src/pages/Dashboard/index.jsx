import "./dashboard.css"

import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"

import { AuthContext } from "../../contexts/auth"
import { Sidebar } from "../../components/Sidebar"
import { Title } from "../../components/Title"

import { Backpack, Edit, Edit2, MessageSquare, Plus, Search } from "lucide-react"
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore"
import { db } from "../../services/FirebaseConnections"

const listRef = collection(db, "tickets")

export function Dashboard() {
   const { logout } = useContext(AuthContext)
   const [ tickets, setTickets ] = useState([])
   const [ loading, setLoading ] = useState(true)
   const [ isEmpty, setIsEmpty ] = useState(false)

   useEffect(()=>{
      async function loadTickets() {
         const q = query(listRef, orderBy('created', 'desc'), limit(5))

         const querySnapshot = await getDocs(q)
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
               client: doc.data().client,
               clientId: doc.data().clientId,
               subject: doc.data().subject,
               additional: doc.data().additional,
               status: doc.data().status
            })
         });
         setTickets(tickets => [...tickets, ...list])
      } else {
         setIsEmpty(true)
      }
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
                                 <td data-label="Cliente"> {item.client} </td>
                                 <td data-label="Topic"> {item.subject} </td>
                                 <td data-label="Status">
                                    <span className="badge" style={{ background: 'var(--gray400)' }}>
                                       {item.status}
                                    </span>
                                 </td>
                                 <td data-label="Registered in"> 14/06/24 </td>
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


                        <tr>
                           <td data-label="Cliente"> Marcado Litoral </td>
                           <td data-label="Topic"> Suporte </td>
                           <td data-label="Status">
                              <span className="badge" style={{ background: 'var(--gray400)' }}>
                                 Open
                              </span>
                           </td>
                           <td data-label="Registered in"> 14/06/24 </td>
                           <td data-label="#"> 
                              <button className="action" style={{background: 'var(--blue600)'}}>
                                 <Search color="#fff" size={17} /> 
                              </button>  
                              <button className="action" style={{background: 'var(--yellow500)'}}>
                                 <Edit2 color="#fff" size={17} />
                              </button>
                           </td>
                        </tr>
                     </tbody>
                  </table>
                  </>
               )}

            </>
         </div>
      </div>
   )
}