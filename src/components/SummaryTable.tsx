import React from 'react';
import { SummaryTask } from '../App.tsx';

let todo_id_ascending = true;
let main_class_assending = true;
let sub_class_assending = true;
let start_date_ascending = true;
let end_date_ascending = true;

type SummaryTableProps = {
  table: SummaryTask[],
  setTable: React.Dispatch<React.SetStateAction<SummaryTask[]>>,
}

const SummaryTable = (props: SummaryTableProps) => {
  return (
    <div className="whitespace-nowrap overflow-auto h-[80vh] w-[100wh] top-0 rounded-lg">
      <table className=''>
        <thead>
          <tr className='text-left sticky top-0 bg-slate-200 border-b border-slate-300'>
            <th className='px-4 py-2'>
              <SortableThDiv sortFunc={sortTodoId} levealName="main_class" table={props.table} setTable={props.setTable} />
            </th>

            <th className="px-4 py-2">
              <SortableThDiv sortFunc={sortMainClass} levealName="main_class" table={props.table} setTable={props.setTable} />
            </th>

            <th className="px-4 py-2">
              <SortableThDiv sortFunc={sortSubClass} levealName="sub_class" table={props.table} setTable={props.setTable} />
            </th>

            <th className='px-4 py-2'>
              <SortableThDiv sortFunc={sortStartDate} levealName="start_date" table={props.table} setTable={props.setTable} />
            </th>
            <th className='px-4 py-2'>
              <SortableThDiv sortFunc={sortEndDate} levealName="end_date" table={props.table} setTable={props.setTable} />
            </th>
            <th className='px-4 py-2'>content</th>
          </tr>
        </thead>
        <tbody>
          {props.table.map((tbl: SummaryTask, idx: number) => (
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
  );
}

type SortableThDivProps = {
  sortFunc: any,
  levealName: String,
  table: SummaryTask[],
  setTable: React.Dispatch<React.SetStateAction<SummaryTask[]>>,
}

const SortableThDiv = (props: SortableThDivProps): React.ReactNode => {
  return (
    <div className="flex items-center">
      {props.levealName}
      <a href="#" onClick={() => props.sortFunc(props.table, props.setTable)}>
        <svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          {/* TODO: 240504 降順 or 昇順の状態で、絵を変えた方が良さそう。現在の自分の状態が分からなくなってしまう。普通に、.svg ファイルを持ってくる方が中身が分かっていいかも？ */}
          <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
        </svg>
      </a>
    </div>
  );
}

const sortTodoId = (table: SummaryTask[], setTable: React.Dispatch<React.SetStateAction<SummaryTask[]>>) => {
  const result = [...table].sort((i, j) => {
    if (todo_id_ascending === false) {
      return i.todo_id - j.todo_id
    } else {
      return j.todo_id - i.todo_id
    }
  })
  todo_id_ascending = !todo_id_ascending;
  setTable(result);
}

const sortMainClass = (table: SummaryTask[], setTable: React.Dispatch<React.SetStateAction<SummaryTask[]>>) => {
  const result = [...table].sort((i, j) => {
    if (i.main_class === null && j.main_class === null) {
      return 0;
    }
    if (i.main_class === null) {  // INFO: 240504 null は一番下にくるようにした。
      return 1;
    }
    if (j.main_class === null) {
      return -1;
    }
    if (main_class_assending === false) {
      return i.main_class.localeCompare(j.main_class);
    } else {
      return -i.main_class.localeCompare(j.main_class);
    }
  })
  main_class_assending = !main_class_assending;
  setTable(result);
}

const sortSubClass = (table: SummaryTask[], setTable: React.Dispatch<React.SetStateAction<SummaryTask[]>>) => {
  const result = [...table].sort((i, j) => {
    if (i.sub_class === null && j.sub_class === null) {
      return 0;
    }
    if (i.sub_class === null) {
      return 1;
    }
    if (j.sub_class === null) {
      return -1;
    }
    if (sub_class_assending === false) {
      return i.sub_class.localeCompare(j.sub_class);
    } else {
      return -i.sub_class.localeCompare(j.sub_class);
    }
  })
  sub_class_assending = !sub_class_assending;
  setTable(result);
}

const sortStartDate = (table: SummaryTask[], setTable: React.Dispatch<React.SetStateAction<SummaryTask[]>>) => {
  const result = [...table].sort((i, j) => {
    if (i.start_date === null && j.start_date === null) {
      return 0;
    }
    if (i.start_date === null) {
      return 1;
    }
    if (j.start_date === null) {
      return -1;
    }
    if (start_date_ascending === false) {
      return i.start_date - j.start_date;
    } else {
      return j.start_date - i.start_date;
    }
  })
  start_date_ascending = !start_date_ascending;
  setTable(result);
}

const sortEndDate = (table: SummaryTask[], setTable: React.Dispatch<React.SetStateAction<SummaryTask[]>>) => {
  const result = [...table].sort((i, j) => {
    if (i.end_date === null && j.end_date === null) {
      return 0;
    }
    if (i.end_date === null) {
      return 1;
    }
    if (j.end_date === null) {
      return -1;
    }
    if (start_date_ascending === false) {
      return i.end_date - j.end_date;
    } else {
      return j.end_date - i.end_date;
    }
  })
  end_date_ascending = !end_date_ascending;
  setTable(result);
}

export default SummaryTable;