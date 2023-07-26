import React, { useState } from "react";

interface Props {
  position: string;
  onSquare: () => void;
}

const Squares = ({position, onSquare}:Props) => {

    // const [value, setValue] = useState('');


//   const handleClick = () => {
//     setValue('X');
//   };

  return (
    <div>
      <button className="square" onClick={onSquare}>{position}</button>
    </div>
  );
};

export default Squares;
