import readline from 'readline';

type Player = 'X' | 'O' | null;
type Board = Player[][];

class TicTacToe {
  private board: Board;
  private currentPlayer: Player;
  private rl: readline.Interface;

  constructor() {
    this.board = [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ];
    this.currentPlayer = 'X';
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  // ボードを表示
  private displayBoard(): void {
    console.log('\n現在のボード:');
    console.log('  0   1   2');
    this.board.forEach((row, i) => {
      const rowStr = row.map(cell => cell || ' ').join(' | ');
      console.log(`${i} ${rowStr}`);
      if (i < 2) {
        console.log('  ---------');
      }
    });
    console.log(`\n現在のプレイヤー: ${this.currentPlayer}\n`);
  }

  // 入力を受け取る
  private async getInput(prompt: string): Promise<string> {
    return new Promise((resolve) => {
      this.rl.question(prompt, (answer: string) => {
        resolve(answer.trim());
      });
    });
  }

  // 座標の検証
  private isValidMove(row: number, col: number): boolean {
    return (
      row >= 0 &&
      row < 3 &&
      col >= 0 &&
      col < 3 &&
      this.board[row][col] === null
    );
  }

  // 勝敗判定
  private checkWinner(): Player | null {
    // 横のチェック
    for (let row = 0; row < 3; row++) {
      if (
        this.board[row][0] &&
        this.board[row][0] === this.board[row][1] &&
        this.board[row][1] === this.board[row][2]
      ) {
        return this.board[row][0];
      }
    }

    // 縦のチェック
    for (let col = 0; col < 3; col++) {
      if (
        this.board[0][col] &&
        this.board[0][col] === this.board[1][col] &&
        this.board[1][col] === this.board[2][col]
      ) {
        return this.board[0][col];
      }
    }

    // 斜めのチェック（左上から右下）
    if (
      this.board[0][0] &&
      this.board[0][0] === this.board[1][1] &&
      this.board[1][1] === this.board[2][2]
    ) {
      return this.board[0][0];
    }

    // 斜めのチェック（右上から左下）
    if (
      this.board[0][2] &&
      this.board[0][2] === this.board[1][1] &&
      this.board[1][1] === this.board[2][0]
    ) {
      return this.board[0][2];
    }

    return null;
  }

  // 引き分け判定
  private isBoardFull(): boolean {
    return this.board.every(row => row.every(cell => cell !== null));
  }

  // プレイヤーの切り替え
  private switchPlayer(): void {
    this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
  }

  // スタート画面を表示
  private displayStartScreen(): void {
    console.clear();
    console.log('╔════════════════════════════════════════╗');
    console.log('║     三目並べゲーム (Tic-Tac-Toe)      ║');
    console.log('╚════════════════════════════════════════╝');
    console.log('');
    console.log('【遊び方】');
    console.log('');
    console.log('1. プレイヤーXとOが交互に手を打ちます');
    console.log('2. 座標は「行 列」の形式で入力してください');
    console.log('   例: 0 1  → 0行目の1列目に手を打つ');
    console.log('   例: 2 0  → 2行目の0列目に手を打つ');
    console.log('');
    console.log('3. ボードの座標:');
    console.log('     0   1   2');
    console.log('   0   |   |  ');
    console.log('     ---------');
    console.log('   1   |   |  ');
    console.log('     ---------');
    console.log('   2   |   |  ');
    console.log('');
    console.log('4. 3つ並べば勝利です（横・縦・斜め）');
    console.log('5. 終了する場合は「q」を入力してください');
    console.log('');
    console.log('════════════════════════════════════════');
  }

  // ゲームループ
  async play(): Promise<void> {
    // スタート画面を表示
    this.displayStartScreen();
    
    // Enterキーを押すまで待つ
    await this.getInput('\nゲームを開始するには Enter キーを押してください...');
    
    console.clear();
    console.log('ゲーム開始！\n');

    while (true) {
      this.displayBoard();

      // 入力を受け取る
      const input = await this.getInput('座標を入力してください: ');

      if (input.toLowerCase() === 'q') {
        console.log('\nゲームを終了します。');
        break;
      }

      // 座標をパース
      const parts = input.split(/\s+/);
      if (parts.length !== 2) {
        console.log('❌ 無効な入力です。行と列をスペースで区切って入力してください（例: 0 1）');
        continue;
      }

      const row = parseInt(parts[0], 10);
      const col = parseInt(parts[1], 10);

      if (isNaN(row) || isNaN(col)) {
        console.log('❌ 無効な入力です。数値を入力してください。');
        continue;
      }

      // 手を打つ
      if (!this.isValidMove(row, col)) {
        console.log('❌ 無効な手です。空いているマスを選択してください。');
        continue;
      }

      this.board[row][col] = this.currentPlayer;

      // 勝敗判定
      const winner = this.checkWinner();
      if (winner) {
        this.displayBoard();
        console.log(`\n🎉 プレイヤー ${winner} の勝利です！`);
        break;
      }

      // 引き分け判定
      if (this.isBoardFull()) {
        this.displayBoard();
        console.log('\n🤝 引き分けです！');
        break;
      }

      // プレイヤーを切り替え
      this.switchPlayer();
    }

    this.rl.close();
  }
}

// ゲーム開始
const game = new TicTacToe();
game.play().catch((error) => {
  console.error('エラーが発生しました:', error);
  process.exit(1);
});
