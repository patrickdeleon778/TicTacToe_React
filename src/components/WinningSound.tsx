import React from 'react'
import CritAudio from '../audio/DQII Crit sound-[AudioTrimmer.com].mp3';

const WinningSound = () => {
  return (
    <div>
      <audio autoPlay>
        <source src={CritAudio} type="audio/mpeg" />
      </audio>
    </div>
  )
}

export default WinningSound
