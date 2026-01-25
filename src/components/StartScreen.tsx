import { useState } from 'react';
import './StartScreen.css';
import type { BoardSize } from '../types';

interface StartScreenProps {
  onStart: (boardSize: BoardSize) => void;
}

export default function StartScreen({ onStart }: StartScreenProps) {
  const [selectedSize, setSelectedSize] = useState<BoardSize>(3);

  const handleStart = () => {
    onStart(selectedSize);
  };

  return (
    <div className="start-screen">
      <div className="start-container">
        <h1 className="title">三目並べゲーム</h1>
        <h2 className="subtitle">Tic-Tac-Toe</h2>
        
        <div className="board-size-selection">
          <h3>ボードサイズを選択</h3>
          <div className="size-options">
            <button
              className={`size-option ${selectedSize === 3 ? 'selected' : ''}`}
              onClick={() => setSelectedSize(3)}
            >
              3×3
            </button>
            <button
              className={`size-option ${selectedSize === 4 ? 'selected' : ''}`}
              onClick={() => setSelectedSize(4)}
            >
              4×4
            </button>
            <button
              className={`size-option ${selectedSize === 5 ? 'selected' : ''}`}
              onClick={() => setSelectedSize(5)}
            >
              5×5
            </button>
          </div>
        </div>
        
        <div className="instructions">
          <h3>【遊び方】</h3>
          <ol>
            <li>プレイヤーXとOが交互に手を打ちます</li>
            <li>マスをクリックして手を打ちます</li>
            <li>{selectedSize}つ並べば勝利です（横・縦・斜め）</li>
            <li>すべてのマスが埋まると引き分けです</li>
          </ol>
          
          <div className="board-example">
            <h4>ボードの例:</h4>
            <div className="example-grid">
              <div className="example-cell">X</div>
              <div className="example-cell">O</div>
              <div className="example-cell">X</div>
              <div className="example-cell">O</div>
              <div className="example-cell">X</div>
              <div className="example-cell"></div>
              <div className="example-cell"></div>
              <div className="example-cell">O</div>
              <div className="example-cell"></div>
            </div>
          </div>
        </div>
        
        <button className="start-button" onClick={handleStart}>
          ゲームを開始
        </button>
      </div>
    </div>
  );
}
