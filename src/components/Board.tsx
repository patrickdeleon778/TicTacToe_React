import React, { useState } from 'react'
import Squares from './Squares'

const Board = () => {
    const [player, setPlayer] = useState('');
    const [reset, setReset] = useState(false);
    const [isX, setIsX] = useState(true);
    const [squares, setSquares] = useState(Array(9).fill(null)); // this use state sets an array of 9 and is all filled with type "null" which will later be filled with the 2 choices BAT or SLIME

    const handleClick = (i: number) => { // added :number because I kept getting an error most likely due to typescript.
        if (!player || squares[i] || determineWinner(squares)) {
            return;
          }

        const nextSquares = squares.slice();

        // if(isX){
        //     nextSquares[i] = "BAT";
        // }
        // else{
        //     nextSquares[i] = "SLIME";
        // }

        nextSquares[i] = isX ? "BAT" : "SLIME";
        setSquares(nextSquares);
        setIsX(!isX);
    }

    const handlePlayer = (character: string) => {
        setPlayer(character);
        setIsX(character === "BAT");
        // setSquares(Array(9).fill(null)); // resets the board back to empty
    }

    const handleReset = () => {
      setSquares(Array(9).fill(null)); // resets the board back to empty
      setPlayer(''); // resets the state so when you reset you can choose your player
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
        status = `Next player: ${isX ? "BAT" : "SLIME"}`;
    }

  return (
    <div className='container'>
        <div className="row mt-5">
            <div className="col">
                {player ? <div className='status text-center'>{status}</div> :
                    <div className="text-center">
                    <button className="symbol-btn me-5" onClick={() => handlePlayer("BAT")}>
                      Play AS BAT
                    </button>
                    <button className="symbol-btn ms-5" onClick={() => handlePlayer("SLIME")}>
                      Play AS SLIME
                    </button>
                  </div>
                }
            </div>
        </div>

        <div className="row my-5">
            <div className="col">
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
        </div>

        <div className="row">
          <div className="col my-5 d-flex justify-content-center">
            {winner || tie() ? <button className="my-5" onClick={handleReset}>RESET?</button> : null} 
          </div>
        </div>
    </div>
  )
}

export default Board
