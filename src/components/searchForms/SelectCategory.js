import React from "react";

export default function SelectCategory({field,setFilterData,setClickFilterData,filterData,clickFilterData}) {
  return (
    <select
      defaultValue={field ? field : "50000000"}
      name="category"
      onChange={(e) => {
        setFilterData({
          ...filterData,
          category: e.target.value,
        });
        
        setClickFilterData({
          ...clickFilterData,
          category: e.target.value,
        });
      }}
      className="text-lg font-semibold leading-7 uppercase border w-[100px] h-[40px] md:w-[130px] md:h-[48px] px-3 py-1 rounded-3xl border-solid border-gray-300"
    >
      <option value="50000000">패션</option>
      <option value="50000007">스포츠</option>
      <option value="50000003">가전제품</option>
      <option value="50005542">도서</option>
      <option value="50000006">식품</option>
    </select>
  );
}
