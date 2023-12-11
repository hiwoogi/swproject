import axios from "axios";
import React, { useEffect, useState } from "react";
import Sidebar from "./fav/Sidebar";
import GenderChart from "./charts/GenderChart";
import AgeChart from "./charts/AgeChart";
import DeviceChart from "./charts/DeviceChart";
import ClickChart from "./charts/ClickChart";
import { SyncLoader } from "react-spinners";
import { Link, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { makeChartData } from "../function/MakeChartData";
import SelectCategory from "./searchForms/SelectCategory";
import InputKeyword from "./searchForms/InputKeyword";
import SelectPeriod from "./searchForms/SelectPeriod";
import SingleDatePicker from "./searchForms/SingleDatePicker";
import AgeCheckbox from "./searchForms/AgeCheckbox";
import DeviceRadio from "./searchForms/DeviceRadio";
import GenderRadio from "./searchForms/GenderRadio";

export default function Fav() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [favResponse, setFavResponse] = useState();
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
    favId: null,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editedContents, setEditedContents] = useState();
  const [originalContents, setOriginalContents] = useState("");
  const fetchData = async () => {
    let headers = {
      "Content-Type": "application/json",
    };
    try {
      const accessToken = localStorage.getItem("ACCESS_TOKEN");
      if (accessToken && accessToken !== null) {
        headers.Authorization = `Bearer ${accessToken}`;
      }
      const response = await axios.get(`http://localhost:8080/favorites`, {
        headers,
      });
      console.log(response);
      setFavResponse(response.data);

      // Handle the fetched data or update state as needed
    } catch (error) {
      console.error(error);

      // Check if error.response is defined
      if (error.response && error.response.status === 403) {
        window.location.href = "/#/login"; // redirect
      } else {
        // Handle other types of errors or display an error message
        console.error("Error in API request:", error);
      }
    }
  };

  const updateContents = async (id) => {
    let headers = {
      "Content-Type": "application/json",
    };
    try {
      const accessToken = localStorage.getItem("ACCESS_TOKEN");
      if (accessToken && accessToken !== null) {
        headers.Authorization = `Bearer ${accessToken}`;
      }
      const response = await axios.put(
        `http://localhost:8080/favorites/${id}`,
        {
          contents: editedContents,
        },
        {
          headers,
        }
      );

      setFavResponse((prevFavResponse) => {
        // Find the index of the item with the specified id
        const index = prevFavResponse.findIndex((item) => item.id === id);

        // If the item is found, update its contents property
        if (index !== -1) {
          const updatedFavResponse = [...prevFavResponse];
          updatedFavResponse[index] = {
            ...updatedFavResponse[index],
            contents: editedContents,
          };
          return updatedFavResponse;
        }

        // If the item is not found, return the original array
        return prevFavResponse;
      });
      console.log(response);

      // Handle the fetched data or update state as needed
    } catch (error) {
      console.error(error);

      // Check if error.response is defined
      if (error.response && error.response.status === 403) {
        window.location.href = "/#/login"; // redirect
      } else {
        // Handle other types of errors or display an error message
        console.error("Error in API request:", error);
      }
    }
  };

  const [selectedOption, setSelectedOption] = useState("month"); // Initial value can be set based on your default selection

  const [filterData, setFilterData] = useState({
    keyword: "",
    category: "50000000",
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
        name: "",
        param: [],
      },
    ],
    category: "50000000",
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

  const [isTrend, setIsTrend] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const [filterResponseData, setFilterResponseData] = useState({
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
      setFilterResponseData,
      filterResponseData.contents,
      filterResponseData.registrationTime
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
    fetchData();
  }, [isLoading]);

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  useEffect(() => {}, [isEditing]);

  useEffect(() => {
    console.log("favres", favResponse);
  }, [favResponse]);

  useEffect(() => {
    console.log(responseData);
    setEditedContents(responseData.contents);
  }, [responseData]);

  const handleComparing = () => {
    const index = favResponse.findIndex(
      (item) => item.id === responseData.favId
    );
    if (index !== -1) {
      // Access the matching item properties
      const filterCriteria = favResponse[index].filterCriteria;
      const clickFilterCriteria = favResponse[index].clickFilterCriteria;
      const title = favResponse[index].title;

      const field = JSON.parse(filterCriteria).category;

      navigate("/favcomparing", {
        state: {
          filterCriteria,
          clickFilterCriteria,
          title,
          field,
        },
      });
      // Assuming you have a route for FavComparingSearch component

      // Use history to change the URL
    } else {
      // Handle the case when no match is found
      console.log("Not matching favId in the array:", responseData.favId);
    }
  };

  const handleEditStart = () => {
    setOriginalContents(editedContents);
    setIsEditing(true);
  };

  const handleEditCancel = () => {
    setEditedContents(originalContents);
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    setEditedContents(e.target.value);
  };

  const handleEditSubmit = () => {
    // axios를 사용하여 putmapping함.
    //favoritedto로 contents를 받은후 업데이트하면될듯함.
    updateContents(responseData.favId);
    setIsEditing(false);
  };

  return (
    <>
      {isLoading ? (
        <div className="flex flex-col items-center justify-center h-screen font-['NEXON']">
          <h1>Loading...</h1> <br />
          <SyncLoader color="#3490dc" />
        </div>
      ) : (
        <div>
          {favResponse && favResponse.length !== 0 ? (
            <div className="font-['NEXON']">
              <Sidebar
                data={favResponse}
                setResponseData={setResponseData}
                setData={setFavResponse}
              />
              <div className="p-4 sm:ml-72 mt-24">
                <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
                  {responseData.genderResults ? (
                    <div className="self-center flex w-full max-w-[1800px] flex-col mt-5 mb-16 max-md:max-w-full max-md:my-10">
                      <div className="mb-5">
                        <div className="lg:grid lg:grid-cols-2">
                          <div className="lg:col-span-1">
                            <span className="text-3xl font-semibold  leading-7 uppercase border w-[100px] h-[40px] md:w-[130px] md:h-[48px] px-5 py-3 rounded-3xl border-solid border-gray-300">
                              {responseData.genderResults[0].title}
                            </span>
                            <div className="mt-2 w-full h-full p-4 rounded-lg flex flex-col">
                              <span className="text-xl">
                                등록일시 :{" "}
                                {responseData.registrationTime
                                  .substring(0, 19)
                                  .replace("T", "  ")}
                              </span>
                              <span className="text-lg mt-2">
                                데이터 기간 : {responseData.startDate} ~{" "}
                                {responseData.endDate}
                              </span>
                              <span className="text-lg mt-2">
                                제목 :{" "}
                                {
                                  favResponse[
                                    favResponse.findIndex(
                                      (item) => item.id === responseData.favId
                                    )
                                  ].title
                                }
                              </span>

                              <div className="mt-2 relative">
                                {isEditing ? (
                                  <div>
                                    <textarea
                                      id="message"
                                      value={editedContents}
                                      onChange={handleInputChange}
                                      rows="2"
                                      className="block p-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                      placeholder="Write your thoughts here..."
                                    ></textarea>
                                    <div className="absolute top-0 right-0 flex">
                                      <button
                                        onClick={handleEditSubmit}
                                        className="p-2 w-8 h-8 border rounded border-solid border-gray-300"
                                      >
                                        <img
                                          loading="lazy"
                                          srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/7ac510d7bb297301375e4577b56caeefb3604b9c2de12d7834b7d1acd4be5f1a?apiKey=d9a6bade01504f228813cd0dfee9b81b&width=100 100w"
                                          alt="Save"
                                          className="w-full h-full"
                                        />
                                      </button>
                                      <button
                                        onClick={handleEditCancel}
                                        className="p-2 w-8 h-8 border rounded border-solid border-gray-300"
                                      >
                                        <img
                                          loading="lazy"
                                          srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/004c160b0de6227dba2157eea316523a1a98fb60589f4bd606ae8867c723a53d?apiKey=d9a6bade01504f228813cd0dfee9b81b&width=100 100w"
                                          alt="Cancel"
                                          className="w-full h-full"
                                        />
                                      </button>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="relative">
                                    <textarea
                                      id="message"
                                      rows="2"
                                      value={editedContents}
                                      readOnly
                                      className="block p-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                      placeholder="내용이 존재하지 않습니다."
                                    >
                                      {editedContents}
                                    </textarea>
                                    <div className="absolute top-0 right-0 flex">
                                      <button
                                        onClick={handleEditStart}
                                        className="p-2 w-8 h-8 border rounded border-solid border-gray-300"
                                      >
                                        <img
                                          loading="lazy"
                                          srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/a41f22bdbd5334a846c45bd23fb348f8393c012f7b967801c7a13941e5576f64?apiKey=d9a6bade01504f228813cd0dfee9b81b&width=100 100w"
                                          alt="Edit"
                                          className="w-full h-full"
                                        />
                                      </button>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="lg:col-span-1">
                            <button
                              onClick={handleComparing}
                              className=" ml-5 mt-2 p-2 w-38 border rounded-3xl border-solid border-gray-300"
                            >
                              필터 비교
                            </button>
                          </div>
                        </div>

                        <form
                          id="searchForm"
                          onSubmit={handleSubmit}
                          className="self-center"
                        >
                          <div className="self-center flex w-full max-w-[1920px] flex-col mt-20 mb-16 max-md:max-w-full max-md:my-10">
                            <div className="flex gap-4">
                              <div className="flex items-center gap-3 ml-5 mt-20 self-start max-md:ml-2.5 max-md:mt-10">
                                <SelectCategory
                                  field={"50000000"}
                                  setFilterData={setFilterData}
                                  setClickFilterData={setClickFilterData}
                                  filterData={filterData}
                                  clickFilterData={clickFilterData}
                                />
                              </div>
                              <div className="relative flex flex-col items-center">
                                <div className="self-center flex items-start gap-5 mt-20 max-md:max-w-full max-md:flex-wrap max-md:mt-10">
                                  <InputKeyword
                                    trend={() => {
                                      const index = favResponse.findIndex(
                                        (item) => item.id === responseData.favId
                                      );
                                      return index !== -1
                                        ? favResponse[index].title
                                        : "";
                                    }}
                                    setFilterData={setFilterData}
                                    setClickFilterData={setClickFilterData}
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
                                    handleAgeCheckboxChange={
                                      handleAgeCheckboxChange
                                    }
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
                      </div>

                      {!filterResponseData.startDate &&
                        responseData.startDate && (
                          <div className="grid gap-5 lg:grid-cols-4">
                            <div className="col-span-3">
                              <ClickChart
                                startDate={responseData.startDate}
                                endDate={responseData.endDate}
                                timeUnit={responseData.timeUnit}
                                clickResults={responseData.clickResults}
                                num={1}
                              />
                            </div>
                            <div className="">
                              <DeviceChart
                                startDate={responseData.startDate}
                                endDate={responseData.endDate}
                                timeUnit={responseData.timeUnit}
                                deviceResults={responseData.deviceResults}
                                num={1}
                              />
                            </div>
                            <div className="col-span-2">
                              <AgeChart
                                startDate={responseData.startDate}
                                endDate={responseData.endDate}
                                timeUnit={responseData.timeUnit}
                                ageResults={responseData.ageResults}
                                num={1}
                              />
                            </div>
                            <div className="col-span-2">
                              <GenderChart
                                startDate={responseData.startDate}
                                endDate={responseData.endDate}
                                timeUnit={responseData.timeUnit}
                                genderResults={responseData.genderResults}
                                num={1}
                              />
                            </div>
                          </div>
                        )}
                      {filterResponseData.startDate &&
                        filterResponseData.endDate && (
                          <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-2 sm:col-span-1">
                              <ClickChart
                                startDate={responseData.startDate}
                                endDate={responseData.endDate}
                                timeUnit={responseData.timeUnit}
                                clickResults={responseData.clickResults}
                                num={1}
                              />
                            </div>
                            <div className="col-span-2 sm:col-span-1">
                              <ClickChart
                                startDate={filterResponseData.startDate}
                                endDate={filterResponseData.endDate}
                                timeUnit={filterResponseData.timeUnit}
                                clickResults={filterResponseData.clickResults}
                                num={2}
                              />
                            </div>
                            <div className="col-span-2 sm:col-span-1">
                              <DeviceChart
                                startDate={responseData.startDate}
                                endDate={responseData.endDate}
                                timeUnit={responseData.timeUnit}
                                deviceResults={responseData.deviceResults}
                                num={1}
                              />
                            </div>
                            <div className="col-span-2 sm:col-span-1">
                              <DeviceChart
                                startDate={filterResponseData.startDate}
                                endDate={filterResponseData.endDate}
                                timeUnit={filterResponseData.timeUnit}
                                deviceResults={filterResponseData.deviceResults}
                                num={2}
                              />
                            </div>
                            <div className="col-span-2 sm:col-span-1">
                              <AgeChart
                                startDate={responseData.startDate}
                                endDate={responseData.endDate}
                                timeUnit={responseData.timeUnit}
                                ageResults={responseData.ageResults}
                                num={1}
                              />
                            </div>
                            <div className="col-span-2 sm:col-span-1">
                              <AgeChart
                                startDate={filterResponseData.startDate}
                                endDate={filterResponseData.endDate}
                                timeUnit={filterResponseData.timeUnit}
                                ageResults={filterResponseData.ageResults}
                                num={2}
                              />
                            </div>
                            <div className="col-span-2 sm:col-span-1">
                              <GenderChart
                                startDate={responseData.startDate}
                                endDate={responseData.endDate}
                                timeUnit={responseData.timeUnit}
                                genderResults={responseData.genderResults}
                                num={1}
                              />
                            </div>
                            <div className="col-span-2 sm:col-span-1">
                              <GenderChart
                                startDate={filterResponseData.startDate}
                                endDate={filterResponseData.endDate}
                                timeUnit={filterResponseData.timeUnit}
                                genderResults={filterResponseData.genderResults}
                                num={2}
                              />
                            </div>
                          </div>
                        )}
                    </div>
                  ) : (
                    <div className="text-5xl max-w-[1000px] self-center mx-auto max-md:text-4xl mt-80 mb-80">
                      <p>저장한 즐겨찾기를 눌러 데이터를 확인해보세요!</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-screen">
              <div className="text-5xl max-w-[1000px] self-center mx-auto max-md:text-4xl mt-20 font-['NEXON']">
                즐겨찾기 데이터가 존재하지 않습니다.
                <p className="text-3xl mt-8">
                  지금 키워드를 분석하고 즐겨찾기에 데이터를 추가해보세요!
                </p>
                <div className="flex flex-col items-center mt-10">
                  <div className="bg-neutral-200 leading-6 uppercase whitespace-nowrap w-[130px] max-w-full pl-6 pr-6 py-3.5 rounded-md max-md:px-5">
                    <Link
                      to="/keyword"
                      className="text-xl text-center font-light"
                    >
                      바로 가기
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      ;
    </>
  );
}