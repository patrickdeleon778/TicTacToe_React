import React from 'react'

const BackgroundMusic = () => {
  return (
    <div>
      <audio autoPlay loop>
        <source src="/src/audio/Dragon Quest III GBC Battle Theme.mp3" type="audio/mpeg" />
      </audio>
    </div>
  )
}

export default BackgroundMusic
