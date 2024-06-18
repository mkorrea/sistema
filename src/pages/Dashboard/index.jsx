import { useContext } from "react"
import { AuthContext } from "../../contexts/auth"
import { Sidebar } from "../../components/Sidebar"

export function Dashboard() {
   const { logout } = useContext(AuthContext)

   async function handleLogout(){
      await logout()
   }
   

   return (
      <div>
         <Sidebar />
         <h1>Dashboard</h1>
         <button onClick={handleLogout}>Leave</button>
      </div>
   )
}