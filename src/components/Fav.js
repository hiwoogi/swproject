import axios from "axios";
import React, { useEffect, useState } from "react";
import Sidebar from "./fav/Sidebar";
import GenderChart from "./charts/GenderChart";
import AgeChart from "./charts/AgeChart";
import DeviceChart from "./charts/DeviceChart";
import ClickChart from "./charts/ClickChart";
import { SyncLoader } from "react-spinners";
import { Link, json, useNavigate } from "react-router-dom";
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
  const [showForm, setShowForm] = useState(false);
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
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
    startDate: dayjs().subtract(1, "month").format("YYYY-MM-DD"),
    endDate: dayjs().format("YYYY-MM-DD"),
    timeUnit: "date",
    category: "50000000",
    keyword: "",
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

      handleSubmit(new Event("submit"));
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
    setEditedContents(responseData.contents);
    setShowForm(false);
    setFilterResponseData({
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
    setFilterData({
      keyword: "",
      category: "50000000",
      timeUnit: "date",
      startDate: dayjs().subtract(1, "month").format("YYYY-MM-DD"),
      endDate: dayjs().format("YYYY-MM-DD"),
      device: "",
      ages: [],
      gender: "",
    });
    setClickFilterData({
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
    setIsAllAgesChecked(true);
    setSelectedOption("month");
  }, [responseData]);

  const handleComparing = () => {
    if (showForm === false) {
      setShowForm((prevShowForm) => !prevShowForm);
      const index = favResponse.findIndex(
        (item) => item.id === responseData.favId
      );
      const category =
        index !== -1
          ? JSON.parse(favResponse[index].filterCriteria).category
          : "";

      const keyword =
        index !== -1
          ? JSON.parse(favResponse[index].filterCriteria).keyword
          : "";

      console.log(category);
      console.log(keyword);
      setFilterData({
        ...filterData,
        category: category,
        keyword: keyword,
      });

      setClickFilterData({
        ...clickFilterData,
        category: category,
        keyword: [
          {
            name: keyword,
            param: [keyword],
          },
        ],
      });
    } else {
      // const initialFilterResponseData = {
      //   startDate: null,
      //   endDate: null,
      //   timeUnit: null,
      //   genderResults: null,
      //   ageResults: null,
      //   deviceResults: null,
      //   clickResults: null,
      //   contents: null,
      //   registrationTime: null,
      // };
      setShowForm((prevShowForm) => !prevShowForm);
      // setFilterResponseData(initialFilterResponseData)
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
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev); // Toggle sidebar visibility
  };
  const formatAges = (ages) => {
    if (
      !ages ||
      (Array.isArray(ages) && ages.length === 0) ||
      JSON.stringify(ages) ===
        JSON.stringify(["10", "20", "30", "40", "50", "60"])
    ) {
      return "전체";
    }
    if (Array.isArray(ages)) {
      const sortedAges = ages.sort((a, b) => a - b);

      // Format the sorted ages as a string
      return sortedAges.join(", ");
    }
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
              <button
                onClick={toggleSidebar}
                className="px-4 py-1 fixed top-21 z-50"
              >
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/e02589cae5808ab8a78c9fcf6faef90de7666044cddef6d6eac576c0cb2bd1ed?apiKey=d9a6bade01504f228813cd0dfee9b81b&width=100 100w"
                  alt="Button Image"
                  className="w-5 h-6 mr-2"
                />
              </button>
              <Sidebar
                data={favResponse}
                setResponseData={setResponseData}
                setData={setFavResponse}
                setIsSidebarOpen={setIsSidebarOpen}
                isSidebarOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
              />

              <div
                className={`${
                  isSidebarOpen ? "ml-72 mt-24" : "ml-0"
                } transition-all flex-grow p-4 mt-24`}
              >
                <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
                  {responseData.genderResults ? (
                    <div className="self-center flex w-full flex-col mt-5 mb-16 max-md:max-w-full max-md:my-10">
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
                              <span className="mt-2 text-lg">
                                분류 :{" "}
                                {(() => {
                                  let categoryMap = {
                                    50000000: "패션", //패션
                                    50000007: "스포츠", //스포츠
                                    50000003: "가전", //가전
                                    50005542: "도서", //도서
                                    50000006: "식품", //식품
                                    50000002: "미용", //미용
                                    50000004: "가구", //가구
                                    50000005: "육아", //육아
                                    50000008: "생활건강", //생활건강
                                    50000009: "여가생활", //여가생활
                                  };

                                  const index = favResponse.findIndex(
                                    (item) => item.id === responseData.favId
                                  );
                                  const filter =
                                    index !== -1
                                      ? JSON.parse(
                                          favResponse[index].filterCriteria
                                        ).category
                                      : "";
                                  return categoryMap[filter]; // Change keyword to filter
                                })()}
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

                              <div className="mt-3 relative">
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
                                <div className="mt-5">
                                  <span className=" text-lg mr-10">
                                    성별 :{" "}
                                    <span className="bg-red-200 text-black-800 p-1 rounded">
                                      {(() => {
                                        let genderMap = {
                                          "": "전체",
                                          f: "여성",
                                          m: "남성",
                                        };

                                        const index = favResponse.findIndex(
                                          (item) =>
                                            item.id === responseData.favId
                                        );
                                        const filter =
                                          index !== -1
                                            ? JSON.parse(
                                                favResponse[index]
                                                  .filterCriteria
                                              ).gender
                                            : "";
                                        return genderMap[filter]; // Change keyword to filter
                                      })()}
                                    </span>
                                  </span>

                                  <span className=" text-lg mr-10">
                                    기기 :{" "}
                                    <span className="bg-red-200 text-black-800 p-1 rounded">
                                      {(() => {
                                        let deviceMap = {
                                          "": "전체", //패션
                                          pc: "pc", //스포츠
                                          mo: "모바일",
                                        };

                                        const index = favResponse.findIndex(
                                          (item) =>
                                            item.id === responseData.favId
                                        );
                                        const filter =
                                          index !== -1
                                            ? JSON.parse(
                                                favResponse[index]
                                                  .filterCriteria
                                              ).device
                                            : "";
                                        return deviceMap[filter]; // Change keyword to filter
                                      })()}
                                    </span>
                                  </span>

                                  <span className=" text-lg ">
                                    연령 :{" "}
                                    <span className="bg-red-200 text-black-800 p-1 rounded">
                                      {(() => {
                                        const index = favResponse.findIndex(
                                          (item) =>
                                            item.id === responseData.favId
                                        );
                                        let filter =
                                          index !== -1
                                            ? JSON.parse(
                                                favResponse[index]
                                                  .filterCriteria
                                              ).ages
                                            : "";
                                        let ageString = "";
                                        if (Array.isArray(filter)) {
                                          filter = filter.sort(
                                            (a, b) => parseInt(a) - parseInt(b)
                                          );
                                          // If it's an array, display it as a comma-separated string
                                          ageString = filter.join(", ");
                                        } else {
                                          // If it's a single value, just use that value
                                          ageString = filter;
                                        }

                                        if (
                                          ageString === "" ||
                                          ageString === "10, 20, 30, 40, 50, 60"
                                        ) {
                                          ageString = "전체";
                                        }
                                        return ageString; // Change keyword to filter
                                      })()}
                                    </span>
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="lg:col-span-1 ml-5">
                          <label className="relative inline-flex items-center mb-5 cursor-pointer">
                              <input
                                type="checkbox"
                                onClick={handleComparing}
                                className="sr-only peer"
                                checked={showForm}
                              />
                              <div class="w-20 h-10 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[3px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-9 after:h-9 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>

                              <span className="ms-5 text-xl font-semibold text-gray-900 dark:text-gray-300">
                                필터 비교
                              </span>
                              <span className="text-base ml-5">
                                필터 비교를 사용하여 저장한 즐겨찾기의 다른 필터
                                값을 쉽게 비교해보세요!
                              </span>
                            </label>
                            {showForm ? (
                              <form
                                id="searchForm"
                                onSubmit={handleSubmit}
                                className="self-center mt-5"
                              >
                                <div className="self-center flex w-full flex-col max-md:max-w-full max-md:my-10">
                                  <div className="flex gap-4 mt-10">
                                    <div className="flex items-center gap-3 ml-5 self-start max-md:ml-2.5 max-md:mt-10">
                                      <SelectPeriod
                                        setFilterData={setFilterData}
                                        setClickFilterData={setClickFilterData}
                                      />
                                    </div>

                                    <div className="flex items-center gap-3 ml-5 self-start max-md:ml-2.5 max-md:mt-10">
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
                                        <option value="custom">
                                          직접 선택
                                        </option>
                                      </select>
                                    </div>
                                    {selectedOption === "custom" && (
                                      <div className="flex items-center gap-3 ml-5 self-start max-md:ml-2.5 max-md:mt-10 ">
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

                                  <div className="flex    flex-col ml-7 self-start max-md:mt-10">
                                    <div className="self-stretch flex items-center justify-between gap-5 mt-8">
                                      <AgeCheckbox
                                        handleAgeCheckboxChange={
                                          handleAgeCheckboxChange
                                        }
                                        isAllAgesChecked={isAllAgesChecked}
                                      />
                                      <DeviceRadio
                                        setFilterData={setFilterData}
                                        setClickFilterData={setClickFilterData}
                                        filterData={filterData}
                                        clickFilterData={clickFilterData}
                                        width="w-15"
                                      />
                                      <GenderRadio
                                        setFilterData={setFilterData}
                                        setClickFilterData={setClickFilterData}
                                        filterData={filterData}
                                        clickFilterData={clickFilterData}
                                        width="w-30"
                                      />
                                    </div>

                                    <div className=" text-lg flex flex-row">
                                      <span className="mr-10 mt-5 ">
                                        성별 :{" "}
                                        <span className="bg-blue-200 text-black-800 p-1 rounded">
                                          {filterData.gender === ""
                                            ? "전체"
                                            : filterData.gender === "m"
                                            ? "남성"
                                            : "여성"}
                                        </span>
                                      </span>
                                      <span className="mr-10 mt-5">
                                        기기 :{" "}
                                        <span className="bg-blue-200 text-black-800 p-1 rounded">
                                          {filterData.device === ""
                                            ? "전체"
                                            : filterData.device === "mo"
                                            ? "모바일"
                                            : "pc"}
                                        </span>
                                      </span>
                                      <span className="mr-10 mt-5">
                                        연령 :
                                        <span className="ml-1 bg-blue-200 text-black-800 p-1 rounded">
                                          {formatAges(filterData.ages)}
                                        </span>
                                        
                                      </span>
                                      <span
                                          className="border bg-white flex mt-2.5 px-3.5 py-2 rounded-[20px] border-solid border-gray-300 max-md:px-5 "
                                          onClick={handleButtonClick}
                                          style={{ cursor: "pointer" }}
                                        >
                                          <div className="self-center flex items-center mt-0.5 w-[84px] max-w-full gap-0">
                                            <img
                                              loading="lazy"
                                              srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/d4229ddf-a29f-46af-b439-5fab4021194e?apiKey=d9a6bade01504f228813cd0dfee9b81b&width=100 100w"
                                              className="aspect-[1.11] object-contain object-center w-[30px] overflow-hidden self-stretch max-w-full"
                                            />
                                            <div className="text-black text-base font-light self-center whitespace-nowrap my-auto">
                                              조회하기
                                            </div>
                                          </div>
                                        </span>
                                    </div>

                                    <div className="flex gap-4 mt-8"></div>
                                  </div>
                                </div>
                              </form>
                            ) : null}
                          </div>
                        </div>
                      </div>

                      {responseData.startDate && !showForm && (
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
                        filterResponseData.endDate &&
                        showForm && (
                          <div className="grid grid-cols-2 gap-4">
                            <div className="sm:col-span-1 mr-5 border-2 border-red-300 p-4 rounded-lg">
                              <span className="text-2xl text-red-300">
                                A그룹
                              </span>
                              <div className="mb-5">
                                <ClickChart
                                  startDate={responseData.startDate}
                                  endDate={responseData.endDate}
                                  timeUnit={responseData.timeUnit}
                                  clickResults={responseData.clickResults}
                                  num={1}
                                />
                              </div>
                              <div className="mb-5">
                                <AgeChart
                                  startDate={responseData.startDate}
                                  endDate={responseData.endDate}
                                  timeUnit={responseData.timeUnit}
                                  ageResults={responseData.ageResults}
                                  num={1}
                                />
                              </div>
                              <div className="flex items-center">
                                <div className="mr-2">
                                  <DeviceChart
                                    startDate={responseData.startDate}
                                    endDate={responseData.endDate}
                                    timeUnit={responseData.timeUnit}
                                    deviceResults={responseData.deviceResults}
                                    num={1}
                                  />
                                </div>
                                <GenderChart
                                  startDate={responseData.startDate}
                                  endDate={responseData.endDate}
                                  timeUnit={responseData.timeUnit}
                                  genderResults={responseData.genderResults}
                                  num={1}
                                />
                              </div>
                            </div>

                            <div className="sm:col-span-1 ml-5 border-2 border-blue-300 p-4 rounded-lg">
                              <span className="text-2xl text-blue-300">
                                B그룹
                              </span>
                              <div className="mb-5">
                                <ClickChart
                                  startDate={filterResponseData.startDate}
                                  endDate={filterResponseData.endDate}
                                  timeUnit={filterResponseData.timeUnit}
                                  clickResults={filterResponseData.clickResults}
                                  num={2}
                                />
                              </div>
                              <div className="mb-5">
                                <AgeChart
                                  startDate={filterResponseData.startDate}
                                  endDate={filterResponseData.endDate}
                                  timeUnit={filterResponseData.timeUnit}
                                  ageResults={filterResponseData.ageResults}
                                  num={2}
                                />
                              </div>
                              <div className="flex items-center">
                                <div className="mr-2">
                                  <DeviceChart
                                    startDate={filterResponseData.startDate}
                                    endDate={filterResponseData.endDate}
                                    timeUnit={filterResponseData.timeUnit}
                                    deviceResults={
                                      filterResponseData.deviceResults
                                    }
                                    num={2}
                                  />
                                </div>
                                <GenderChart
                                  startDate={filterResponseData.startDate}
                                  endDate={filterResponseData.endDate}
                                  timeUnit={filterResponseData.timeUnit}
                                  genderResults={
                                    filterResponseData.genderResults
                                  }
                                  num={2}
                                />
                              </div>
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
