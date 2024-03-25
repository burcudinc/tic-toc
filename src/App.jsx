import { useState } from 'react'
import './App.css'
import GameBoard from './components/GameBoard.jsx'
import PlayerInfo from './components/PlayerInfo.jsx';
import Log from './components/Log.jsx';
import GameOver from './components/GameOver.jsx';
import { WINNING_COMBINATIONS } from './winningCombination.js';

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
]; 


function derived(gameTurns) {
    let currentPlayer = 'X';
    if( gameTurns.length > 0 && gameTurns[0].player === 'X') {
      currentPlayer = 'O';
    }
    return currentPlayer;
}

function App() {

 // const [activePlayer, setActivePlayer] = useState('X');
  const [gameTurns, setGameTurns] = useState([]);
 // const [hasWinner, setHasWinner] = useState(false);

  const activePlayer = derived(gameTurns);

  let gameBoard = [...initialGameBoard.map(array => [...array])];
   for(const turn of gameTurns) {
    const {square, player} = turn;
    const {row, col} = square;
    gameBoard[row][col] = player;
   }

   let winner;
  for (const combitanition of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combitanition[0].row][combitanition[0].column]
    const secondSquareSymbol = gameBoard[combitanition[1].row][combitanition[1].column]
    const thirdSquareSymbol = gameBoard[combitanition[2].row][combitanition[2].column]
    

    if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
      winner = firstSquareSymbol;
    }
  }

  
  let hasDraw = gameTurns.length == 9 && !winner;
  function handleSelectedSquare(rowIndex, colIndex) {
   // setActivePlayer((currentActivePlayer) =>  currentActivePlayer === 'X' ? 'O' : 'X' );
    setGameTurns(prevTurns => {
      const currentPlayer = derived(prevTurns)
      const updatedTurns = [ { square: {row: rowIndex, col: colIndex}, player: currentPlayer } , ...prevTurns];
      return updatedTurns;
    })
  }

 function handleRematch() {
  setGameTurns([]);

 }
  
  return (
    <main>
      <div id='game-container'>
        <ol id='players' className='highlight-player'>
        <PlayerInfo initialName="Player 1" symbol="X" isActive={activePlayer === 'X'} />
        <PlayerInfo initialName="Player 2" symbol="O" isActive={activePlayer === 'O'} />
        </ol>
        { (winner || hasDraw ) && <GameOver onReStart={handleRematch} winner={winner} />}
        <GameBoard onSelectSquare={handleSelectedSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns}/>
    </main>
  )
}

export default App
