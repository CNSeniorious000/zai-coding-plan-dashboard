<div align="center">

  **[English](README.md)** | **[简体中文](README.zh-CN.md)** | **[日本語](README.ja.md)** | **[한국어](README.ko.md)** | **[Español](README.es.md)** | **[Français](README.fr.md)** | **[Deutsch](README.de.md)**

  <p>

  # Z.AI Usage ダッシュボード

  Z.AI API の使用状況をリアルタイムで監視する、モダンな Next.js ダッシュボード。多言語サポート付き。

</div>

## 機能

- **📈 リアルタイム使用状況追跡** - モデル呼び出し、トークン使用量、ツールパフォーマンスを監視
- **📊 可視化分析** - 使用傾向を美しいチャートで表示
- **🔒 セキュア** - API キーはブラウザの localStorage にのみ保存
- **🌙 ダークモード** - Material You デザイン、自動テーマ切り替え
- **🌍 多言語サポート** - 7 言語に対応
- **📱 レスポンシブ** - デスクトップ、タブレット、モバイルに完璧に対応
- **⚡ 高速** - Next.js 16 と React 19 で最適化されたパフォーマンス

## スクリーンショット

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/CNSeniorious000/zai-coding-plan-dashboard/main/.github/screenshots/screenshot-ja-dark.webp">
  <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/CNSeniorious000/zai-coding-plan-dashboard/main/.github/screenshots/screenshot-ja-light.webp">
  <img alt="Z.AI Usage ダッシュボードスクリーンショット" src="https://raw.githubusercontent.com/CNSeniorious000/zai-coding-plan-dashboard/main/.github/screenshots/screenshot-ja-dark.webp">
</picture>

## 技術スタック

| 技術 | 説明 |
|------|------|
| **Next.js 16** | App Router 搭載の React フレームワーク |
| **React 19** | Server Components 対応の最新 React |
| **TypeScript** | タイプセーフな開発 |
| **Tailwind CSS v4** | ユーティリティファースト CSS フレームワーク |
| **next-intl** | 国際化 (i18n) フレームワーク |
| **Recharts** | データ可視化ライブラリ |
| **Radix UI** | アクセシビリティ対応コンポーネントライブラリ |
| **Fumadocs** | ドキュメントシステム |

## インストール

```bash
# リポジトリをクローン
git clone https://github.com/CNSeniorious000/zai-coding-plan-dashboard.git

# プロジェクトディレクトリに移動
cd zai-coding-plan-dashboard

# 依存関係をインストール
npm install
# または
yarn install
# または
pnpm install

# 開発サーバーを起動
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてください。

## 使用方法

1. **API キーを取得**
   - [Z.AI プラットフォーム](https://z.ai/manage-apikey/apikey-list) にアクセス
   - API キーを作成またはコピー
   - 形式：`32hexchars.16alphanumchars`

2. **API キーを入力**
   - ダッシュボードに API キーを貼り付け
   - 「取得」をクリックして使用データを読み込み

3. **統計を表示**
   - プログレスバー付きのクォータ概覧
   - モデル別トークン使用状況
   - 成功/失敗率付きのツール使用状況
   - トレンドの可視化チャート

## API エンドポイント

ダッシュボードは Z.AI の公式監視 API を使用：

| エンドポイント | 説明 |
|-----------|------|
| `/api/monitor/usage/model-usage` | モデルトークン使用統計 |
| `/api/monitor/usage/tool-usage` | ツール呼び出しパフォーマンス |
| `/api/monitor/usage/quota/limit` | 現在のクォータ制限 |

## プロジェクト構成

```
src/
├── app/
│   ├── [locale]/          # ローカライズルート (en, zh-CN, ja, ko, es, fr, de)
│   │   ├── page.tsx       # メインダッシュボードページ
│   │   └── docs/          # ドキュメントページ
│   └── api/
│       └── usage/          # バックエンド API プロキシ
├── components/
│   ├── Dashboard.tsx      # メインダッシュボードコンポーネント
│   ├── UsageCharts.tsx    # データ可視化
│   └── ui/              # 再利用可能 UI コンポーネント
├── i18n/                  # 国際化設定
├── lib/                   # ユーティリティ
└── messages/               # 翻訳ファイル
```

## 対応言語

- 🇺🇸 [English](README.md)
- 🇨🇳 [简体中文](README.zh-CN.md)
- 🇯🇵 [日本語](README.ja.md)
- 🇰🇷 [한국어](README.ko.md)
- 🇪🇸 [Español](README.es.md)
- 🇫🇷 [Français](README.fr.md)
- 🇩🇪 [Deutsch](README.de.md)

## ドキュメント

完全なドキュメントはアプリケーションの `/docs` でご覧いただけます。

## セキュリティ

- **API キー保存**：API キーはブラウザの `localStorage` にのみ保存されます
- **サーバー保存なし**：アプリケーションは Z.AI の公式 API 以外のサーバーにキーを保存または送信しません
- **クライアントのみ**：すべてのデータ取得はブラウザから Z.AI へ直接行われます

## 貢献

貢献を歓迎します！お気軽に Pull Request を提出してください。

## ライセンス

このプロジェクトはプライベートプロジェクトです。

---

<div align="center">

  Z.AI コミュニティのために ❤️ で作られました

  **[English](README.md)** | **[简体中文](README.zh-CN.md)** | **[日本語](README.ja.md)** | **[한국어](README.ko.md)** | **[Español](README.es.md)** | **[Français](README.fr.md)** | **[Deutsch](README.de.md)**

</div>
