# ChatGPT を使用した LINE チャットボット

これは、ChatGPT という強力な言語モデルを利用したシンプルな LINE チャットボットアプリケーションです。このアプリケーションを使用すると、ユーザーは LINE メッセージングプラットフォームを通じて ChatGPT モデルと対話することができます。

## 事前準備

LINE Messaging API チャンネル（LINE Developers コンソールで作成）

## インストール

[リポジトリ](https://github.com/kk-project/line-chatbot-with-chatgpt)をクローンするか、ソースコードをダウンロードします。

プロジェクトディレクトリに移動します。

次のコマンドを実行して必要な依存関係をインストールします。

```bash
yarn install
```

## 環境変数の設定

.env.example ファイルをコピーして .env ファイルを作成します。

```bash
cp .env.example .env
```

LINE Developers コンソールで作成した LINE Messaging API チャンネルのチャンネルシークレットとチャンネルアクセストークンを .env ファイルに追加します。

OpenAI API Key は、[OpenAI API Keys](https://platform.openai.com/account/api-keys) から取得します。

ORGANIZATION 　は、オプショナルです。組織で使用する場合は、組織の名前を入力します。

## ローカル環境での使用方法

次のコマンドを実行してアプリケーションを起動します。

```bash
npm start
```

[Ngrok](https://ngrok.com/) は、ローカルサーバーをインターネットに公開するためのツールです。公式ウェブサイトから Ngrok をダウンロードしてインストールします: 。

次のコマンドで Ngrok を起動し、ローカルサーバーへの安全なトンネルを作成します。

```bash
ngrok http 3000
```

Ngrok は転送用の URL（例: https://abcd1234.ngrok.io）を表示します。このURLをコピーします。

LINE Developers コンソールに移動し、チャネル設定を開きます。

「Messaging API」タブで、「Webhook URL」フィールドを Ngrok の URL に更新し、末尾に /webhook を追加します（例: https://abcd1234.ngrok.io/webhook）。

検証をクリックして、成功と表示されれば準備完了です。

「Messaging API」タブで、QR コードをスキャンして、LINE アカウントを友達に追加します。

メッセージを送信すると、ChatGPT が応答します。

![代替テキスト](/public/screenshot/sample-chatbot-with-chatgpt.PNG)

## 免責事項

このアプリケーションは、ChatGPT と LINE メッセージングプラットフォームと統合する方法を示すデモンストレーションです
