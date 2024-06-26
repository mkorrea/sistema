import "./dashboard.css"

import { useContext } from "react"
import { Link } from "react-router-dom"

import { AuthContext } from "../../contexts/auth"
import { Sidebar } from "../../components/Sidebar"
import { Title } from "../../components/Title"

import { Backpack, Edit, Edit2, MessageSquare, Plus, Search } from "lucide-react"

export function Dashboard() {
   const { logout } = useContext(AuthContext)

   async function handleLogout(){
      await logout()
   }
   

   return (
      <div>
         <Sidebar />
         <div className="content">
            <Title name="Dashboard" >
               <MessageSquare size={25} />
            </Title>

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



                     <tr>
                        <td data-label="Cliente"> Informatica </td>
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
         </div>
      </div>
   )
}