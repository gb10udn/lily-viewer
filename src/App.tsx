import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";

type SummaryTask = {
  todo_id: number | null,
  main_class: string | null,
  sub_class: string | null,
  start_date: number | null,
  end_date: number | null,
  content: string | null,
}

function App() {
  const [tables, setTables] = useState<SummaryTask[]>([]);

  const fetchAllData = async () => {
    const result: SummaryTask[] = await invoke("retrieve_all_data", {});
    console.log(result);
    setTables(result);
  }

  return (
    <div className="container">
      <h1>Welcome to Tauri!</h1>
      <button onClick={fetchAllData}>FETCH ALL DATA</button>
      <table>
        <thead>
          <tr>
            <th>todo_id</th>
            <th>content</th>
            <th>main_class</th>
            <th>sub_class</th>
            <th>start_date</th>
            <th>end_date</th>
            <th>content</th>
          </tr>
        </thead>
        <tbody>
          {tables.map((tbl, idx) => (
            <tr key={idx}>
              <td>{tbl.todo_id}</td>
              <td>{tbl.content}</td>
              <td>{tbl.main_class}</td>
              <td>{tbl.sub_class}</td>
              <td>{tbl.start_date}</td>
              <td>{tbl.end_date}</td>
              <td>{tbl.content}</td>
            </tr>)
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
