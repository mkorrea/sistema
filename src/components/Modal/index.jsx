import { X } from 'lucide-react'
import './modal.css'

export function Modal() {
   return (
      <div className='modal'>
         <div className="container">
            <button className="close">
               <X size={25} color='#fff' />
               Close
            </button>

            <main>
               <h2>Ticket details</h2>

               <div className="row">
                  <span>
                     Client: <i>igreja</i>
                  </span>
               </div>

               <div className="row">
                  <span>
                     Subject: <i>support</i>
                  </span>
                  <span>
                     Registered in: <i>14/06/24</i>
                  </span>
               </div>
               
               <div className="row">
                  <span>
                     Status: <i>Open</i>
                  </span>
               </div>

               <>
                  <h3> Addiction: </h3>
                  <p>
                  support to carinhasupport to carinhasupport to carinhasupport to carinhasupport to carinhasupport to carinhasupport to carinhasupport to carinhasupport to carinhasupport to carinhasupport to carinhasupport to carinhasupport to carinhasupport to carinhasupport to carinhasupport to carinhasupport to carinhasupport to carinhasupport to carinhasupport to carinhasupport to carinhasupport to carinhasupport to carinhasupport to carinhasupport to carinha
                  </p>
                  
               </>
            </main>
         </div>
      </div>
   )
}