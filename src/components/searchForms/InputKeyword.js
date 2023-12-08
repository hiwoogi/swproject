import React from "react";

export default function InputKeyword({trend,setFilterData,setClickFilterData, readonly}) {
  return (
    <input
      name="keyword"
      defaultValue={trend ? trend : ""}
      readOnly={readonly}
      onChange={(e) => {
        const newKeyword = e.target.value;
        setFilterData((prevFilterData) => ({
          ...prevFilterData,
          keyword: newKeyword,
        }));

        setClickFilterData((prevFilterData) => ({
          ...prevFilterData,
          keyword: [
            {
              name: newKeyword,
              param: [newKeyword],
            },
          ],
        }));
      }}
      type="text"
      className="text-black text-xl leading-8 uppercase border w-[300px] h-[40px] md:w-[300px] md:h-[48px] px-3 py-1 rounded-3xl border-solid border-gray-300"
      placeholder="키워드를 입력하세요"
      required
    />
  );
}
