# Research & Design Decisions Template

---
**Purpose**: Capture discovery findings, architectural investigations, and rationale that inform the technical design.

**Usage**:
- Log research activities and outcomes during the discovery phase.
- Document design decision trade-offs that are too detailed for `design.md`.
- Provide references and evidence for future audits or reuse.
---

## Summary
- **Feature**: `variable-board-size`
- **Discovery Scope**: Extension
- **Key Findings**:
  - 既存のコンポーネント構造（StartScreen、TicTacToe）を拡張する形で実装可能
  - ボードサイズは型安全な数値型（3, 4, 5）として定義し、TypeScriptの型システムを活用
  - 勝敗判定ロジックは既存の3×3専用実装を汎用化する必要がある
  - CSSは既存のパターン（コンポーネント単位の分離）を維持しつつ、可変サイズ対応のスタイル調整が必要

## Research Log

### 既存コンポーネント構造の分析
- **Context**: 既存コードベースの拡張ポイントを特定するため
- **Sources Consulted**: 
  - `src/App.tsx` - アプリケーションのルートコンポーネント
  - `src/components/StartScreen.tsx` - スタート画面コンポーネント
  - `src/components/TicTacToe.tsx` - ゲームボードコンポーネント
- **Findings**: 
  - Appコンポーネントが`gameStarted`状態を管理し、StartScreenとTicTacToeを切り替えている
  - StartScreenは`onStart`コールバックのみを受け取るシンプルな構造
  - TicTacToeは`onReset`コールバックを受け取り、内部でボード状態を完全に管理している
  - ボードは`Board = Player[][]`型で定義され、3×3固定の配列として初期化されている
- **Implications**: 
  - ボードサイズの状態はAppコンポーネントで管理し、StartScreenとTicTacToeにPropsで渡す設計が適切
  - TicTacToeコンポーネントの`checkWinner`関数を可変サイズ対応に変更する必要がある

### TypeScript型システムの活用
- **Context**: ボードサイズを型安全に扱うための型定義を検討
- **Sources Consulted**: 
  - 既存の型定義パターン（`Player`, `Board`, `TicTacToeProps`）
  - TypeScript strict modeの要件
- **Findings**: 
  - 既存コードは`type`と`interface`を適切に使い分けている
  - ボードサイズは数値リテラル型（`3 | 4 | 5`）として定義することで型安全性を確保できる
  - ボードの型定義を`Player[][]`から`Board<Size>`のようなジェネリック型に変更する選択肢もあるが、シンプルさを優先して数値型で管理する方が実用的
- **Implications**: 
  - `type BoardSize = 3 | 4 | 5`として型定義し、ボード配列は動的に生成する実装が適切

### 勝敗判定ロジックの汎用化
- **Context**: 3×3専用の勝敗判定を可変サイズ対応に変更する方法を検討
- **Sources Consulted**: 
  - 既存の`checkWinner`関数の実装
- **Findings**: 
  - 現在の実装は3×3固定で、横・縦・斜めのチェックを個別に実装している
  - 可変サイズ対応には、ボードサイズに応じた勝利条件（3目、4目、5目）を動的に判定する必要がある
  - 横・縦のチェックはループで汎用化可能
  - 斜めのチェックは2方向（左上→右下、右上→左下）を汎用化可能
- **Implications**: 
  - `checkWinner`関数を`(board: Board, size: BoardSize)`のシグネチャに変更し、サイズに応じた勝利条件で判定する実装が必要

### CSSスタイリングの対応
- **Context**: 可変サイズボードのレイアウトを既存のCSSパターンで対応する方法を検討
- **Sources Consulted**: 
  - 既存のCSSファイル構造（コンポーネント単位の分離）
- **Findings**: 
  - 既存のCSSはコンポーネント単位で分離されている（`TicTacToe.css`, `StartScreen.css`）
  - ボードのグリッドレイアウトはCSS GridまたはFlexboxで実装可能
  - 可変サイズに対応するには、動的な`grid-template-columns`の設定が必要
- **Implications**: 
  - インラインスタイルまたはCSS変数を使用して、ボードサイズに応じたグリッドレイアウトを動的に設定する実装が適切

## Architecture Pattern Evaluation

