import React, { useState } from "react";

interface Props {
  position: string | null;
  onSquare: () => void;
  className?: string;
}

const Squares = ({position, onSquare, className}:Props) => {
    const getImage = () => {
        if (position === "BAT") { // if the current position is BAT then display the BAT image in the square
          return <img src='/src/images/DQVIII_-_Dracky.png' alt="X" style={{maxWidth: "100%", maxHeight: "100%"}}/>;
        } else if (position === "SLIME") { // if the current position is SLIME then display the SLIME image in the square
          return <img src='/src/images/DQ-Slime.png' alt="O" style={{maxWidth: "100%", maxHeight: "100%"}}/>;
        } else {
          return null;
        }
      };

  return ( // displays the squares for the grid
    <div> 
      <button className={`square ${className}`} onClick={onSquare}>{getImage()}</button>
    </div>
  );
};

export default Squares;
