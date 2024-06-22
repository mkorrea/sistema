import './sidebar.css'

import avatarImg from '../../assets/avatar.png'

import { useContext } from 'react'
import { AuthContext } from '../../contexts/auth'
import { Link } from 'react-router-dom'
import { Home, Settings, User } from 'lucide-react'

export function Sidebar() {
   const { user } = useContext(AuthContext)
    
   return (
      <div className="sidebar">
         <section>
            <img src={ user.avatarUrl === null ? avatarImg : user.avatarUrl } alt="User photo" />
            {/* <img src="https://github.com/mkorrea.png" alt="User photo" /> */}
         </section>

         <Link to='/dashboard'>
            <Home color='#fff' size={24} />
            Dashboard
         </Link>

         <Link to='/customers'>
            <User color='#fff' size={24} />
            Customers
         </Link>
         
         <Link to='/profile'>
            <Settings color='#fff' size={24} />
            Profile
         </Link>
      </div>
   )
}