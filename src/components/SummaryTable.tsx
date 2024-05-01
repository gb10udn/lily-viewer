import { SummaryTask } from '../App.tsx'

type SummaryTableProps = {
  tables: SummaryTask[],
}

const SummaryTable = (props: SummaryTableProps) => {  // TODO: 240501 css あてて、いい感じのテーブルにすること。-> Tailwind CSS を使ってみたいのでやってみる！？
  return (
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
        {props.tables.map((tbl, idx) => (
          <tr key={idx}>
            <td>{tbl.todo_id}</td>
            <td>{tbl.content}</td>
            <td>{tbl.main_class}</td>
            <td>{tbl.sub_class}</td>
            <td>{tbl.start_date}</td>
            <td>{tbl.end_date}</td>
            <td>{tbl.content}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default SummaryTable