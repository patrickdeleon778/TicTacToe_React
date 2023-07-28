import React, { useState } from 'react'
import Squares from './Squares'

const Board = () => {
    const [isX, setIsX] = useState(true);
    const [squares, setSquares] = useState(Array(9).fill(null));

    const handleClick = (i: number) => { // added :number because I kept getting an error most likely due to typescript.
        if (squares[i] || determineWinner(squares)) {
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

    const determineWinner = (squares: Array<number>) => { // Same thing like last time because of it being typescript again lol
        const row = [
            [0, 1, 2], // Top row from left to right
            [3, 4, 5], // Middle row from left to right
            [6, 7, 8], // Bottom row from left to right
            [0, 3, 6], // Left side all the way down
            [1, 4, 7], // Middle all the way down
            [2, 5, 8], // Right side all the way down
            [0, 4, 8], // First row first square, middle row second square and bottom row third square
            [2, 4, 6] // First row last square, middle row second square and bottom row first square
        ];

        for (let i = 0; i < row.length; i++){
            const [a, b, c] = row[i]; 
            if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
                return squares[a]; // to determine the winner [0, 1, 2] === [a, b, c]
            }
        }
        return null;
    }

    const tie = () => { // added a tie function for when the board is filled up 
      return squares.every(square => square !== null); // .every checks each square to see if it is not equal to null. meaning if the squares are already used.
    }

    const winner = determineWinner(squares);
    let status = '';

    if(winner){
        status = 'Winner: ' + winner;
    }
    else if(tie()){
        status = 'IT IS A FAT TIE';
    }
    else {
        status = 'Next player: ' + (isX ? 'X' : '0');
    }

  return (
    <div>
      <div className='status'>{status}</div>
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
