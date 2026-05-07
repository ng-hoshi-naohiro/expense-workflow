# 一般経費承認ワークフローシステム

## 1. Project Description

複数施設を運営する事業体において、一般経費（施設備品購入・出張交通費・採用関連費等）の事前申請から承認までを電子化するワークフローシステム。

**目標ユーザー:**
- 申請者：施設長、本部役職者（PC操作に習熟していない層も含む）
- 承認者：本部役職者、上位管理者
- 経理担当者：経理部
- 管理者：管理部門

**コア価値:**
- PC不慣れ層でも直感的に操作できるUI
- 通知から最短5〜8秒で完了するワンタップ承認
- 生体認証によるセキュアな電子署名
- 操作履歴の保存（行政実地指導・会計監査対応）

## 2. Page Structure

| パス | 画面名 | 画面ID | 状態 |
|------|--------|--------|------|
| `/login` | ログイン画面 | SC-01 | ✅ 実装済 |
| `/setup/device` | デバイス登録画面 | SC-02 | ✅ 実装済 |
| `/` | ホーム画面 | SC-03 | ✅ 実装済 |
| `/apply` | 申請カテゴリ選択画面 | SC-04 | ✅ 実装済（基本） |
| `/apply/:category` | 申請フォーム画面 | SC-05 | 🔄 ベースのみ |
| `/history` | 申請履歴一覧画面 | SC-06 | ✅ 実装済 |
| `/request/:id` | 申請詳細・進捗マップ画面 | SC-07 | ✅ 実装済 |
| `/approvals` | 承認待ち一覧画面 | SC-08 | ✅ 実装済 |
| `/approvals/:id` | 承認詳細・ワンタップ承認画面 | SC-09 | ✅ 実装済 |
| `/notifications` | 通知センター画面 | SC-10 | ✅ 実装済 |
| `/dashboard` | 経営ダッシュボード画面 | SC-11 | ⏳ Phase 4 |
| `/budget` | 予算管理画面 | SC-12 | ⏳ Phase 5 |
| `/audit` | 監査ログ・履歴出力画面 | SC-13 | ⏳ Phase 5 |
| `/master` | マスター管理画面 | SC-14 | ⏳ Phase 5 |
| `/settings` | 設定画面 | SC-15 | ⏳ Phase 5 |

## 3. Core Features

- [x] ログイン・生体認証（WebAuthn UI）
- [x] デバイス登録
- [x] ホームダッシュボード（クイックアクション、進行中申請、最近の活動）
- [x] 経費申請カテゴリ選択
- [x] 申請履歴一覧
- [x] 申請詳細・進捗マップ表示
- [x] 承認待ち一覧（滞留可視化、アラート表示）
- [x] 承認詳細・ワンタップ承認・差戻し
- [x] 通知センター
- [ ] 申請フォーム（OCR連動、添付書類）
- [ ] 経営ダッシュボード（グラフ可視化）
- [ ] 予算管理・上限アラート
- [ ] 監査ログ出力
- [ ] マスター管理
- [ ] 設定（プロフィール・通知）

## 4. Data Model Design

### Table: users
| Field | Type | Description |
|-------|------|-------------|
| id | uuid | 主キー |
| name | text | 氏名 |
| email | text | メールアドレス |
| role | text | ロール（applicant/approver/accountant/admin） |
| facility_id | uuid | 所属施設ID |
| created_at | timestamptz | 作成日時 |

### Table: applications
| Field | Type | Description |
|-------|------|-------------|
| id | uuid | 主キー |
| applicant_id | uuid | 申請者ID |
| category | text | カテゴリ（equipment/travel/recruitment） |
| title | text | タイトル |
| amount | numeric | 金額 |
| status | text | ステータス |
| created_at | timestamptz | 作成日時 |
| submitted_at | timestamptz | 申請日時 |

### Table: approvals
| Field | Type | Description |
|-------|------|-------------|
| id | uuid | 主キー |
| application_id | uuid | 申請ID |
| approver_id | uuid | 承認者ID |
| step | integer | 承認ステップ |
| status | text | 承認状態 |
| comment | text | コメント |
| created_at | timestamptz | 作成日時 |

### Table: notifications
| Field | Type | Description |
|-------|------|-------------|
| id | uuid | 主キー |
| user_id | uuid | 対象ユーザーID |
| type | text | 通知種別 |
| title | text | タイトル |
| body | text | 本文 |
| read | boolean | 既読フラグ |
| created_at | timestamptz | 作成日時 |

### Table: audit_logs
| Field | Type | Description |
|-------|------|-------------|
| id | uuid | 主キー |
| user_id | uuid | 操作ユーザーID |
| action | text | 操作種別 |
| target | text | 操作対象 |
| ip | text | IPアドレス |
| created_at | timestamptz | 作成日時 |

## 5. Backend / Third-party Integration Plan

- **Supabase**: Auth認証、データベース、Edge Functions
- **WebAuthn**: 生体認証（FaceID/TouchID/指紋）
- **LINEWORKS**: 通知連携（将来対応）

## 6. Development Phase Plan

### Phase 1: 基盤構築 + ログイン・ホーム画面 ✅ COMPLETE
- Goal: デザインシステム、ルーティング、ログイン画面、ホーム画面、デバイス登録画面を構築
- Deliverable: SC-01（ログイン）、SC-02（デバイス登録）、SC-03（ホーム）、SC-04〜SC-10（基本実装）

### Phase 2: 申請フォーム・ダッシュボード
- Goal: 申請フォーム（カメラ取込、OCR連動、添付書類）と経営ダッシュボード（グラフ可視化）
- Deliverable: SC-05（申請フォーム）、SC-11（ダッシュボード）

### Phase 3: 管理機能
- Goal: 予算管理、監査ログ、マスター管理、設定画面を構築
- Deliverable: SC-12, SC-13, SC-14, SC-15

### Phase 4: バックエンド連携
- Goal: Supabase接続、認証連携、データ永続化
- Deliverable: リアルデータ連携、RLSポリシー設定
