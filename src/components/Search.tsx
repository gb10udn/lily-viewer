import { useState, useEffect } from 'react';
import { SummaryTask } from '../App.tsx';

type SearchProps = {
  allData: SummaryTask[],
  setTable: React.Dispatch<React.SetStateAction<SummaryTask[]>>,
}

const Search = (props: SearchProps) => {
  const [searchWord, setSearchWord] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  useEffect(() => {
    const timer = setTimeout(() => {
      doSearchByWord(props.allData, searchWord, props.setTable);
    }, 100);
    return () => clearTimeout(timer);
  }, [searchWord]);

  useEffect(() => {
    const startDate_ = convertExcelDate(startDate); 
    if (startDate_ !== null) {
      doSearchByStartDate(props.allData, startDate_, props.setTable);
    }
  }, [startDate]);

  useEffect(() => {
    const endDate_ = convertExcelDate(endDate);
    if (endDate_ !== null) {
      doSearchByEndDate(props.allData, endDate_, props.setTable);
    }
  }, [endDate]);

  // TODO: 240504 main_class / sub_class をチェックボックスで抽出できるようにする。
  
  return (
    <div className='flex h-10 mt-4 mb-4'>
      <div className="flex-grow">
        <div className="relative flex items-center h-full">
          <div className="absolute left-3">
            <svg aria-hidden="true" className="w-5 h-5 text-gray-500" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
            </svg>
          </div>
          <input
            type="text"
            className="p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-l-lg h-full w-full"
            placeholder="Search"
            value={searchWord}
            onChange={e => setSearchWord(e.target.value)}
          />
        </div>
      </div>
      <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="p-2 pl-3 text-sm text-gray-900 border border-gray-300 h-full" />
      <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="p-2 pl-3 text-sm text-gray-900 border border-gray-300 rounded-r-lg h-full" />
    </div>
  )
}

const convertExcelDate = (date_str: string): number | null => {
  const EXCEL_START_DATE = new Date('1899/12/30');
  const date = new Date(date_str);
  if (isNaN(date.getTime()) === false) {
    return Math.floor((date.getTime() - EXCEL_START_DATE.getTime()) / (1000 * 3600 * 24));
  } else {
    return null;
  }
}

const doSearchByWord = (allData: SummaryTask[], searchWord: string, setTable: React.Dispatch<React.SetStateAction<SummaryTask[]>>) => {
  if (allData.length === 0) {
    return;
  }
  if (searchWord === '') {
    setTable(allData);
  } else {
    const result: SummaryTask[] = [];
    for (let i = 0; i < allData.length; i++) {
      const one = allData[i];
      if (one.content?.includes(searchWord) === true) {  // TODO: 240502 and / or 検索を実装する。
        result.push(one);
      }
    }
    setTable(result);
  }
}

const doSearchByStartDate = (allData: SummaryTask[], searchStartDate: number, setTable: React.Dispatch<React.SetStateAction<SummaryTask[]>>) => {
  if (allData.length === 0) {
    return;
  }

  const result: SummaryTask[] = [];
  for (let i = 0; i < allData.length; i++) {
    const one = allData[i];
    if (one.end_date !== null && searchStartDate <= one.end_date) {
      result.push(one);
    }
  }
  setTable(result);
}

const doSearchByEndDate = (allData: SummaryTask[], searchEndDate: number, setTable: React.Dispatch<React.SetStateAction<SummaryTask[]>>) => {
  if (allData.length === 0) {
    return;
  }
  const result: SummaryTask[] = [];
  for (let i = 0; i < allData.length; i++) {
    const one = allData[i];
    if (one.start_date !== null && searchEndDate >= one.start_date) {
      result.push(one);
    }
  }
  setTable(result);
}

export default Search