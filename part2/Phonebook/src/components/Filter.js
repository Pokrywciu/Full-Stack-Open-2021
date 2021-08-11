import React from 'react'

const Filter =({filtr, short})=>{
    return(
        <div>
        filter shown with: 
        <input id="search" value={filtr} onChange={short.handleSearchChange}/>
      </div>
    )
}
export default Filter