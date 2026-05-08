# 一般経費承認ワークフローシステム

複数施設を運営する事業体向けに、一般経費（施設備品購入・出張交通費・採用関連費等）の事前申請から承認までを電子化するワークフローシステムです。PC操作に習熟していない層でも直感的に操作できるUI／生体認証によるワンタップ承認／監査対応の操作履歴保存をコアバリューとしています。

## 主な特徴

- **直感的なUI**：PC不慣れ層でも迷わず操作できる導線設計
- **ワンタップ承認**：通知から最短5〜8秒で承認完了
- **生体認証**：WebAuthn（FaceID / TouchID / 指紋）を用いたセキュアな電子署名
- **監査ログ**：行政実地指導・会計監査に耐える操作履歴の保存
- **多言語対応**：i18next による日本語／英語切替

## 想定ユーザー

| ロール | 主な操作 |
| --- | --- |
| 申請者（施設長・本部役職者） | 経費申請、進捗確認 |
| 承認者（本部役職者・上位管理者） | 承認・差戻し |
| 経理担当者 | 支払処理、履歴出力 |
| 管理者 | マスター管理、監査ログ出力 |

## 技術スタック

- **フロントエンド**：React 19 / TypeScript / Vite
- **UI**：Tailwind CSS / lucide-react / recharts
- **ルーティング**：react-router-dom v7
- **国際化**：i18next / react-i18next
- **バックエンド連携（予定）**：Supabase（Auth / DB / Edge Functions）、Firebase、Stripe

## ディレクトリ構成

```
expense-workflow/
├── app_v2.0/                # 現行バージョン（GitHub Pages で公開中）
│   ├── src/
│   │   ├── components/      # base / feature コンポーネント
│   │   ├── pages/           # 画面単位のページコンポーネント（dashboard / settings 追加）
│   │   ├── router/          # ルーティング設定
│   │   ├── mocks/           # 開発用モックデータ
│   │   └── i18n/            # 多言語リソース
│   ├── package.json
│   └── project_plan.md
└── app_v1.0/                # 旧バージョン（参照用、デプロイ対象外）
```

## 実装状況

### 実装済み（Phase 1）

| 画面ID | パス | 画面名 |
| --- | --- | --- |
| SC-01 | `/login` | ログイン |
| SC-02 | `/setup/device` | デバイス登録 |
| SC-03 | `/` | ホーム |
| SC-04 | `/apply` | 申請カテゴリ選択 |
| SC-06 | `/history` | 申請履歴一覧 |
| SC-07 | `/request/:id` | 申請詳細・進捗マップ |
| SC-08 | `/approvals` | 承認待ち一覧 |
| SC-09 | `/approvals/:id` | 承認詳細・ワンタップ承認 |
| SC-10 | `/notifications` | 通知センター |

### 今後の予定

- **Phase 2**：申請フォーム本体（OCR・添付書類）、経営ダッシュボード
- **Phase 3**：予算管理、監査ログ出力、マスター管理、設定
- **Phase 4**：Supabase連携、認証連携、データ永続化、RLSポリシー

詳細は [`app_v2.0/project_plan.md`](app_v2.0/project_plan.md) を参照してください。

## デプロイ

`main` ブランチへの push をトリガーに、[.github/workflows/deploy-pages.yml](.github/workflows/deploy-pages.yml) が `app_v2.0/` をビルドし GitHub Pages に自動デプロイします。

公開URL: https://ng-hoshi-naohiro.github.io/expense-workflow/

## セットアップ

```bash
cd app_v2.0
npm install
npm run dev          # 開発サーバー起動
npm run build        # 本番ビルド
npm run lint         # ESLint
npm run type-check   # TypeScript 型チェック
```

## ライセンス

未設定（必要に応じて追加予定）
