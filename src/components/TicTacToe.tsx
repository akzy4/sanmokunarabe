import { useState, useEffect } from 'react';
import './TicTacToe.css';

type Player = 'X' | 'O' | null;
type Board = Player[][];

interface TicTacToeProps {
  onReset: () => void;
}

export default function TicTacToe({ onReset }: TicTacToeProps) {
  const [board, setBoard] = useState<Board>([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]);
  const [currentPlayer, setCurrentPlayer] = useState<Player>('X');
  const [winner, setWinner] = useState<Player | null>(null);
  const [isDraw, setIsDraw] = useState(false);

  // 勝敗判定
  const checkWinner = (board: Board): Player | null => {
    // 横のチェック
    for (let row = 0; row < 3; row++) {
      if (
        board[row][0] &&
        board[row][0] === board[row][1] &&
        board[row][1] === board[row][2]
      ) {
        return board[row][0];
      }
    }

    // 縦のチェック
    for (let col = 0; col < 3; col++) {
      if (
        board[0][col] &&
        board[0][col] === board[1][col] &&
        board[1][col] === board[2][col]
      ) {
        return board[0][col];
      }
    }

    // 斜めのチェック（左上から右下）
    if (
      board[0][0] &&
      board[0][0] === board[1][1] &&
      board[1][1] === board[2][2]
    ) {
      return board[0][0];
    }

    // 斜めのチェック（右上から左下）
    if (
      board[0][2] &&
      board[0][2] === board[1][1] &&
      board[1][1] === board[2][0]
    ) {
      return board[0][2];
    }

    return null;
  };

  // 引き分け判定
  const isBoardFull = (board: Board): boolean => {
    return board.every(row => row.every(cell => cell !== null));
  };

  // マスをクリック
  const handleCellClick = (row: number, col: number) => {
    // 既にゲームが終了しているか、マスが埋まっている場合は何もしない
    if (winner || isDraw || board[row][col]) {
      return;
    }

    const newBoard = board.map(r => [...r]);
    newBoard[row][col] = currentPlayer;
    setBoard(newBoard);

    // 勝敗判定
    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
      return;
    }

    // 引き分け判定
    if (isBoardFull(newBoard)) {
      setIsDraw(true);
      return;
    }

    // プレイヤーを切り替え
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
  };

  // リセット
  const handleReset = () => {
    setBoard([
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ]);
    setCurrentPlayer('X');
    setWinner(null);
    setIsDraw(false);
  };

  return (
    <div className="tic-tac-toe">
      <div className="game-container">
        <h1 className="game-title">三目並べ</h1>
        
        <div className="status">
          {winner ? (
            <div className="winner-message">
              🎉 プレイヤー {winner} の勝利です！
            </div>
          ) : isDraw ? (
            <div className="draw-message">🤝 引き分けです！</div>
          ) : (
            <div className="current-player">
              現在のプレイヤー: <span className={`player-${currentPlayer.toLowerCase()}`}>{currentPlayer}</span>
            </div>
          )}
        </div>

        <div className="board">
          {board.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <button
                key={`${rowIndex}-${colIndex}`}
                className={`cell ${cell ? `cell-${cell.toLowerCase()}` : ''} ${
                  winner || isDraw ? 'cell-disabled' : ''
                }`}
                onClick={() => handleCellClick(rowIndex, colIndex)}
                disabled={!!cell || !!winner || isDraw}
              >
                {cell || ''}
              </button>
            ))
          )}
        </div>

        <div className="actions">
          <button className="reset-button" onClick={handleReset}>
            リセット
          </button>
          <button className="back-button" onClick={onReset}>
            スタート画面に戻る
          </button>
        </div>
      </div>
    </div>
  );
}
