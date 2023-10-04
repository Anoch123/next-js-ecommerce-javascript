"use client";

export default function FileSelector({ acceptType, maxLimit, handleImage }) {
  return (
    <>
        <input accept={acceptType} max={maxLimit} type="file" onChange={handleImage} multiple className="p-1 w-full text-slate-500 text-sm rounded-full leading-6 file:bg-violet-200 file:text-violet-700 file:font-semibold file:border-none file:px-4 file:py-1 file:mr-6 file:rounded-full hover:file:bg-violet-100 border border-gray-300"/>
    </>
  );
}