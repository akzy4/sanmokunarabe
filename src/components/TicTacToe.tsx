import { useState, useEffect } from 'react';
import './TicTacToe.css';
import type { BoardSize } from '../types';

type Player = 'X' | 'O' | null;
type Board = Player[][];

interface TicTacToeProps {
  boardSize: BoardSize;
  onReset: () => void;
}

export default function TicTacToe({ boardSize, onReset }: TicTacToeProps) {
  // ボード初期化関数
  const createEmptyBoard = (size: BoardSize): Board => {
    return Array(size).fill(null).map(() => Array(size).fill(null));
  };

  const [board, setBoard] = useState<Board>(() => createEmptyBoard(boardSize));
  const [currentPlayer, setCurrentPlayer] = useState<Player>('X');
  const [winner, setWinner] = useState<Player | null>(null);
  const [isDraw, setIsDraw] = useState(false);

  // boardSize propの変更を検知してボードを再初期化
  useEffect(() => {
    setBoard(createEmptyBoard(boardSize));
    setCurrentPlayer('X');
    setWinner(null);
    setIsDraw(false);
  }, [boardSize]);

  // 勝敗判定
  const checkWinner = (board: Board, size: BoardSize): Player | null => {
    // 横のチェック
    for (let row = 0; row < size; row++) {
      const firstCell = board[row][0];
      if (!firstCell) continue;

      let isWin = true;
      for (let col = 1; col < size; col++) {
        if (board[row][col] !== firstCell) {
          isWin = false;
          break;
        }
      }
      if (isWin) {
        return firstCell;
      }
    }

    // 縦のチェック
    for (let col = 0; col < size; col++) {
      const firstCell = board[0][col];
      if (!firstCell) continue;

      let isWin = true;
      for (let row = 1; row < size; row++) {
        if (board[row][col] !== firstCell) {
          isWin = false;
          break;
        }
      }
      if (isWin) {
        return firstCell;
      }
    }

    // 斜めのチェック（左上から右下）
    const topLeftCell = board[0][0];
    if (topLeftCell) {
      let isWin = true;
      for (let i = 1; i < size; i++) {
        if (board[i][i] !== topLeftCell) {
          isWin = false;
          break;
        }
      }
      if (isWin) {
        return topLeftCell;
      }
    }

    // 斜めのチェック（右上から左下）
    const topRightCell = board[0][size - 1];
    if (topRightCell) {
      let isWin = true;
      for (let i = 1; i < size; i++) {
        if (board[i][size - 1 - i] !== topRightCell) {
          isWin = false;
          break;
        }
      }
      if (isWin) {
        return topRightCell;
      }
    }

    return null;
  };

  // 引き分け判定
  const isBoardFull = (board: Board, size: BoardSize): boolean => {
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        if (board[row][col] === null) {
          return false;
        }
      }
    }
    return true;
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
    const newWinner = checkWinner(newBoard, boardSize);
    if (newWinner) {
      setWinner(newWinner);
      return;
    }

    // 引き分け判定
    if (isBoardFull(newBoard, boardSize)) {
      setIsDraw(true);
      return;
    }

    // プレイヤーを切り替え
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
  };

  // リセット
  const handleReset = () => {
    setBoard(createEmptyBoard(boardSize));
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

        <div 
          className="board"
          style={{ gridTemplateColumns: `repeat(${boardSize}, 1fr)` }}
        >
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
