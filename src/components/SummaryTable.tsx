import { SummaryTask } from '../App.tsx'

type SummaryTableProps = {
  tables: SummaryTask[],
}

const SummaryTable = (props: SummaryTableProps) => {  // TODO: 240502 日付や id でソートできるようにする。
  return (
    <div className="whitespace-nowrap overflow-auto h-[80vh] w-[100wh] top-0">
      <table className=''>
        <thead>
          <tr className='text-left sticky top-0 bg-slate-200 border-b border-slate-300'>
            <th className='px-4 py-2'>id</th>
            <th className='px-4 py-2'>main_class</th>
            <th className='px-4 py-2'>sub_class</th>
            <th className='px-4 py-2'>start_date</th>
            <th className='px-4 py-2'>end_date</th>
            <th className='px-4 py-2'>content</th>
          </tr>
        </thead>
        <tbody>
          {props.tables.map((tbl: SummaryTask, idx: number) => (
            <tr key={idx} className='border-t border-slate-300 hover:bg-gray-100'>
              <td className='px-4 py-2'>{tbl.todo_id}</td>
              <td className='px-4 py-2 whitespace-pre-line'>{tbl.main_class}</td>
              <td className='px-4 py-2 whitespace-pre-line'>{tbl.sub_class}</td>
              <td className='px-4 py-2'>{tbl.start_date_}</td>
              <td className='px-4 py-2'>{tbl.end_date_}</td>
              <td className='px-4 py-2 whitespace-pre'>{tbl.content}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default SummaryTable