import React from 'react'
import Contact from './Contact'
import personService from '../services/persons'



const Contacts=({contacts, setPerson})=>{

    

    const del = (person) =>{

        const result = window.confirm(`Do you want to delete ${person.name}?`)
    if (result){
        personService
        .del(person.id)
          .then(response =>{
            setPerson(contacts.filter(item=>item!==person))
          })
      }
    }
return(
    <ul>
        {contacts.map(contact=>
        <div>
            <Contact key={contact.id} contact={contact}/>
            <button onClick={()=>del(contact)}>Delete</button>
        </div>
            )
        }
    </ul>
)
}
export default Contacts