| Option | Description | Strengths | Risks / Limitations | Notes |
|--------|-------------|-----------|---------------------|-------|
| Props経由の状態管理 | Appコンポーネントでボードサイズを管理し、Propsで子コンポーネントに渡す | 既存パターンと一致、シンプル | 深い階層ではProps drillingの可能性 | 現在の階層が浅いため問題なし |
| Context API | React Contextでボードサイズを共有 | Props drillingを回避 | 過剰設計の可能性、既存パターンと不一致 | 現時点では不要 |

## Design Decisions

### Decision: ボードサイズの状態管理場所
- **Context**: ボードサイズをどこで管理するか
- **Alternatives Considered**:
  1. Appコンポーネントで管理 — 既存の`gameStarted`と同様に管理
  2. TicTacToeコンポーネント内で管理 — ゲーム固有の状態として内部化
  3. Context APIで共有 — グローバル状態として管理
- **Selected Approach**: Appコンポーネントで管理し、PropsでStartScreenとTicTacToeに渡す
- **Rationale**: 既存の`gameStarted`状態管理パターンと一致し、シンプルで理解しやすい。コンポーネント階層が浅いためProps drillingの問題はない。
- **Trade-offs**: 将来的にコンポーネント階層が深くなった場合、Context APIへの移行を検討する必要がある可能性があるが、現時点では過剰設計を避けられる。
- **Follow-up**: 実装時にPropsの型定義を明確にし、型安全性を確保する。

### Decision: ボード配列の型定義
- **Context**: 可変サイズボードを型安全に扱うための型定義方法
- **Alternatives Considered**:
  1. `Player[][]`型を維持し、サイズは別途管理 — シンプルだが型安全性が低い
  2. ジェネリック型`Board<Size>`を定義 — 型安全性が高いが複雑
  3. 数値リテラル型`BoardSize = 3 | 4 | 5`を定義し、ボードは動的生成 — バランスが良い
- **Selected Approach**: `type BoardSize = 3 | 4 | 5`を定義し、ボード配列は`Player[][]`型を維持して動的に生成
- **Rationale**: 既存の型定義パターンと一致し、型安全性と実装の簡潔さのバランスが良い。ジェネリック型は過剰設計の可能性がある。
- **Trade-offs**: ボード配列のサイズと`BoardSize`の整合性は実行時に保証する必要があるが、TypeScriptの型システムでは完全な保証は難しい。実装時のバリデーションで補完する。
- **Follow-up**: 実装時にボード生成関数で型安全性を確保し、テストでサイズの整合性を検証する。

### Decision: 勝敗判定ロジックの実装方法
- **Context**: 可変サイズに対応した勝敗判定の実装方法
- **Alternatives Considered**:
  1. サイズごとに個別の判定関数を実装 — 明確だが重複コードが多い
  2. 汎用的な判定関数を実装し、サイズをパラメータ化 — 保守性が高い
  3. 設定オブジェクトでサイズごとの勝利条件を定義 — 拡張性が高いが複雑
- **Selected Approach**: 汎用的な判定関数を実装し、ボードサイズをパラメータとして受け取る
- **Rationale**: コードの重複を避け、保守性を高められる。既存の3×3専用実装を拡張する形で自然に実装できる。
- **Trade-offs**: 関数の複雑度が若干増加するが、可読性と保守性の観点から許容範囲内。
- **Follow-up**: 実装時に各サイズ（3, 4, 5）でのテストケースを十分に作成し、勝敗判定の正確性を検証する。

## Risks & Mitigations
- **リスク1**: 既存の3×3ゲームの動作に影響を与える可能性 — **対策**: 既存のテストケースを維持し、3×3モードでの回帰テストを実施
- **リスク2**: 4×4、5×5ボードでのCSSレイアウトが画面サイズによっては表示しきれない可能性 — **対策**: レスポンシブデザインを考慮し、CSS Gridの`auto-fit`や`minmax`を使用して適切に調整
- **リスク3**: 勝敗判定ロジックのバグにより、不正な勝利判定が発生する可能性 — **対策**: 各サイズでの包括的なテストケースを作成し、境界条件を十分にテストする

## References
- React Hooks API Documentation — 状態管理パターンの参考
- TypeScript Handbook — 型定義のベストプラクティス
- CSS Grid Layout — 可変サイズグリッドの実装方法
