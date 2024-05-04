import { useState, useEffect } from 'react';
import { SummaryTask } from '../App.tsx';

type SearchProps = {
  allData: SummaryTask[],
  setTable: React.Dispatch<React.SetStateAction<SummaryTask[]>>,
}

const Search = (props: SearchProps) => {
  const [searchWord, setSearchWord] = useState<string>('');

  useEffect(() => {
    const timer = setTimeout(() => {
      doSearch(props.allData, searchWord, props.setTable);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchWord])

  const doSearch = (allData: SummaryTask[], searchWord: string, setTable: React.Dispatch<React.SetStateAction<SummaryTask[]>>) => {
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

  // EDIT: 240504 日付でのソート機能を追加する。
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
      <input type="date" className="p-2 pl-3 text-sm text-gray-900 border border-gray-300 h-full" />
      <input type="date" className="p-2 pl-3 text-sm text-gray-900 border border-gray-300 rounded-r-lg h-full" />
    </div>
  )
}

export default Search