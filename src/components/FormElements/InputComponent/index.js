import React from 'react'

const InputComponent = ({label,placeholder,onChange,value,type}) => {
  return (
    <div className="relative">
      <p className='block mb-2 text-sm text-gray-900 font-bold'>{label}</p>
      <input
        placeholder={placeholder}
        type={type || "text"}
        value={value}
        onChange={onChange}
        className="border placeholder-gray-400 focus:outline-none focus:border-black w-full pt-2 pr-2 pb-2 pl-2 mr-0 mt-0 ml-0 text-base block bg-white border-gray-300 rounded-md"
      />
    </div>
  )
}

export default InputComponent