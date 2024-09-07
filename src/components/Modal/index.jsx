import { X } from 'lucide-react'
import './modal.css'

export function Modal( {content, close} ) {
   return (
      <div className='modal'>
         <div className="close-bg" onClick={ close }></div>
         <div className="container">
            <button className="close" onClick={ close }>
               <X size={25} color='#fff' />
               Close
            </button>

            <main>
               <h2>Ticket details</h2>

               <div className="row">
                  <span>
                     Client: <i>{content.client}</i>
                  </span>
               </div>

               <div className="row">
                  <span>
                     Subject: <i> {content.subject} </i>
                  </span>
                  <span>
                     Registered in: <i> {content.createdFormat} </i>
                  </span>
               </div>
               
               <div className="row">
                  <span>
                     Status: <i className="badge" style={{ background: content.status === 'Open' ? 'var(--green500)' : 'var(--gray400)' }}> {content.status} </i>
                  </span>
               </div>

               {content.additional !== '' && (
                  <>
                     <h3> Addiction: </h3>
                     <p> {content.additional} </p>
                  </>
               )}
            </main>
         </div>
      </div>
   )
}