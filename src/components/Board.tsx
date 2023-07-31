import React, { useState } from 'react'
import Squares from './Squares'
import SelectMusic from './SelectMusic';
import BackgroundMusic from './BackgroundMusic';
import WinningSound from './WinningSound';

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


const Board = () => {
    const [player, setPlayer] = useState(''); // useState to determine which player you will use. Defaulted to an empty string
    // const [reset, setReset] = useState(false);
    const [isX, setIsX] = useState(true);
    const [bgm, setBgm] = useState(false)
    const [selectBgm, setSelectBgm] = useState(false);
    const [play, setPlay] = useState(false);
    const [squares, setSquares] = useState(Array(9).fill(null)); // this use state sets an array of 9 and is all filled with type "null" which will later be filled with the 2 choices BAT or SLIME

    const handlePlay = () => { 
        setPlay(true); // sets to true to start the game
        setSelectBgm(true); // starts playing the select music 
        setBgm(false); // removes the bgm in case it was still active or not.
    }
    
    const handleClick = (i: number) => { // added :number because I kept getting an error most likely due to typescript.
        if (!player || squares[i] || determineWinner(squares)) { // this fixes some small bugs like double clicking the same square, etc
            return;
          }

        const nextSquares = squares.slice(); // creates a copy of the array 
        nextSquares[i] = isX ? "BAT" : "SLIME"; // this checks to see if the index of the players symbol is bat. If it is the bat symbol will be placed. If not the slime symbol will be placed on the square

        setSquares(nextSquares); // updates the square index depending on where it was clicked.
        setIsX(!isX); // sets to false for the next player
    }

    const handlePlayer = (character: string) => {
        setPlayer(character); // sets the character from the squares component
        setIsX(character === "BAT"); // sets character as BAT. if it's false it'll set it as SLIME
        setSelectBgm(false); // removes the select music for the bgm music to play
        setBgm(true); // adds the bgm back when reset
        // setSquares(Array(9).fill(null)); // resets the board back to empty
    }

    const handleReset = () => {
      setSquares(Array(9).fill(null)); // resets the board back to empty
      setPlayer(''); // resets the state so when you reset you can choose your player
      setSelectBgm(true); // adds the select screen music back when reset
      setBgm(false); // removes the bgm for the select screen music to play
    }

    // const handleSelectBgm = () => {
    //     setSelectBgm(true);
    // }

    const determineWinner = (squares: Array<number>) => { // Same thing like last time because of it being typescript again lol
        // const row = [
        //     [0, 1, 2], // Top row from left to right
        //     [3, 4, 5], // Middle row from left to right
        //     [6, 7, 8], // Bottom row from left to right     // MOVED THIS OUTSIDE OF THE FUNCTION SO IT'S MORE GLOBAL
        //     [0, 3, 6], // Left side all the way down
        //     [1, 4, 7], // Middle all the way down
        //     [2, 5, 8], // Right side all the way down
        //     [0, 4, 8], // First row first square, middle row second square and bottom row third square
        //     [2, 4, 6] // First row last square, middle row second square and bottom row first square
        // ];

        for (let i = 0; i < row.length; i++){
            const [a, b, c] = row[i]; 
            if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
                console.log(squares); // shows the array filled up with names
                return squares[a]; // to determine the winner [0, 1, 2] === [a, b, c]
            }
        }
        return null;
    }

    const tie = () => { // added a tie function for when the board is filled up 
      return squares.every(square => square !== null); // .every checks each square to see if it is not equal to null. meaning if the squares are already used.
    }

    const winner = determineWinner(squares); // grabs the winner and stores it in the winner variable
    let status = '';
    const winningRow = row.find(([a, b, c]) => squares[a] === winner && squares[b] === winner && squares[c] === winner); // .find checks if the first index of the rows array has a winning square in it for all 3.

    if(winner){
        // if (winningRow) {
            status = 'Winner: ' + winner;
        // }
    }
    else if(tie()){
        status = 'IT IS A FAT TIE';
    }
    else {
        status = `Next player: ${isX ? "BAT" : "SLIME"}`;
    }

  return (
    <div className='container'>
        {!play ? ( // if play is false it'll show the play button and remove the board and everything. I did this so I can have BGM in the beginning of the game due to the audio issue
        <>
            <div className="row mt-5">
                <div className="col d-flex justify-content-center align-items-center">
                    <img src='/src/images/Dragon_Quest_logo.png'/>
                </div>
            </div>
            <div className="row">
                <div className="col d-flex justify-content-center">
                    <button className="playBtn" onClick={handlePlay}>PLAY</button>
                </div>
            </div>
        </>
        ):( 
        <> 
            <div className="row mt-5">
                <div className="col">
                    {player ? <div className='status text-center'>{status}</div> :
                        <div className="text-center">
                            <button className="batBtn me-5" onClick={() => handlePlayer("BAT")}>
                                Play AS BAT
                            </button>
                            <button className="slimeBtn ms-5" onClick={() => handlePlayer("SLIME")}>
                                Play AS SLIME
                            </button>
                        </div>}
                </div>
            </div>

            <div className="row my-5">
                <div className="col">
                    <div className="board-row">
                        <Squares position={squares[0]} className={winner && winningRow && winningRow.includes(0) ? 'shake' : ''}onSquare={() => handleClick(0)}/>
                        <Squares position={squares[1]} className={winner && winningRow && winningRow.includes(1) ? 'shake' : ''}onSquare={() => handleClick(1)}/>
                        <Squares position={squares[2]} className={winner && winningRow && winningRow.includes(2) ? 'shake' : ''}onSquare={() => handleClick(2)}/>
                    </div>
                    <div className="board-row">
                        <Squares position={squares[3]} className={winner && winningRow && winningRow.includes(3) ? 'shake' : ''}onSquare={() => handleClick(3)}/>
                        <Squares position={squares[4]} className={winner && winningRow && winningRow.includes(4) ? 'shake' : ''}onSquare={() => handleClick(4)}/>
                        <Squares position={squares[5]} className={winner && winningRow && winningRow.includes(5) ? 'shake' : ''}onSquare={() => handleClick(5)}/>
                    </div>
                    <div className="board-row">
                        <Squares position={squares[6]} className={winner && winningRow && winningRow.includes(6) ? 'shake' : ''}onSquare={() => handleClick(6)}/>
                        <Squares position={squares[7]} className={winner && winningRow && winningRow.includes(7) ? 'shake' : ''}onSquare={() => handleClick(7)}/>
                        <Squares position={squares[8]} className={winner && winningRow && winningRow.includes(8) ? 'shake' : ''}onSquare={() => handleClick(8)}/> 
                    </div>
                </div>
            </div>

            <div className="row">
            <div className="col mt-5 d-flex justify-content-center">
                {winner || tie() ?  
                <>
                    <button className="symbolBtn my-5" onClick={handleReset}>PLAY AGAIN</button> 
                    <WinningSound/> 
                </> : null} 
            </div> 
            </div>
        </> // Audio BGM will activate when it is called in it's useStates
        )}
        {selectBgm && <SelectMusic/>} 
        {bgm && <BackgroundMusic/>}
        {/* {winningSound && <WinningSound/>} */}
    </div>
  );
}

export default Board
