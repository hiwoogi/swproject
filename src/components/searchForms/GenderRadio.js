import React from "react";

export default function GenderRadio({setFilterData,setClickFilterData,filterData,clickFilterData}) {
  return (
    <div className="grid w-[20rem] grid-cols-3 gap-2 rounded-xl bg-gray-200 p-2 border border-gray-300">
      <div>
        <input
          type="radio"
          id="all-gender"
          name="성별"
          value=""
          className="peer hidden"
          checked={filterData.gender === ""}
          onChange={(e) => {
            setFilterData({
              ...filterData,
              gender: e.target.value,
            });

            setClickFilterData({
              ...clickFilterData,
              gender: e.target.value,
            });
          }}
        />
        <label
          htmlFor="all-gender"
          className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white"
        >
          전체
        </label>
      </div>
      <div>
        <input
          type="radio"
          id="female"
          name="성별"
          value="f"
          className="peer hidden"
          onChange={(e) => {
            setFilterData({
              ...filterData,
              gender: e.target.value,
            });
            setClickFilterData({
              ...clickFilterData,
              gender: e.target.value,
            });
          }}
        />
        <label
          htmlFor="female"
          className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white"
        >
          여성
        </label>
      </div>
      <div>
        <input
          type="radio"
          id="male"
          name="성별"
          value="m"
          className="peer hidden"
          onChange={(e) => {
            setFilterData({
              ...filterData,
              gender: e.target.value,
            });
            setClickFilterData({
              ...clickFilterData,
              gender: e.target.value,
            });
          }}
        />
        <label
          htmlFor="male"
          className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white"
        >
          남성
        </label>
      </div>
    </div>
  );
}
