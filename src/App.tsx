import { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import SummaryTable from './components/SummaryTable.tsx'
import Search from "./components/Search.tsx";

export type SummaryTask = {
  todo_id: number,
  main_class: string | null,
  sub_class: string | null,
  start_date: number | null,
  start_date_: string | null,
  end_date: number | null, 
  end_date_: string | null,
  content: string | null,
}

const App = () => {
  const [table, setTable] = useState<SummaryTask[]>([]);
  const [allTable, setAllTable] = useState<SummaryTask[]>([]);

  useEffect(() => {
    invoke("retrieve_all_data", {}).then(allData => {
      setTable(allData as SummaryTask[]);  // INFO: 240502 React18 では React.StrictMode の場合、開発環境では２回呼び出される。(ビルド時は呼ばれない)
      setAllTable(structuredClone(allData) as SummaryTask[]);
    });
  }, []);

  return (
    <div className="container mx-auto px-5">
      <h1 className="text-3xl font-bold m-auto py-5">lily-viewer</h1>
      <Search allData={allTable} setTable={setTable}/>
      <SummaryTable table={table} setTable={setTable} />
    </div>
  );
}

export default App;