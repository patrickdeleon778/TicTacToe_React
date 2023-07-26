import React, { useState } from 'react'
import Squares from './Squares'

const Board = () => {
    const [isX, setIsX] = useState(true);
    const [squares, setSquares] = useState(Array(9).fill(null));

    const handleClick = (i: number) => { // added :number because I kept getting an error most likely due to typescript.
        if (squares[i]) {
            return;
          }
          
        const nextSquares = squares.slice();
        if(isX){
            nextSquares[i] = "X";
        }
        else{
            nextSquares[i] = "O";
        }
        setSquares(nextSquares);
        setIsX(!isX);
    }

  return (
    <div>
      <div className="board-row">
        <Squares position={squares[0]} onSquare={() => handleClick(0)}/>
        <Squares position={squares[1]} onSquare={() => handleClick(1)}/>
        <Squares position={squares[2]} onSquare={() => handleClick(2)}/>
      </div>
      <div className="board-row">
        <Squares position={squares[3]} onSquare={() => handleClick(3)}/>
        <Squares position={squares[4]} onSquare={() => handleClick(4)}/>
        <Squares position={squares[5]} onSquare={() => handleClick(5)}/>
      </div>
      <div className="board-row">
        <Squares position={squares[6]} onSquare={() => handleClick(6)}/>
        <Squares position={squares[7]} onSquare={() => handleClick(7)}/>
        <Squares position={squares[8]} onSquare={() => handleClick(8)}/>
      </div>
    </div>
  )
}

export default Board
