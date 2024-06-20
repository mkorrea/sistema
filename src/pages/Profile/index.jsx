import './profile.css'

import { Sidebar } from '../../components/Sidebar'
import { Title } from '../../components/Title'
import avatar from '../../assets/avatar.png'
import { AuthContext } from '../../contexts/auth'

import { useContext, useState } from 'react'
import { Settings, Upload } from 'lucide-react'



export function Profile() {
   const { user } = useContext(AuthContext)

   const [ avatarUrl, setAvatarUrl ] = useState(user && user.avatarUrl)
   
   return (
      <section>
         <Sidebar />
         <div className='content'>
            <Title name='My account'>
               <Settings size={25} />
            </Title>

            <div className="container">
               <form className='form-profile'>
                  <label className="label-avatar">
                     <span>
                        <Upload color='#fff' size={25} />
                     </span>
                     <input type="file" accept='image/*' /> <br />
                     {avatarUrl === null ? (
                        <img src={avatar} alt="Profile image" width={250} height={250}/>
                     ) : (
                        <img src={avatarUrl} alt="Profile image" width={250} height={250}/>
                     )}
                  </label>

                  <label>Name</label>
                  <input type="text" placeholder='Your name' />

                  <label>Email</label>
                  <input type="text" placeholder='@gmail' disabled={true} />
                  
                  <button type="submit"> Save </button>
               </form>
            </div>

            <div className="container">
               <button className='logout-btn'>Logout</button>
            </div>
         </div>


      </section>
   )
}