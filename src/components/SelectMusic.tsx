import React from 'react'
import Bgm from '../audio/Dragon Quest III - Intermezzo.mp3'

const SelectMusic = () => {
  return (
    <div>
      <audio autoPlay loop>
        <source src={Bgm} type="audio/mpeg" />
      </audio>
    </div>
  )
}

export default SelectMusic
