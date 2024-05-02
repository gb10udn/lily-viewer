import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import SummaryTable from './components/SummaryTable.tsx'

export type SummaryTask = {
  todo_id: number,
  main_class: string | null,
  sub_class: string | null,
  start_date: number | null,  // TODO: 240502 yyyy/mm/dd 形式に変換せよ。(フロントエンド？バックエンド？)
  end_date: number | null,    // TODO: 240502 yyyy/mm/dd 形式に変換せよ。(フロントエンド？バックエンド？)
  content: string | null,
}

function App() {
  const [tables, setTables] = useState<SummaryTask[]>([]);

  const fetchAllData = async () => {  // TODO: 240501 検索機能を強化するならば、ここをコンポーネント化せよ。(都度バックエンド呼び出し？フロントで保持する？)
    const result: SummaryTask[] = await invoke("retrieve_all_data", {});
    console.log(result);
    setTables(result);
  }

  return (
    <div className="container mx-auto px-5">
      <h1 className="text-3xl font-bold m-auto py-5">lily-viewer</h1>
      {/* TODO: 240502 フロントで全データを保持しておいて、テキスト入力すると全結果を返すとかでいいかも？ */}
      <button
        onClick={fetchAllData} 
        className="
          bg-transparent
          hover:bg-blue-500
          text-blue-700
          font-semibold
          hover:text-white
          py-2
          px-4
          border
          border-blue-500
          hover:border-transparent
          rounded
      ">FETCH ALL DATA</button>
      <SummaryTable tables={tables}/>
    </div>
  );
}

export default App;