import React from 'react'

const Find = ({find,short}) => {
    return(
        <div>
            find countries: 
            <input id="search" value={find} onChange={short.handleSearchChange}/>
        </div>
    )

}
export default Find