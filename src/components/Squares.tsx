import React, { useState } from "react";

interface Props {
  position: string;
  onSquare: () => void;
}

const Squares = ({position, onSquare}:Props) => {

  return (
    <div>
      <button className="square" onClick={onSquare}>{position}</button>
    </div>
  );
};

export default Squares;
