import React from "react";

export default function SelectPeriod({setFilterData,setClickFilterData}) {
  return (
    <select
      className="text-lg font-semibold leading-7 uppercase border w-[100px] h-[40px] md:w-[130px] md:h-[48px] px-3 py-1 rounded-3xl border-solid border-gray-300"
      defaultValue="date" // Set the default selected option
      onChange={(e) => {
        setFilterData((prevFilterData) =>({
          ...prevFilterData,
          timeUnit: e.target.value,
        }));

        setClickFilterData((prevClickFilterData) =>({
          ...prevClickFilterData,
          timeUnit: e.target.value,
        }));
      }}
    >
      <option value="date">일간</option>
      <option value="week">주간</option>
      <option value="month">월간</option>
    </select>
  );
}
