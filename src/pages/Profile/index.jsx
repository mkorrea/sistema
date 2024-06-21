import './profile.css'

import { Sidebar } from '../../components/Sidebar'
import { Title } from '../../components/Title'
import avatar from '../../assets/avatar.png'
import { AuthContext } from '../../contexts/auth'

import { useContext, useState } from 'react'
import { Settings, Upload } from 'lucide-react'
import { toast } from 'react-toastify'

import { doc, updateDoc } from 'firebase/firestore'
import { db, storage } from '../../services/FirebaseConnections'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'



export function Profile() {
   const { user, setUser, storageUser, logout } = useContext(AuthContext)

   const [ avatarUrl, setAvatarUrl ] = useState(user && user.avatarUrl)
   const [ imageFile, setImageFile ] = useState(null)
   const [ name, setName ] = useState(user && user.name)
   const [ email, setEmail ] = useState(user && user.email)
   

   function handleChangeImage(e) {
      if( e.target.files[0]) {
         const image = e.target.files[0]

         if(image.type === 'ìmage/jpeg' || image.type === 'image/png') {
            setImageFile(image)
            setAvatarUrl( URL.createObjectURL(image) )
         } else {
            toast.error('The image needs to be in JPEG or PNG format!')
            setImageFile(null)
            return
         }
      }
   }

   async function uploadPhoto(){
      const currentUid = user.uid

      const uploadRef = ref(storage, `images/${currentUid}/${imageFile.name}`)
      const uploadTask = uploadBytes(uploadRef, imageFile)
      .then( (snapshot)=>{
         getDownloadURL(snapshot.ref).then( async (downloadURl)=>{
            let urlPhoto = downloadURl
            const docRef = doc(db, 'users', user.uid)
            await updateDoc(docRef, {
               avatarUrl: urlPhoto,
               name
            })
            .then( ()=>{
               let data = {
                  ...user,
                  name,
                  avatarUrl: urlPhoto
               }
               setUser(data)
               storageUser(data)
               toast.success('Profile saved!')
            })
         } )
      })
   }

   async function handleSubmit(e) {
      e.preventDefault()

      if(imageFile === null && name !== '') {
         const docRef = doc(db, 'users', user.uid)
         await updateDoc(docRef, {
            name,
         })
         .then( ()=>{
            let data = {
               ...user,
               name
            }
            setUser(data)
            storageUser(data)
            toast.success('Profile saved!')
         })
      } else if (imageFile !== null && name !== '') {
         uploadPhoto()
      }
   }

   
   return (
      <section>
         <Sidebar />
         <div className='content'>
            <Title name='My account'>
               <Settings size={25} />
            </Title>

            <div className="container">
               <form className='form-profile' onSubmit={ handleSubmit }>
                  <label className="label-avatar">
                     <span>
                        <Upload color='#fff' size={25} />
                     </span>
                     <input type="file" accept='image/*' onChange={ handleChangeImage } /> <br />
                     {avatarUrl === null ? (
                        <img src={avatar} alt="Profile image" width={250} height={250}/>
                     ) : (
                        <img src={avatarUrl} alt="Profile image" width={250} height={250}/>
                     )}
                  </label>

                  <label>Name</label>
                  <input type="text" value={name} onChange={(e)=>setName(e.target.value)}/>

                  <label>Email</label>
                  <input type="text" value={email} disabled={true} />
                  
                  <button type="submit"> Save </button>
               </form>
            </div>

            <div className="container">
               <button className='logout-btn' onClick={ () => logout() }>Logout</button>
            </div>
         </div>


      </section>
   )
}