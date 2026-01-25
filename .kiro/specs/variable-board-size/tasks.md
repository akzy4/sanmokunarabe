# Implementation Plan

## Task Format Template

Use whichever pattern fits the work breakdown:

### Major task only
- [ ] {{NUMBER}}. {{TASK_DESCRIPTION}}{{PARALLEL_MARK}}
  - {{DETAIL_ITEM_1}} *(Include details only when needed. If the task stands alone, omit bullet items.)*
  - _Requirements: {{REQUIREMENT_IDS}}_

### Major + Sub-task structure
- [ ] {{MAJOR_NUMBER}}. {{MAJOR_TASK_SUMMARY}}
- [ ] {{MAJOR_NUMBER}}.{{SUB_NUMBER}} {{SUB_TASK_DESCRIPTION}}{{SUB_PARALLEL_MARK}}
  - {{DETAIL_ITEM_1}}
  - {{DETAIL_ITEM_2}}
  - _Requirements: {{REQUIREMENT_IDS}}_ *(IDs only; do not add descriptions or parentheses.)*

> **Parallel marker**: Append `(P)` only to tasks that can be executed in parallel. Omit the marker when running in `--sequential` mode.
>
> **Optional test coverage**: When a sub-task is deferrable test work tied to acceptance criteria, mark the checkbox as `- [ ]*` and explain the referenced requirements in the detail bullets.

- [ ] 1. 型定義とAppコンポーネントの状態管理拡張
- [x] 1.1 ボードサイズの型定義を追加
  - `BoardSize`型（3 | 4 | 5）を定義
  - 型定義ファイルまたは共通型定義場所に追加
  - _Requirements: 1.2, 1.4, 2.1, 3.1, 4.3_

- [x] 1.2 Appコンポーネントにボードサイズ状態を追加
  - `boardSize`状態を追加（デフォルト値: 3）
  - `onStart`コールバックのシグネチャを変更してボードサイズを受け取る
  - スタート画面に戻る際に`boardSize`をリセットする処理を追加
  - _Requirements: 1.2, 1.3, 1.4, 4.2_

- [x] 2. StartScreenコンポーネントにボードサイズ選択UIを追加
- [x] 2.1 ボードサイズ選択UIの実装
  - 3×3、4×4、5×5の選択オプションを表示
  - 選択状態を内部状態で管理（デフォルト: 3×3）
  - 選択されたサイズを視覚的に強調表示
  - _Requirements: 1.1, 1.2, 1.5_

- [x] 2.2 StartScreenのPropsインターフェースを更新
  - `onStart`コールバックのシグネチャを変更してボードサイズを渡す
  - 型安全性を確保
  - _Requirements: 1.3, 1.4_

- [x] 3. TicTacToeコンポーネントの可変サイズ対応
- [x] 3.1 TicTacToeのPropsインターフェースを更新
  - `boardSize` propを追加
  - Propsの型定義を更新
  - _Requirements: 2.1, 4.3_

- [x] 3.2 可変サイズボードの初期化ロジックを実装
  - `boardSize` propに応じたボード配列の動的生成
  - `useEffect`で`boardSize` propの変更を検知してボードを再初期化
  - すべてのマスを空の状態で初期化
  - _Requirements: 2.1, 2.2, 4.3_

- [x] 3.3 可変サイズ対応の勝敗判定ロジックを実装
  - `checkWinner`関数を可変サイズ対応に変更
  - ボードサイズに応じた勝利条件（3目、4目、5目）で判定
  - 横・縦・斜めのチェックを汎用化
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_

- [x] 3.4 引き分け判定ロジックの可変サイズ対応
  - `isBoardFull`関数を可変サイズ対応に変更
  - すべてのマスが埋まった場合の引き分け判定
  - _Requirements: 3.6_

- [x] 3.5 リセット機能の可変サイズ対応
  - リセット時に現在の`boardSize`を維持してボードを初期化
  - ゲーム状態をリセットしつつ、ボードサイズは保持
  - _Requirements: 4.1_

- [x] 4. 可変サイズボードのUI表示とスタイリング
- [x] 4.1 ボードレイアウトの可変サイズ対応
  - CSS GridまたはFlexboxで可変サイズのグリッドレイアウトを実装
  - `boardSize` propに応じた動的なグリッド設定
  - ボードのレイアウトが選択されたサイズに応じて適切に調整される
  - _Requirements: 2.3, 2.4_

- [x] 4.2 レスポンシブデザインの実装
  - 4×4、5×5ボードでのマスサイズの調整
  - 画面サイズに応じたマスのサイズ調整
  - すべてのマスが表示可能であることを保証
  - _Requirements: 2.4_

- [x] 5. 統合と動作確認
- [x] 5.1 ボードサイズ選択からゲーム開始までのフロー確認
  - StartScreenでのサイズ選択
  - Appコンポーネントでの状態管理
  - TicTacToeでのボード表示とゲームロジック
  - 各サイズ（3×3、4×4、5×5）での動作確認
  - _Requirements: 1.1, 1.2, 1.3, 2.1, 2.2, 2.3_

- [x] 5.2 ゲーム機能の動作確認
  - 各サイズでの勝敗判定の正確性確認
  - リセット機能でのボードサイズ維持確認
  - スタート画面への戻り時のリセット確認
  - 引き分け判定の動作確認
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 4.1, 4.2_

- [x] 5.3 UI/UXの一貫性確認
  - 既存のデザインパターンとの整合性
  - CSSクラス命名規則の維持
  - コンポーネント構造の互換性
  - _Requirements: 5.1, 5.2, 5.3_
