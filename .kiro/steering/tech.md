# Technology Stack

## Architecture

シンプルなSPA（Single Page Application）構成。React Hooksによる状態管理とコンポーネントベースのUI実装。

## Core Technologies

- **Language**: TypeScript 5.3+
- **Framework**: React 18.2
- **Build Tool**: Vite 5.0+
- **Runtime**: ブラウザ（ES Modules）

## Key Libraries

- **React**: UIライブラリ（Hooks API使用）
- **React DOM**: DOMレンダリング
- **Vite**: 開発サーバーとビルドツール

## Development Standards

### Type Safety

- TypeScript strict mode推奨
- 型定義を明示的に記述（`type`、`interface`）
- Propsは`interface`で定義

### Code Quality

- 関数コンポーネントとHooksを使用
- コンポーネントはデフォルトエクスポート
- CSSはコンポーネントごとに分離（`.css`ファイル）

### Testing

現時点ではテストフレームワーク未導入

## Development Environment

### Required Tools

- Node.js（ES Modules対応）
- npm

### Common Commands

```bash
# Dev: npm run dev
# Build: npm run build
# Preview: npm run preview
```

## Key Technical Decisions

- **Vite採用**: 高速なHMRとビルドパフォーマンス
- **TypeScript**: 型安全性によるバグの早期発見
- **関数コンポーネント**: Hooksによる状態管理の簡潔性
- **CSS分離**: コンポーネント単位でのスタイル管理

---
_Document standards and patterns, not every dependency_
