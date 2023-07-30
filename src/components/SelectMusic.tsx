import React from 'react'

const SelectMusic = () => {
  return (
    <div>
      <audio autoPlay loop>
        <source src="/src/audio/Dragon Quest III - Intermezzo.mp3" type="audio/mpeg" />
      </audio>
    </div>
  )
}

export default SelectMusic
