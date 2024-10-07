# BizRobo! Connector Boilerplate for NodeJS

## 概要

BizRobo! コネクターを作成するためのテンプレート（ボイラープレート）です。NodeJS+TypeScript 版になっています。

## 使い方

1. [GitHub](https://github.com/autoro-io/bizrobo-connector-boilerplate) から fork して clone
1. package.json 内のパッケージ名を適切な名前に変更
1. `.env` の `BIZROBO_PROJECT_LIBRARY_PATH` と　`BIZROBO_CONNECTOR_CACHE_PATH` を自身の環境に合わせて記述。パスの書き方は、dot.env を参照してください。 `BIZROBO_PROJEDCT_LIBRARY_PATH` については、プロジェクト内の Library フォルダを指定してください。
1. `$ docker compose up -d` 
1. `$ docker compose exec node bash` でターミナルを獲得
1. `#/usr/src/app npm install` で、必要なパッケージをインストールして開発をしてください。

自動生成を使いたくない場合は、各機能を一つずつ利用することができます。

- `#/usr/src/app npm run generate-manifest` で manifest.json を自動生成できます。
- `#/usr/src/app npm run clear:bizrobo` で `.env` にしていしたキャッシュフォルダがクリアされます。⚠️注意⚠️ パスの指定を間違えるとえらいことになります！
- `#/usr/src/app npm run build` で src の中の ts ファイルがコンパイルされます。
- `#/usr/src/app npm run copy` でコンパイルされたファイルを node_modules に移動（コピー）します
- `#/usr/src/app npm run zip` で node_modules と　manifest.json を zip にして、 `${packageName}.connector` と名前を変えて、BizRobo! のプロジェクトフォルダにコピーします。
- `#/usr/src/app npm run build:all` 上記を全部まとめて実行します。


## ファイル構成

? がついているアイテムは、追跡されていないので git clone した段階では何もありません。

```
bizrobo-connector-boilerplate/
┣ ?dist/                             TypeScriptをJSにしたものが入る中間フォルダ、追跡せず
┣ ?node_modules/                     インストールされた外部パッケージ、追跡せず
┣ src/
┃ ┣ connector.test.ts               コネクタ本体の単体テスト
┃ ┣ connector.ts                    コネクタ本体、サンプルとしてzipから住所を取得するAPIを実装しています
┃ ┗ generateManifest.ts             manifest.json を自動で生成するスクリプト
┣ ?.env                              BizRobo! のプロジェクトのパスと、キャッシュフォルダのパスを設定する（各開発者の環境に依存する設定ファイル）、追跡せず
┣ .gitattributes
┣ .gitignore
┣ Dockerfile                        LTS である Node 20 のイメージに connector 作成用の zip コマンドをインストールしたイメージ
┣ README.md                         このファイル
┣ docker-compose.yml                BizRobo! プロジェクトを Docker コンテナにボリュームとしてマウントする設定がされている docker-compose ファイル
┣ dot.env                           サンプルの .env ファイル
┣ jest.config.ts                    テストの設定ファイルです。
┣ manifest.json                     自動生成される　manifest.json です。
┣ package-lock.json
┣ package.json                      依存パッケージ
┗ tsconfig.json                     TypeScript　の設定ファイル

```
## 制限事項

- シンプルな関数を実装する方法しか試していません。
- `#/usr/src/app npm build:all` した後に、Design Studio で再読み込みを行なってください。
- production で使われない node_module も zip されてしまっています。これは非効率です。こちらもdevDependenciesを省くなどの工夫が可能です。
- response の定義の仕方が、いまいちわからなく、json と html を必須で返却するように返却値を統一してしまっています。これについては、返却値の型をもとに自動で設定することも可能なので改善の余地ありです。
