import { SummaryTask } from '../App.tsx';

type SearchProps = {
  allData: SummaryTask[],
  setTable: React.Dispatch<React.SetStateAction<SummaryTask[]>>,
}

const Search = (props: SearchProps) => {

  const search = (allData: SummaryTask[], searchWord: string, setTable: React.Dispatch<React.SetStateAction<SummaryTask[]>>) => { 
    const result: SummaryTask[] = [];
    for (let i = 0; i < allData.length; i++) {
      const one = allData[i];
      if (one.content?.includes(searchWord) === true) {
        result.push(one);
      }
    }
    setTable(result)
  }

  return (
    <div className="
      relative
      h-10
      mt-4
      sm:w-96
      xl:w-80
      2xl:w-96
      sm:mx-auto
      lg:m-0"
    >
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
        onChange={e => search(props.allData, e.target.value, props.setTable)}
      />
    </div>
  )
}

export default Search