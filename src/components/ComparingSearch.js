import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { createRoot } from "react-dom/client";
import ClickChart from "./charts/ClickChart";
import { SyncLoader } from "react-spinners";
import SingleDatePicker from "./searchForms/SingleDatePicker";
import dayjs, { Dayjs } from "dayjs";
import FavModal from "../function/FavModal";
import { makeClickChartData } from "../function/MakeClickChartData";
import SelectCategory from "./searchForms/SelectCategory";
import InputKeyword from "./searchForms/InputKeyword";
import SelectPeriod from "./searchForms/SelectPeriod";
import AgeCheckbox from "./searchForms/AgeCheckbox";
import DeviceRadio from "./searchForms/DeviceRadio";
import GenderRadio from "./searchForms/GenderRadio";
import { WithContext as ReactTags } from "react-tag-input";

export default function ComparingSearch(props) {
  const ACCESS_TOKEN = "ACCESS_TOKEN";
  const [tags, setTags] = useState([]);

  const handleAddition = (tag) => {
    const maxTags = 5;

    if (tags.length < maxTags) {
      const newKeyword = {
        name: tag.text,
        param: [tag.text],
      };

      setTags([...tags, tag]);

      if (
        clickFilterData.keyword &&
        clickFilterData.keyword.length > 0 &&
        clickFilterData.keyword[0].name === "" &&
        clickFilterData.keyword[0].param.length === 0
      ) {
        setClickFilterData((prevFilterData) => ({
          ...prevFilterData,
          keyword: [newKeyword, ...prevFilterData.keyword.slice(1)],
        }));
      } else {
        setClickFilterData((prevFilterData) => ({
          ...prevFilterData,
          keyword: [...prevFilterData.keyword, newKeyword],
        }));
      }
    }
  };

  const handleDelete = (i) => {
    const deletedTag = tags[i];

    setTags(tags.filter((tag, index) => index !== i));

    setClickFilterData((prevFilterData) => ({
      ...prevFilterData,
      keyword: prevFilterData.keyword.filter(
        (keyword) => keyword.name !== deletedTag.text
      ),
    }));
  };

  useEffect(() => {
    console.log(tags);
  }, [tags]);

  const [filterData, setFilterData] = useState({
    keyword: "",
    category: "50000000",
    timeUnit: "date",
    startDate: dayjs().subtract(30, "days").format("YYYY-MM-DD"),
    endDate: dayjs().format("YYYY-MM-DD"),
    device: "",
    ages: [],
    gender: "",
  });

  const [clickFilterData, setClickFilterData] = useState({
    keyword: [
      {
        name: "",
        param: [],
      },
    ],
    category: "50000000",
    timeUnit: "date",
    startDate: dayjs().subtract(30, "days").format("YYYY-MM-DD"),
    endDate: dayjs().format("YYYY-MM-DD"),
    device: "",
    ages: [],
    gender: "",
  });
  useEffect(() => {
    console.log(clickFilterData);
  }, [clickFilterData]);

  const [clickRoot, setClickRoot] = useState(null);
  const [isTrend, setIsTrend] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [errorMessage, setErrorMessage] = useState("");

  const [responseData, setResponseData] = useState({
    startDate: null,
    endDate: null,
    timeUnit: null,
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

    makeClickChartData(
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

      handleSubmit(new Event("submit"));
    }
  };

  //@@treeMap에서 보내는 값
  const location = useLocation();
  const { trend, field } = location.state || {};
  //@@trend 처리 따로 빼서 확인
  useEffect(() => {
    if (trend && field) {
      // Update filterData state with trend and field values
      setFilterData((prevFilterData) => ({
        ...prevFilterData,
        keyword: trend,
        category: field,
      }));

      setClickFilterData((prevFilterData) => ({
        ...prevFilterData,
        keyword: [
          {
            name: trend,
            param: [trend],
          },
        ],
        category: field,
      }));

      setIsTrend(true);
    }
  }, [trend, field]);

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    if (responseData.clickResults) {
      // Check if ageResults is available
      if (!clickRoot) {
        const newRoot4 = createRoot(document.getElementById("graph4"));
        newRoot4.render(
          <ClickChart
            startDate={responseData.startDate}
            endDate={responseData.endDate}
            timeUnit={responseData.timeUnit}
            clickResults={responseData.clickResults}
          />
        );
        setClickRoot(newRoot4);
      } else {
        clickRoot.render(
          <ClickChart
            startDate={responseData.startDate}
            endDate={responseData.endDate}
            timeUnit={responseData.timeUnit}
            clickResults={responseData.clickResults}
          />
        );
      }
    }
  }, [responseData, clickRoot, responseData.clickResults]);

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
                키워드 비교분석
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
                  <div className="self-center flex items-start gap-5 ml-5 mt-20 max-md:max-w-full max-md:flex-wrap max-md:mt-10">
                    
                    <ReactTags
                      tags={tags}
                      handleAddition={handleAddition}
                      handleDelete={handleDelete}
                      placeholder="비교할 키워드들을 입력해주세요"
                      inputFieldPosition="top"
                      classNames={{
                        tagInput:
                          "text-black text-xl leading-8 uppercase border w-[600px] h-[40px] md:w-[450px] md:h-[48px] px-3 py-1 rounded-3xl border-solid border-gray-300",
                        tags: "flex flex-wrap max-h-[100px]  text-black text-lg leading-10 justify-center text-center  ", // Added container style
                        tagInputField: "w-full", // Adjust  as needed
                        selected: "selected-tag", // Add this if you want to style the selected tags
                        tag: "ml-1 mr-2 mb-2 inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700", // Add this if you want to style individual tags
                        remove: "remove-tag", // Add this if you want to style the remove icon on tags
                      }}
                    />

                    {errorMessage && (
                      <p className="text-red-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        {errorMessage}
                      </p>
                    )}
                  </div>
                </div>

                {/* <div className="flex items-center gap-3 ml-5 mt-20 self-start max-md:ml-2.5 max-md:mt-10">
                  <SelectPeriod
                    setFilterData={setFilterData}
                    setClickFilterData={setClickFilterData}
                  />
                </div>

                <div className="flex items-center gap-3 ml-5 mt-20 self-start max-md:ml-2.5 max-md:mt-10">
                  <select
                    // defaultValue={field ? field : "50000000"}
                    name="며칠전인가조회"
                    onChange={(e) => {}}
                    className="text-lg font-semibold leading-7 uppercase border w-[100px] h-[40px] md:w-[130px] md:h-[48px] px-3 py-1 rounded-3xl border-solid border-gray-300"
                  >
                    <option value="하루전이름">하루 전</option>
                    <option value="일주일전이름">일주일 전</option>
                    <option value="한달전이름">한 달 전</option>
                    <option value="직접선택이름">직접 선택</option>
                  </select>
                </div>

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
                </div> */}
              </div>

              <div className="flex w-[1500] max-w-full grow flex-col ml-5 self-start max-md:mt-10">
                <div className="flex gap-4 ">
                  <div className="flex items-center gap-3  mt-10 self-start max-md:ml-2.5 max-md:mt-10">
                    <SelectPeriod
                      setFilterData={setFilterData}
                      setClickFilterData={setClickFilterData}
                    />
                  </div>

                  <div className="flex items-center gap-3 ml-5 mt-10 self-start max-md:ml-2.5 max-md:mt-10">
                    <select
                      // defaultValue={field ? field : "50000000"}
                      name="며칠전인가조회"
                      onChange={(e) => {}}
                      className="text-lg font-semibold leading-7 uppercase border w-[100px] h-[40px] md:w-[130px] md:h-[48px] px-3 py-1 rounded-3xl border-solid border-gray-300"
                    >
                      <option value="하루전이름">하루 전</option>
                      <option value="일주일전이름">일주일 전</option>
                      <option value="한달전이름">한 달 전</option>
                      <option value="직접선택이름">직접 선택</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-3 ml-5 mt-10 self-start max-md:ml-2.5 max-md:mt-10 ">
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
                </div>
              </div>
              <div className="flex w-[1500] max-w-full grow flex-col ml-5 self-start max-md:mt-10">
                <div className="flex gap-4 mt-8">
                  <div className="self-stretch flex items-center justify-between gap-2 ml-2">
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

          <div className="self-center flex w-full max-w-[1500px] flex-col mt-5 mb-16 max-md:max-w-full max-md:my-10">
            <div className="">
              <div id="graph4">
                {" "}
              </div>
            </div>
          </div>
        </div>
      )}
      ;
    </>
  );
}
