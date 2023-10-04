
export default function ProgressBar({ progress, fileName }) {
  return (
    <div className="rounded-md bg-[#F5F7FB] py-4 px-8">
      <div className="flex items-center justify-between">
        <span className="truncate pr-3 text-base font-medium text-[#07074D]">
          {fileName} Uploaded {progress}%
        </span>
      </div>
      <div className="relative mt-5 h-[6px] w-full rounded-lg bg-[#E2E5EF]">
        <div
          style={{ width: `${progress}%` }}
          className="absolute left-0 right-0 h-full rounded-lg bg-[#6A64F1]"
        ></div>
      </div>
    </div>
  );
}