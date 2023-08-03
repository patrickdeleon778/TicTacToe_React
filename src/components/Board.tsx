import React, { useEffect, useState } from 'react'
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
    const [count, setCount] = useState(0);
    const [enemyCount, setEnemyCount] = useState(0);
    const [computerSymbol, setComputerSymbol] = useState('');
    const [currentPlayer, setCurrentPlayer] = useState('');
    

    const handlePlay = () => { 
        setPlay(true); // sets to true to start the game
        setSelectBgm(true); // starts playing the select music 
        setBgm(false); // removes the bgm in case it was still active or not.
    }

    const handlePlayer = (character: string) => {
        setPlayer(character); // sets the character from the squares component
        setComputerSymbol(character === "BAT" ? "SLIME" : "BAT"); // Determine player's symbol based on their choice
        console.log("Selected character:", character);
        setIsX(character === "BAT"); // sets character as BAT. if it's false it'll set it as SLIME
        setSelectBgm(false); // removes the select music for the bgm music to play
        setBgm(true); // adds the bgm back when reset
        // setSquares(Array(9).fill(null)); // resets the board back to empty
        setCurrentPlayer(character); // set the same as setPlayer() so it'll be switched around
    }
    
    const handleClick = (i: number) => { // added :number because I kept getting an error most likely due to typescript.
        if (!player || squares[i] || determineWinner(squares)) { // this fixes some small bugs like double clicking the same square, etc
            return;
          }

        if(currentPlayer === player){

            const nextSquares = squares.slice(); // creates a copy of the array 
            nextSquares[i] = isX ? "BAT" : "SLIME"; // this checks to see if the index of the players symbol is bat. If it is the bat symbol will be placed. If not the slime symbol will be placed on the square

            setSquares(nextSquares); // updates the square index depending on where it was clicked.
            setIsX(!isX); // sets to false for the next player
            
            const winnerScore = determineWinner(nextSquares); // Check for the winner after updating squares
            if (winnerScore) {
                if (winnerScore.toString() !== player) { // Check if the winner is not the player
                    handleEnemyScore(); // increment the enemy's score if the player loses
                    // console.log(enemyCount);
                } else {
                    handleScore(); // increment the player's score if the player wins
                    // console.log(count);
                }
            }
            setCurrentPlayer(currentPlayer === 'BAT' ? 'SLIME' : 'BAT'); // switches currentPlayer to the opposite of the player
        }

    }

    const makeComputerMove = () => {
        if (!determineWinner(squares) && !tie() && currentPlayer !== player) { // if there is no winner and no tie and the current player doesn't equal the player it'll run the code below.
            const availableMoves = squares.reduce((accumulator, current, index) => {
                if (current === null) accumulator.push(index); //checks to see if a square is empty. if it is it pushes it to the accumulator
                return accumulator;
            }, []);

            if (availableMoves.length > 0) { // if there is an available move
                const randomIndex = Math.floor(Math.random() * availableMoves.length); // it gets a random number from the length of what moves are left
                const computerMove = availableMoves[randomIndex]; // variable that saves the computers move on the board where the random number generated
                const nextSquares = squares.slice(); // gets a copy of the current board
                
                nextSquares[computerMove] = computerSymbol; // adds the computers move onto the board using the computerSymbol save state which shows what the opposite symbol is to the player
                setSquares(nextSquares); // sets the state of the square in setSquares

                setCurrentPlayer(player); // sets this currentPlayer state back to equal the player so it repeats the cycle.
                setIsX(!isX); // changes back to the players turn
            }
        }
    };

    useEffect(() => {
        if (play && !selectBgm && currentPlayer !== player) { // if the game is active and the select screen BGM is off and the current player doesn't equal player then run the code below
            const computerMoveTimeout = setTimeout(makeComputerMove, 1000); // Delays for 1 second  
            return () => clearTimeout(computerMoveTimeout); // clears the setTimeout so it doesn't continually plays
        }
    }, [squares]); // dependancy array to make the useEffect run everytime the squares board is changed.
    

    useEffect(() => {
        const winnerScore = determineWinner(squares); // grabs the winner and stores it in the winner variable
        if (winnerScore) { // if the winner is true
            if (winnerScore.toString() !== player) { // if the score doesn't equal the player that means you lose
                handleEnemyScore(); // gives the enemy a point
            }
        }
    }, [squares]); // runs everytime the square board changes

    



    // const handlePlayer = (character: string) => {
    //     setPlayer(character); // sets the character from the squares component
    //     setComputerSymbol(character === "BAT" ? "SLIME" : "BAT"); // Determine player's symbol based on their choice
    //     console.log("Selected character:", character);
    //     setIsX(character === "BAT"); // sets character as BAT. if it's false it'll set it as SLIME
    //     setSelectBgm(false); // removes the select music for the bgm music to play
    //     setBgm(true); // adds the bgm back when reset
    //     setCurrentPlayer(character);
    //     // setSquares(Array(9).fill(null)); // resets the board back to empty
    // }

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
                // console.log(squares); // shows the array filled up with names
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


    const handleScore = () => {
        setCount(count => count + 1);
    }
    const handleEnemyScore = () => {
        setEnemyCount(enemyCount => enemyCount + 1);
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
                <div className="col d-flex justify-content-center align-items-center">
                    <div className="row">
                        {player === 'BAT' ? (
                            <>
                                <div className="row">
                                    <div className="col-md-12">
                                        <p className='indicator text-center floater'>YOU</p>
                                    </div>
                                    <div className="col-md-12 d-flex justify-content-center mb-5">
                                        <img src="/src/images/arrow pointing down.png"  className='floater' alt="" style={{width: "100px", height: "100px"}}/>
                                    </div>
                                </div>
                                
                                <div className="col d-flex justify-content-center align-items-center">
                                    <img src="/src/images/DQVIII_-_Dracky.png" alt="" style={{width: "300px", height: "200px"}}/>
                                </div>
                                <div className="col d-flex justify-content-center align-items-center">
                                    <p className='score'>{count}</p>
                                </div>
                            </>
                        ) : player === 'SLIME' ?
                            <>  
                                <div className="row">
                                    <div className="col-md-12">
                                        <p className='indicator text-center floater'>YOU</p>
                                    </div>
                                    <div className="col-md-12 d-flex justify-content-center mb-5">
                                        <img src="/src/images/arrow pointing down.png" className='floater' alt="" style={{width: "100px", height: "100px"}}/>
                                    </div>
                                </div>

                                <div className="col d-flex justify-content-center align-items-center">
                                    <img src="/src/images/DQ-Slime.png" alt="" style={{width: "200px", height: "200px"}}/>
                                </div>
                                <div className="col d-flex justify-content-center align-items-center">
                                    <p className='score'>{count}</p>
                                </div>
                            </> : null}
                    </div>
                </div>
                <div className="col">
                    <div className="board-row">
                        <Squares position={squares[0]} className={winner && winningRow && winningRow.includes(0) ? 'shake' : ''}onSquare={() => handleClick(0)} winningSound={winner} player={player}/>
                        <Squares position={squares[1]} className={winner && winningRow && winningRow.includes(1) ? 'shake' : ''}onSquare={() => handleClick(1)} winningSound={winner} player={player}/>
                        <Squares position={squares[2]} className={winner && winningRow && winningRow.includes(2) ? 'shake' : ''}onSquare={() => handleClick(2)} winningSound={winner} player={player}/>
                    </div>
                    <div className="board-row">
                        <Squares position={squares[3]} className={winner && winningRow && winningRow.includes(3) ? 'shake' : ''}onSquare={() => handleClick(3)} winningSound={winner} player={player}/>
                        <Squares position={squares[4]} className={winner && winningRow && winningRow.includes(4) ? 'shake' : ''}onSquare={() => handleClick(4)} winningSound={winner} player={player}/>
                        <Squares position={squares[5]} className={winner && winningRow && winningRow.includes(5) ? 'shake' : ''}onSquare={() => handleClick(5)} winningSound={winner} player={player}/>
                    </div>
                    <div className="board-row">
                        <Squares position={squares[6]} className={winner && winningRow && winningRow.includes(6) ? 'shake' : ''}onSquare={() => handleClick(6)} winningSound={winner} player={player}/>
                        <Squares position={squares[7]} className={winner && winningRow && winningRow.includes(7) ? 'shake' : ''}onSquare={() => handleClick(7)} winningSound={winner} player={player}/>
                        <Squares position={squares[8]} className={winner && winningRow && winningRow.includes(8) ? 'shake' : ''}onSquare={() => handleClick(8)} winningSound={winner} player={player}/> 
                    </div>
                </div>
                <div className="col d-flex justify-content-center align-items-center">
                    <div className="row">
                        {player === 'BAT' ? (
                            <>
                                <div className="row">
                                    <div className="col-md-12">
                                        <p className='indicator text-center floater'>ENEMY</p>
                                    </div>
                                    <div className="col-md-12 d-flex justify-content-center mb-5">
                                        <img src="/src/images/arrow pointing down.png" className='floater' alt="Arrow down" style={{width: "100px", height: "100px"}}/>
                                    </div>
                                </div>

                                <div className="col d-flex justify-content-center align-items-center">
                                    <img src="/src/images/DQ-Slime.png" alt="Slime" style={{width: "200px", height: "200px"}}/>
                                </div>
                                <div className="col d-flex justify-content-center align-items-center">
                                    <p className='score'>{enemyCount}</p>
                                </div>
                            </>
                        ) : player === 'SLIME' ?
                            <>
                                <div className="row">
                                    <div className="col-md-12">
                                        <p className='indicator text-center floater'>ENEMY</p>
                                    </div>
                                    <div className="col-md-12 d-flex justify-content-center mb-5">
                                        <img src="/src/images/arrow pointing down.png" className='floater' alt="Arrow down" style={{width: "100px", height: "100px"}}/>
                                    </div>
                                </div>

                                <div className="col d-flex justify-content-center align-items-center">
                                    <img src="/src/images/DQVIII_-_Dracky.png" alt="" style={{width: "300px", height: "200px"}}/>
                                </div>
                                <div className="col d-flex justify-content-center align-items-center">
                                    <p className='score'>{enemyCount}</p>
                                </div>
                            </> : null}
                    </div>
                </div>
            </div>

            <div className="row">
            <div className="col mt-5 d-flex justify-content-center">
                {winner ?  
                <>
                    <button className="symbolBtn my-5" onClick={handleReset}>PLAY AGAIN</button> 
                    <WinningSound/> 
                </> : tie() ?
                    <button className="symbolBtn my-5" onClick={handleReset}>PLAY AGAIN</button> 
                    : null
                } 
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
