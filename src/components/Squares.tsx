import React, { useState } from "react";

interface Props {
  position: string | null;
  onSquare: () => void;
}

const Squares = ({position, onSquare}:Props) => {
    const getImage = () => {
        if (position === "BAT") {
          return <img src='/src/images/DQVIII_-_Dracky.png' alt="X" style={{maxWidth: "100%", maxHeight: "100%"}}/>;
        } else if (position === "SLIME") {
          return <img src='/src/images/DQ-Slime.png' alt="O" style={{maxWidth: "100%", maxHeight: "100%"}}/>;
        } else {
          return null;
        }
      };

  return (
    <div>
      <button className="square" onClick={onSquare}>{getImage()}</button>
    </div>
  );
};

export default Squares;
