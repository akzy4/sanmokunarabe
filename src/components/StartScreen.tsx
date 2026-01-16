import './StartScreen.css';

interface StartScreenProps {
  onStart: () => void;
}

export default function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="start-screen">
      <div className="start-container">
        <h1 className="title">三目並べゲーム</h1>
        <h2 className="subtitle">Tic-Tac-Toe</h2>
        
        <div className="instructions">
          <h3>【遊び方】</h3>
          <ol>
            <li>プレイヤーXとOが交互に手を打ちます</li>
            <li>マスをクリックして手を打ちます</li>
            <li>3つ並べば勝利です（横・縦・斜め）</li>
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
        
        <button className="start-button" onClick={onStart}>
          ゲームを開始
        </button>
      </div>
    </div>
  );
}
