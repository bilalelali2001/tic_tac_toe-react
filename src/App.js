import './App.css';
import { useState, useEffect } from 'react';
import Square from './Components/Square';
import { Patterns } from './Patterns';

function App() {
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
  const [player, setPlayer] = useState("X");
  const [result, setResult] = useState({ winner: "none", state: "none" });

  useEffect(() => {
    checkWin();
    checkIfTie();
  }, [board]);

  useEffect(() => {
    if (result.state !== "none") {
      alert(`Game Finished! Winning player: ${result.winner}`);
      restartGame();
    }
  }, [result]);

  const chooseSquare = (square) => {
    setBoard(board.map((val, idx) => {
      if (idx === square && val === "") {
        return player;
      }
      return val;
    }));
  };

  const checkWin = () => {
    Patterns.forEach((currentPattern) => {
      const firstPlayer = board[currentPattern[0]];
      if (firstPlayer === "") return;
      let foundWinningPattern = true;
      currentPattern.forEach((idx) => {
        if (board[idx] !== firstPlayer) {
          foundWinningPattern = false;
        }
      });
      if (foundWinningPattern) {
        setResult({ winner: player, state: "won" });
        return; // Exit the function after setting the result
      }
    });

    // Toggle player only after checking for a win
    setPlayer(currentPlayer => (currentPlayer === "X" ? "O" : "X"));
  };

  const checkIfTie = () => {
    let filled = true;
    board.forEach((square) => {
      if (square === "") {
        filled = false;
      }
    });
    if (filled) {
      setResult({ winner: "No One", state: "Tie" });
    }
  };

  const restartGame = () => {
    setBoard(["", "", "", "", "", "", "", "", ""]);
    setPlayer("X"); // X starts after the game restarts
    setResult({ winner: "none", state: "none" });
  };
  return (
    <div className="App">
     <div className="board">
      <div className="row">
        <Square val={board[0]} chooseSquare={() => {chooseSquare(0)}} />
        <Square val={board[1]} chooseSquare={() => {chooseSquare(1)}} />
        <Square val={board[2]} chooseSquare={() => {chooseSquare(2)}} />
      </div>
      <div className="row">
      <Square val={board[3]} chooseSquare={() => {chooseSquare(3)}} />
        <Square val={board[4]} chooseSquare={() => {chooseSquare(4)}} />
        <Square val={board[5]} chooseSquare={() => {chooseSquare(5)}} />
      </div>
      <div className="row">
      <Square val={board[6]} chooseSquare={() => {chooseSquare(6)}} />
        <Square val={board[7]} chooseSquare={() => {chooseSquare(7)}} />
        <Square val={board[8]} chooseSquare={() => {chooseSquare(8)}} />
      </div>
      </div> 
    </div>
  );
}

export default App;
