import React from 'react'
import Contact from './Contact'

const Contacts=({contacts,search})=>{
return(
    <ul>
        {contacts.map(contact=>
            <Contact key={contact.id} contact={contact}/>
            )
        }
    </ul>
)
}
export default Contacts
