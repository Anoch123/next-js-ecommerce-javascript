export default function SelectComponent({label,value,onChange,options = [],}) {
    return (
      <div className="relative">
        <p className="font-bold text-sm text-gray-900 mb-2">
          {label}
        </p>
        <select
          value={value}
          onChange={onChange}
          className="border placeholder-gray-400 focus:outline-none focus:border-black w-full pt-2 pr-2 pb-2 pl-2 mr-0 mt-0 ml-0 text-base block border-gray-300 rounded-md">
          {options && options.length ? (
            options.map((optionItem) => (
              <option
                id={optionItem.id}
                value={optionItem.id}
                key={optionItem.id}
              >
                {optionItem.label}
              </option>
            ))
          ) : (
            <option id="" value={""}>
              Select
            </option>
          )}
        </select>
      </div>
    );
  }