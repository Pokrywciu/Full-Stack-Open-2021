import React from 'react'
import Country from './Country'

const Countries=({countries,button})=>{
    if(countries.length>10){
        return(
            <p>too many matches, specify another filter</p>
        )
    }
    
    if (countries.length==1){

        return(
            <ul>
            {countries.map(country=>
            <div>
                <h1>
                <Country country={country.name}/>
                </h1>
                <p>
                 Population: <Country country={country.population}/>
                 Capital: <Country country={country.capital}/>
                 <img style={{width: 350, height:250}} src={country.flag}/>
                </p>
            </div>
                )
            }
            </ul>
        )
    }
    else{
    return(
    <ul>
        {countries.map(country=>
            <div>
            <Country country={country.name}/>
            <button onClick={country}>show</button>
            </div>
            )
            
        }
    </ul>
)
    }
}
export default Countries
