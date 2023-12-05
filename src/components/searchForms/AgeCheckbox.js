import React from "react";

export default function AgeCheckbox({ handleAgeCheckboxChange,isAllAgesChecked}) {
  return (
    <>
      <div>
        <input
          type="checkbox"
          id="all-age"
          name="연령"
          value=""
          onChange={handleAgeCheckboxChange}
          checked={isAllAgesChecked}
        />
        <label
          htmlFor="all-age"
          className="ml-2 text-black text-base font-light self-center whitespace-nowrap my-auto"
        >
          전체
        </label>
      </div>
      <div className="self-stretch flex items-center justify-between gap-2">
        <input
          type="checkbox"
          id="teens"
          name="연령"
          value="10"
          onChange={handleAgeCheckboxChange}
        />
        <label
          htmlFor="teens"
          className="text-black text-base font-light self-center whitespace-nowrap my-auto"
        >
          10대
        </label>
      </div>
      <div className="self-stretch flex items-center justify-between gap-2">
        <input
          type="checkbox"
          id="twenties"
          name="연령"
          value="20"
          onChange={handleAgeCheckboxChange}
        />
        <label
          htmlFor="twenties"
          className="text-black text-base font-light self-center whitespace-nowrap my-auto"
        >
          20대
        </label>
      </div>
      <div className="self-stretch flex items-center justify-between gap-2">
        <input
          type="checkbox"
          id="thirties"
          name="연령"
          value="30"
          onChange={handleAgeCheckboxChange}
        />
        <label
          htmlFor="thirties"
          className="text-black text-base font-light self-center whitespace-nowrap my-auto"
        >
          30대
        </label>
      </div>
      <div className="self-stretch flex items-center justify-between gap-2">
        <input
          type="checkbox"
          id="forties"
          name="연령"
          value="40"
          onChange={handleAgeCheckboxChange}
        />
        <label
          htmlFor="forties"
          className="text-black text-base font-light self-center whitespace-nowrap my-auto"
        >
          40대
        </label>
      </div>
      <div className="self-stretch flex items-center justify-between gap-2">
        <input
          type="checkbox"
          id="fifties"
          name="연령"
          value="50"
          onChange={handleAgeCheckboxChange}
        />
        <label
          htmlFor="fifties"
          className="text-black text-base font-light self-center whitespace-nowrap my-auto"
        >
          50대
        </label>
      </div>
      <div className="self-stretch flex items-center justify-between gap-2">
        <input
          type="checkbox"
          id="sixties"
          name="연령"
          value="60"
          onChange={handleAgeCheckboxChange}
        />
        <label
          htmlFor="sixties"
          className="text-black text-base font-light self-center whitespace-nowrap my-auto"
        >
          60대
        </label>
      </div>
    </>
  );
}
