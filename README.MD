# Eats出前・デリバリー管理システム (フロントエンド)

## 概要

これは、バックエンドプロジェクト「[Eats出前・デリバリー管理システム](https://github.com/your-username/eats-backend-project-link)」（※要リンク更新）と連携して動作するフロントエンドアプリケーションです。

この管理画面は、飲食店の管理者向けに設計されており、注文処理、料理管理、従業員情報、データ統計などの主要な業務を効率化するための直感的なインターフェースを提供します。

## 主な機能

- **ダッシュボード**: 当日の売上高、注文数、リアルタイムの業務データを可視化します。
- **注文管理**: 新規注文のリアルタイム通知、注文の受付、配達、完了まで一連のフローを管理します。
- **料理管理**: 料理やセットメニューの追加、編集、削除、および販売ステータスの（「販売中」/「売れ切れ」）切り替えが可能です。
- **従業員管理**: 従業員情報の登録、編集、アカウントの有効/無効化を管理します。
- **データ統計**: 指定した期間の売上高や新規ユーザー数をグラフで確認できます。

## 技術スタック

- **フレームワーク**: [Vue.js](https://vuejs.org/) (v2)
- **言語**: [TypeScript](https://www.typescriptlang.org/)
- **UIライブラリ**: [Element UI](https://element.eleme.io/)
- **状態管理**: [Vuex](https://vuex.vuejs.org/)
- **ルーティング**: [Vue Router](https://router.vuejs.org/)
- **HTTPクライアント**: [Axios](https://axios-http.com/)
- **グラフ描画**: [ECharts](https://echarts.apache.org/)
- **CSSプリプロセッサ**: [Sass (SCSS)](https://sass-lang.com/)

## プロジェクトのセットアップ

### 前提条件

- [Node.js](https://nodejs.org/) (バージョン 12.x または 14.x を推奨)
- [npm](https://www.npmjs.com/)

### インストール

1.  リポジトリをクローンします:
    ```sh
    git clone https://github.com/lcx189/eats-project-vue-ts.git
    ```

2.  プロジェクトディレクトリに移動します:
    ```sh
    cd eats-project-vue-ts
    ```

3.  依存関係をインストールします:
    ```sh
    npm install
    ```

## 開発

### 開発サーバーの起動

以下のコマンドを実行すると、開発サーバーが起動し、ホットリロードが有効になります。
```sh
npm run serve
```
起動後、ブラウザで `http://localhost:8080` にアクセスしてください。

### 本番用のビルド

以下のコマンドで、本番環境向けのファイルを生成します。
```sh
npm run build
```
ビルドされた静的ファイルは `dist/` ディレクトリに出力されます。

## 関連プロジェクト

- **バックエンド**: [Eats出前・デリバリー管理システム (バックエンド)](https://github.com/your-username/eats-backend-project-link) (※リンクを実際のURLに更新してください)

