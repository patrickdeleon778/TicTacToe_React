import React from 'react'
import OGBgm from '../audio/Dragon Quest III GBC Battle Theme.mp3';

const BackgroundMusic = () => {
  return (
    <div>
      <audio autoPlay loop>
        <source src={OGBgm} type="audio/mpeg" />
      </audio>
    </div>
  )
}

export default BackgroundMusic
