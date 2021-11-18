import React from 'react'
import { useLayoutEffect } from 'react'

export const RaceInfo = ({ playerRace, setPlayerRace, allRaceInfo }) => {
    
    useLayoutEffect(() => {
      window.scrollTo({
        top: 0, 
        left: 0,
        behavior: "smooth"
      })
    }, [playerRace])
    
    
    
    
    return (
        <div>
            <h1>RaceInfo.jsx</h1>
        </div>
    )
}
