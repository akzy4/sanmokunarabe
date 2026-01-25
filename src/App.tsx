import { useState } from 'react';
import TicTacToe from './components/TicTacToe';
import StartScreen from './components/StartScreen';
import type { BoardSize } from './types';

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [boardSize, setBoardSize] = useState<BoardSize>(3);

  const handleStart = (selectedBoardSize: BoardSize) => {
    setBoardSize(selectedBoardSize);
    setGameStarted(true);
  };

  const handleReset = () => {
    setGameStarted(false);
    setBoardSize(3);
  };

  if (!gameStarted) {
    return <StartScreen onStart={handleStart} />;
  }

  return <TicTacToe boardSize={boardSize} onReset={handleReset} />;
}

export default App;
