import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import GenderChart from "./charts/GenderChart";
import AgeChart from "./charts/AgeChart";
import DeviceChart from "./charts/DeviceChart";
import ClickChart from "./charts/ClickChart";
import { SyncLoader } from "react-spinners";
import SingleDatePicker from "./searchForms/SingleDatePicker";
import dayjs from "dayjs";
import { makeChartData } from "../function/MakeChartData";
import SelectCategory from "./searchForms/SelectCategory";
import InputKeyword from "./searchForms/InputKeyword";
import SelectPeriod from "./searchForms/SelectPeriod";
import AgeCheckbox from "./searchForms/AgeCheckbox";
import DeviceRadio from "./searchForms/DeviceRadio";
import GenderRadio from "./searchForms/GenderRadio";

export default function FavComparingSearch(props) {
  const [selectedOption, setSelectedOption] = useState("month"); // Initial value can be set based on your default selection

  const favLocation = useLocation();
  const { state } = favLocation;

  // Access individual properties from the state object
  const { filterCriteria, clickFilterCriteria, title, field } = state;
  console.log(field)
  const [filterData, setFilterData] = useState({
    keyword: title,
    category: field,
    timeUnit: "date",
    startDate: dayjs().subtract(1, "month").format("YYYY-MM-DD"),
    endDate: dayjs().format("YYYY-MM-DD"),
    device: "",
    ages: [],
    gender: "",
  });

  const [clickFilterData, setClickFilterData] = useState({
    keyword: [
      {
        name: title,
        param: [title],
      },
    ],
    category: field,
    timeUnit: "date",
    startDate: dayjs().subtract(1, "month").format("YYYY-MM-DD"),
    endDate: dayjs().format("YYYY-MM-DD"),
    device: "",
    ages: [],
    gender: "",
  });
  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedOption(selectedValue);

    let newStartDate = filterData.startDate;
    let newEndDate = filterData.endDate;

    if (selectedValue === "day") {
      newStartDate = dayjs().subtract(2, "day").format("YYYY-MM-DD");
      newEndDate = dayjs().format("YYYY-MM-DD");
    } else if (selectedValue === "week") {
      newStartDate = dayjs().subtract(1, "week").format("YYYY-MM-DD");
      newEndDate = dayjs().format("YYYY-MM-DD");
    } else if (selectedValue === "month") {
      newStartDate = dayjs().subtract(1, "month").format("YYYY-MM-DD");
      newEndDate = dayjs().format("YYYY-MM-DD");
    }

    setFilterData({
      ...filterData,
      startDate: newStartDate,
      endDate: newEndDate,
    });

    setClickFilterData({
      ...clickFilterData,
      startDate: newStartDate,
      endDate: newEndDate,
    });
  };


  const [isLoading, setIsLoading] = useState(true);

  const [errorMessage, setErrorMessage] = useState("");

  const [responseData, setResponseData] = useState({
    startDate: null,
    endDate: null,
    timeUnit: null,
    genderResults: null,
    ageResults: null,
    deviceResults: null,
    clickResults: null,
    contents: null,
    registrationTime: null,
  });

  //달력날짜조정
  const handleStartDateChange = (startDate) => {
    setFilterData({
      ...filterData,
      startDate,
    });
    setClickFilterData({
      ...clickFilterData,
      startDate,
    });
  };

  const handleEndDateChange = (endDate) => {
    setFilterData({
      ...filterData,
      endDate,
    });
    setClickFilterData({
      ...clickFilterData,
      endDate,
    });
  };

  useEffect(() => {
    console.log(clickFilterData.keyword);
  }, [clickFilterData]);

  //나이 조정
  const [isAllAgesChecked, setIsAllAgesChecked] = useState(true);
  const handleAgeCheckboxChange = (e) => {
    const ageValue = e.target.value;
    const isChecked = e.target.checked;

    if (ageValue === "") {
      //전체 체크박스를 클릭한 경우, 모든 연령대 체크박스 업데이트
      const updatedAges = isChecked ? ["10", "20", "30", "40", "50", "60"] : [];

      const allAgeDivs = document.querySelectorAll(
        ".self-stretch input[type=checkbox]"
      );
      allAgeDivs.forEach((ageCheckbox) => {
        ageCheckbox.checked = isChecked;
      });

      //전체 체크박스를 누를 때 다른 연령대 체크박스도 해제되도록 수정
      if (!isChecked) {
        setIsAllAgesChecked(false);
      } else {
        setIsAllAgesChecked(true);
      }

      setFilterData((prevFilterData) => ({
        ...prevFilterData,
        ages: updatedAges,
      }));

      setClickFilterData((prevClickFilterData) => ({
        ...prevClickFilterData,
        ages: updatedAges,
      }));
    } else {
      //다른 연령대 체크박스에 대해 개별적으로 처리
      const updatedAges = isChecked
        ? [...filterData.ages, ageValue]
        : filterData.ages.filter((age) => age !== ageValue);

      setFilterData((prevFilterData) => ({
        ...prevFilterData,
        ages: updatedAges,
      }));

      setClickFilterData((prevClickFilterData) => ({
        ...prevClickFilterData,
        ages: updatedAges,
      }));

      //다른 연령 체크박스가 해제된 경우, 전체 체크박스도 해제
      const allAgeCheckbox = document.querySelector(
        ".self-stretch input[type=checkbox][value='']"
      );
      if (!isChecked) {
        allAgeCheckbox.checked = false;
      }

      //전체 체크박스를 누를 때 다른 연령대 체크박스도 해제되도록 수정
      setIsAllAgesChecked(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    makeChartData(
      filterData,
      clickFilterData,
      setResponseData,
      responseData.contents,
      responseData.registrationTime
    );
  };

  const handleButtonClick = () => {
    const form = document.getElementById("searchForm");

    if (form) {
      const formData = new FormData(form);
      const keyword = formData.get("keyword");

      if (keyword && keyword.trim() !== "") {
        setErrorMessage("");
        handleSubmit(new Event("submit"));
      } else {
        setErrorMessage("키워드를 입력하세요.");
      }
    }
  };

 

  useEffect(() => {

  }, [isLoading]);

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  useEffect(() => {

  }, [
    responseData.clickResults,
  ]);

  return (
    <>
      {isLoading ? (
        <div className="flex flex-col items-center justify-center h-screen font-['NEXON']">
          <h1>Loading...</h1> <br />
          <SyncLoader color="#3490dc" />
        </div>
      ) : (
        <div className="bg-white flex flex-col px-20 max-md:px-5 font-['NEXON'] mt-24">
          <form id="searchForm" onSubmit={handleSubmit} className="self-center">
            <div className="self-center flex w-full max-w-[1920px] flex-col mt-20 mb-16 max-md:max-w-full max-md:my-10">
              <div className="text-black text-5xl max-w-[377px] self-center max-md:text-4xl">
                필터 비교 검색
              </div>

              <div className="flex gap-4">
                <div className="flex items-center gap-3 ml-5 mt-20 self-start max-md:ml-2.5 max-md:mt-10">
                  <SelectCategory
                    field={field}
                    setFilterData={setFilterData}
                    setClickFilterData={setClickFilterData}
                    filterData={filterData}
                    clickFilterData={clickFilterData}
                  />
                </div>
                <div className="relative flex flex-col items-center">
                  <div className="self-center flex items-start gap-5 mt-20 max-md:max-w-full max-md:flex-wrap max-md:mt-10">
                    <InputKeyword
                      trend={title}
                      setFilterData={setFilterData}
                      setClickFilterData={setClickFilterData}
                      readonly={true}
                    />
                    {errorMessage && (
                      <p className="text-red-500 absolute top-1/2 left-24 transform -translate-x-1/2 -translate-y-1/2">
                        {errorMessage}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3 ml-5 mt-20 self-start max-md:ml-2.5 max-md:mt-10">
                  <SelectPeriod
                    setFilterData={setFilterData}
                    setClickFilterData={setClickFilterData}
                  />
                </div>

                <div className="flex items-center gap-3 ml-5 mt-20 self-start max-md:ml-2.5 max-md:mt-10">
                  <select
                    // defaultValue={field ? field : "50000000"}
                    name=""
                    onChange={handleSelectChange}
                    value={selectedOption}
                    className="text-lg font-semibold leading-7 uppercase border w-[100px] h-[40px] md:w-[130px] md:h-[48px] px-3 py-1 rounded-3xl border-solid border-gray-300"
                  >
                    <option value="day">하루 전</option>
                    <option value="week">일주일 전</option>
                    <option value="month">한 달 전</option>
                    <option value="custom">직접 선택</option>
                  </select>
                </div>
                {selectedOption === "custom" && (
                  <div className="flex items-center gap-3 ml-5 mt-20 self-start max-md:ml-2.5 max-md:mt-10 ">
                    <SingleDatePicker
                      value={dayjs(filterData.startDate)}
                      onDateChange={handleStartDateChange}
                    />
                    -
                    <SingleDatePicker
                      value={dayjs(filterData.endDate)}
                      onDateChange={handleEndDateChange}
                    />
                  </div>
                )}
              </div>

              <div className="flex w-[1500] max-w-full grow flex-col ml-5 self-start max-md:mt-10">
                <div className="flex gap-4 mt-8">
                  <div className="self-stretch flex items-center justify-between gap-2">
                    <AgeCheckbox
                      handleAgeCheckboxChange={handleAgeCheckboxChange}
                      isAllAgesChecked={isAllAgesChecked}
                    />
                  </div>

                  {/* @@기기 radio 변경 */}
                  <DeviceRadio
                    setFilterData={setFilterData}
                    setClickFilterData={setClickFilterData}
                    filterData={filterData}
                    clickFilterData={clickFilterData}
                  />
                  <GenderRadio
                    setFilterData={setFilterData}
                    setClickFilterData={setClickFilterData}
                    filterData={filterData}
                    clickFilterData={clickFilterData}
                  />

                  <div
                    className="border bg-white flex flex-col flex-1 px-8 py-4 rounded-[30px] border-solid border-gray-300 max-md:px-5"
                    onClick={handleButtonClick}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="self-center flex w-[84px] max-w-full items-start gap-0">
                      <img
                        loading="lazy"
                        srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/d4229ddf-a29f-46af-b439-5fab4021194e?apiKey=d9a6bade01504f228813cd0dfee9b81b&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/d4229ddf-a29f-46af-b439-5fab4021194e?apiKey=d9a6bade01504f228813cd0dfee9b81b&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/d4229ddf-a29f-46af-b439-5fab4021194e?apiKey=d9a6bade01504f228813cd0dfee9b81b&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/d4229ddf-a29f-46af-b439-5fab4021194e?apiKey=d9a6bade01504f228813cd0dfee9b81b&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/d4229ddf-a29f-46af-b439-5fab4021194e?apiKey=d9a6bade01504f228813cd0dfee9b81b&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/d4229ddf-a29f-46af-b439-5fab4021194e?apiKey=d9a6bade01504f228813cd0dfee9b81b&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/d4229ddf-a29f-46af-b439-5fab4021194e?apiKey=d9a6bade01504f228813cd0dfee9b81b&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/d4229ddf-a29f-46af-b439-5fab4021194e?apiKey=d9a6bade01504f228813cd0dfee9b81b&"
                        className="aspect-[1.11] object-contain object-center w-[30px] overflow-hidden self-stretch max-w-full"
                      />
                      <div className="text-black text-base font-light self-center whitespace-nowrap my-auto">
                        조회하기
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>

          {responseData.startDate && responseData.endDate && (
          <div className="self-center flex w-full max-w-[1500px] flex-col mt-5 mb-16 max-md:max-w-full max-md:my-10">
            <div className="grid gap-5 lg:grid-cols-4">
              <div id="clickGraph" className="col-span-3">
                <ClickChart
                  startDate={responseData.startDate}
                  endDate={responseData.endDate}
                  timeUnit={responseData.timeUnit}
                  clickResults={responseData.clickResults}
                />
              </div>

              <div id="deviceGraph">
              <DeviceChart
                startDate={responseData.startDate}
                endDate={responseData.endDate}
                timeUnit={responseData.timeUnit}
                deviceResults={responseData.deviceResults}
              />
               </div>
              <div id="ageGraph" className="col-span-2">
                <AgeChart
                  startDate={responseData.startDate}
                  endDate={responseData.endDate}
                  timeUnit={responseData.timeUnit}
                  ageResults={responseData.ageResults}
                />
              </div>

              <div id="genderGraph" className="col-span-2">
                <GenderChart
                  startDate={responseData.startDate}
                  endDate={responseData.endDate}
                  timeUnit={responseData.timeUnit}
                  genderResults={responseData.genderResults}
                />
              </div>
            </div>
          </div>)}

          {/* {responseData.startDate && responseData.endDate && (
          <div className="self-center flex w-full max-w-[1500px] flex-col mt-5 mb-16 max-md:max-w-full max-md:my-10">
            <div className="grid gap-5 lg:grid-cols-4">
              <div id="clickGraph2" className="col-span-3">
                <ClickChart
                  startDate={responseData.startDate}
                  endDate={responseData.endDate}
                  timeUnit={responseData.timeUnit}
                  clickResults={responseData.clickResults}
                />
              </div>

              <div id="deviceGraph2">
              <DeviceChart
                startDate={responseData.startDate}
                endDate={responseData.endDate}
                timeUnit={responseData.timeUnit}
                deviceResults={responseData.deviceResults}
              />
               </div>
              <div id="ageGraph2" className="col-span-2">
                <AgeChart
                  startDate={responseData.startDate}
                  endDate={responseData.endDate}
                  timeUnit={responseData.timeUnit}
                  ageResults={responseData.ageResults}
                />
              </div>

              <div id="genderGraph2" className="col-span-2">
                <GenderChart
                  startDate={responseData.startDate}
                  endDate={responseData.endDate}
                  timeUnit={responseData.timeUnit}
                  genderResults={responseData.genderResults}
                />
              </div>
            </div>
          </div>)} */}
        </div>
          
      )}
      ;
    </>
  );
}
