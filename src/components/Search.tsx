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

  return (
    <div className="
      relative
      h-10
      mt-4
      mb-4
    ">
      <input className="
          w-full
          h-full
          px-1
          text-gray-700
          border border-gray-200
          rounded-lg
          focus:border-primary
          focus:outline-none
          focus:ring
          focus:ring-primary
          focus:ring-opacity-20
        "
        type="text"
        placeholder="Search"
        value={searchWord}
        onChange={e => setSearchWord(e.target.value)}
      />
    </div>
  )
}

export default Search