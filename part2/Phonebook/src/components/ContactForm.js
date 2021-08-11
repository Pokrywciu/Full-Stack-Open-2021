import React from 'react'

const ContactForm =({addPerson, short})=>{
    return(
        <form onSubmit={addPerson}>
        <div>
          name: <input id="name" value={short.newName} onChange={short.handleNameChange}/>
          number: <input id="number" value={short.newNumber} onChange={short.handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>   
        </div>
      </form>
    )
}
export default ContactForm