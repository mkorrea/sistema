import { Routes, Route } from 'react-router-dom'

import { SignIn } from '../pages/SignIn'
import { SignUp } from '../pages/SignUp'

import { Private } from './Private'

import { Dashboard } from '../pages/Dashboard'
import { Profile } from '../pages/Profile'
import { Customers } from '../pages/Customers'
import { New } from '../pages/New'

export function RoutesApp() {
   return (
      <Routes>
         <Route path='/' element={ <SignIn /> } />
         <Route path='/register' element={ <SignUp /> } />
         <Route path='/dashboard' element={ <Private> <Dashboard/> </Private> } />
         <Route path='/profile' element={ <Private> <Profile/> </Private> } />
         <Route path='/customers' element={ <Private> <Customers/> </Private> } />
         <Route path='/dashboard/new' element={ <Private> <New/> </Private> } />
      </Routes>
   )
}