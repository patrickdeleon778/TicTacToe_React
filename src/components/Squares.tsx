// import React, { useState } from "react";
import hop from "../audio/hop dq.mp3"

interface Props {
  position: string | null;
  onSquare: () => void;
  className?: string;
  winningSound: number | null; // this prop is needed to stop the winning sound from being played when pressing a square
  player: string; // this prop is to stop the winning sound from playing before the user picks a symbol
}

const Squares = ({position, onSquare, className, winningSound, player}:Props) => {
    const getImage = () => {
        if (position === "BAT") { // if the current position is BAT then display the BAT image in the square
          return <img src='/src/images/DQVIII_-_Dracky.png' className="wiggle" alt="X" style={{maxWidth: "100%", maxHeight: "100%"}}/>;
        } else if (position === "SLIME") { // if the current position is SLIME then display the SLIME image in the square
          return <img src='/src/images/DQ-Slime.png' className="wiggle" alt="O" style={{maxWidth: "100%", maxHeight: "100%"}}/>;
        } else {
          return null;
        }
      };
    const playHop = () => { // function for the sound effect when you press a square
        if(player && !winningSound){
            const sound = new Audio(hop);
            sound.play();
        }
    }  
  return ( // displays the squares for the grid
    <div> 
      <button className={`square ${className}`} onClick={() => {onSquare(); playHop();}}>{getImage()}</button>
    </div>
  );
};

export default Squares;
