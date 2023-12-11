import React from "react";

export default function DeviceRadio({setFilterData,setClickFilterData,filterData,clickFilterData, width="[20rem]"}) {
  return (
    <div className={`grid w-${width} grid-cols-3 gap-2 rounded-xl bg-gray-200 p-2 border border-gray-300`}>    
      <div>
        <input
          type="radio"
          id="all-device"
          name="기기"
          value=""
          className="peer hidden"
          checked={filterData.device === ""}
          onChange={(e) => {
            setFilterData({ 
              ...filterData,
              device: e.target.value,
            });

            setClickFilterData({
              ...clickFilterData,
              device: e.target.value,
            });
          }}
        />
        <label
          htmlFor="all-device"
          className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white"
        >
          전체
        </label>
      </div>
      <div>
        <input
          type="radio"
          id="pc-device"
          name="기기"
          value="pc"
          className="peer hidden"
          onChange={(e) => {
            setFilterData({
              ...filterData,
              device: e.target.value,
            });
            setClickFilterData({
              ...clickFilterData,
              device: e.target.value,
            });
          }}
        />
        <label
          htmlFor="pc-device"
          className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white"
        >
          PC
        </label>
      </div>
      <div>
        <input
          type="radio"
          id="mobile-device"
          name="기기"
          value="mo"
          className="peer hidden"
          onChange={(e) => {
            setFilterData({
              ...filterData,
              device: e.target.value,
            });
            setClickFilterData({
              ...clickFilterData,
              device: e.target.value,
            });
          }}
        />
        <label
          htmlFor="mobile-device"
          className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white"
        >
          모바일
        </label>
      </div>
    </div>
  );
}
