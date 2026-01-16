import { useState } from 'react';
import TicTacToe from './components/TicTacToe';
import StartScreen from './components/StartScreen';

function App() {
  const [gameStarted, setGameStarted] = useState(false);

  if (!gameStarted) {
    return <StartScreen onStart={() => setGameStarted(true)} />;
  }

  return <TicTacToe onReset={() => setGameStarted(false)} />;
}

export default App;
