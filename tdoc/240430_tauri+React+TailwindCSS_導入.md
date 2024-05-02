- [1. プロジェクト作成 (Tauri + Vite + React + TypeScript)](#1-プロジェクト作成-tauri--vite--react--typescript)
  - [1.1. 起動](#11-起動)
  - [1.2. ビルド (.exe 生成)](#12-ビルド-exe-生成)
    - [1.2.1. (\*1) エラー (bundle identifier) を設定せよ](#121-1-エラー-bundle-identifier-を設定せよ)
      - [1.2.1.1. 対処法](#1211-対処法)
- [2. Tailwind CSS 導入](#2-tailwind-css-導入)
  - [2.1. Step1: npm でインストール](#21-step1-npm-でインストール)
  - [2.2. Step2: tailwind.config.js 書き換え](#22-step2-tailwindconfigjs-書き換え)
  - [2.3. Step3: グローバル css ファイルの書き換え](#23-step3-グローバル-css-ファイルの書き換え)
  - [2.4. Step4. 確認](#24-step4-確認)
- [3. 開発中コマンド](#3-開発中コマンド)
  - [3.1. `npm run tauri dev`](#31-npm-run-tauri-dev)
  - [3.2. `npm run tauri build`](#32-npm-run-tauri-build)

***

# 1. プロジェクト作成 (Tauri + Vite + React + TypeScript)
- [Tauri 公式ドキュメント](https://tauri.app/v1/guides/getting-started/setup/vite)
- `create-tauri-app` を使うのが早い。
  - 但し、どんな設定をしているか等が隠蔽されすぎるからか、公式では、セットアップを理解するためにチュートリアル通り実行することが推奨されていた。

```bash
npm create tauri-app@latest
# -> ✔ Project name · tauri-test-03
# -> ✔ Choose which language to use for your frontend · TypeScript / JavaScript - (pnpm, yarn, npm, bun)
# -> ✔ Choose your package manager · npm
# -> ✔ Choose your UI template · React - (https://react.dev/)
# -> ✔ Choose your UI flavor · TypeScript

cd tauri-test-03   # 生成したプロジェクトに移動
npm install        # npm の package.json のライブラリをインストール
```


## 1.1. 起動
```bash
npm run tauri dev  # cargo build が実行されるためか、初回は数分かかった。
```


## 1.2. ビルド (.exe 生成)
```bash
npm run tauri dev  # (*1)
```

### 1.2.1. (*1) エラー (bundle identifier) を設定せよ
Error You must change the bundle identifier in `tauri.conf.json > tauri > bundle > identifier`. The default value `com.tauri.dev` is not allowed as it must be unique across applications.

#### 1.2.1.1. 対処法
- `tauri.conf.json` の `identifier` を書き換える。
  - 内部的にここでアプリを認識してるみたい。`App\Loaming` で `identifier` 名のフォルダが作成され、その中で一時ファイルと見られるものが保存されていた。


# 2. Tailwind CSS 導入
- [【公式】Tailwind CSS](https://tailwindcss.com/docs/guides/vite)
  - Vite のフレームワークの説明ページを参考にした。フレームワーク等によって微妙に異なる点に注意。
  - React + Tauri は導入済み。

## 2.1. Step1: npm でインストール
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
# -> Created Tailwind CSS config file: tailwind.config.js と表示され、tailwind.config.js と postcss.config.js が生成された。
```

## 2.2. Step2: tailwind.config.js 書き換え
- `tailwind.config.js` を書き換えた。(公式参照)
```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",                // -> この箇所を追加。React 用に、.tsx 等を有効にした。
    "./src/**/*.{js,ts,jsx,tsx}",  // -> この箇所を追加。React 用に、.tsx 等を有効にした。
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

## 2.3. Step3: グローバル css ファイルの書き換え
- `src/styles.css` で、オリジナルの記述を全て削除して、以下を書いた。
  - 公式の記述では、`src/index.css` だったが、`Tauri` の場合グローバルに適用される `css` が `styles.css` のだった。

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## 2.4. Step4. 確認
- `npm run tauri dev` を再起動した。(そのままだと反映されなかった気がする。要確認)
- 以下のように書き換え、状態が変わるかを確認する。
```html
<h1 className="text-3xl font-bold underline">Welcome to Tauri!</h1>
```

![](images/screenshots/2024-05-01-23-23-23.png)


# 3. 開発中コマンド
- Rust の起動も含まれるが、`cargo` 系を使用しない。

## 3.1. `npm run tauri dev`
- 開発サーバー (フロントエンド + バックエンド) 起動。`F12` で devtools も開く。

## 3.2. `npm run tauri build`
- `.exe` 生成。