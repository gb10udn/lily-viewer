import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import SummaryTable from './components/SummaryTable.tsx'

export type SummaryTask = {
  todo_id: number,
  main_class: string | null,
  sub_class: string | null,
  start_date: number | null,
  end_date: number | null,
  content: string | null,
}

function App() {
  const [tables, setTables] = useState<SummaryTask[]>([]);

  const fetchAllData = async () => {  // TODO: 240501 検索機能を強化するならば、ここをコンポーネント化せよ。
    const result: SummaryTask[] = await invoke("retrieve_all_data", {});
    console.log(result);
    setTables(result);
  }

  return (
    <div className="container">
      <h1 className="text-3xl font-bold underline">Welcome to Tauri!</h1>
      <button onClick={fetchAllData}>FETCH ALL DATA</button>
      <SummaryTable tables={tables}/>
    </div>
  );
}

export default App;