# Project Structure

## Organization Philosophy

コンポーネントベースの構造。機能ごとにコンポーネントを分離し、各コンポーネントは自身のスタイル（CSS）を持つ。

## Directory Patterns

### Source Code
**Location**: `/src/`  
**Purpose**: アプリケーションのソースコード  
**Example**: `App.tsx`, `main.tsx`

### Components
**Location**: `/src/components/`  
**Purpose**: 再利用可能なUIコンポーネント  
**Example**: `TicTacToe.tsx`, `StartScreen.tsx`

各コンポーネントは同名の`.css`ファイルを持つ（例: `TicTacToe.tsx` + `TicTacToe.css`）

### Styles
**Location**: `/src/`  
**Purpose**: グローバルスタイル  
**Example**: `index.css`

## Naming Conventions

- **Files**: PascalCase（コンポーネント）、kebab-case（設定ファイル）
- **Components**: PascalCase（例: `TicTacToe`, `StartScreen`）
- **Functions**: camelCase（例: `handleCellClick`, `checkWinner`）
- **Types/Interfaces**: PascalCase（例: `Player`, `Board`, `TicTacToeProps`）

## Import Organization

```typescript
// React imports first
import { useState, useEffect } from 'react';

// Component imports (relative)
import TicTacToe from './components/TicTacToe';
import StartScreen from './components/StartScreen';

// Style imports (relative)
import './TicTacToe.css';
```

**Path Aliases**: 現時点では未設定（相対パス使用）

## Code Organization Principles

- **単一責任**: 各コンポーネントは明確な役割を持つ
- **Props経由の通信**: 親子間のデータはPropsで受け渡し
- **状態の局所化**: コンポーネント内で必要な状態のみ管理
- **型定義の明示**: Propsと状態の型を明示的に定義

---
_Document patterns, not file trees. New files following patterns shouldn't require updates_
