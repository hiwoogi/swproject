import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { createRoot } from "react-dom/client";
import GenderChart from "./charts/GenderChart";
import AgeChart from "./charts/AgeChart";
import DeviceChart from "./charts/DeviceChart";
import ClickChart from "./charts/ClickChart";
import { SyncLoader } from "react-spinners";
import SingleDatePicker from "./searchForms/SingleDatePicker";
import dayjs, { Dayjs } from "dayjs";

export default function Search(props) {
  const ACCESS_TOKEN = "ACCESS_TOKEN";

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
  const [root, setRoot] = useState(null);

  const [ageRoot, setAgeRoot] = useState(null);
  const [deviceRoot, setDeviceRoot] = useState(null);
  const [clickRoot, setClickRoot] = useState(null);
  const [isTrend, setIsTrend] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [responseData, setResponseData] = useState({
    startDate: null,
    endDate: null,
    timeUnit: null,
    genderResults: null,
    ageResults: null,
    deviceResults: null,
    clickResults: null,
  });
  const daysInMonth = {
    "01": 31,
    "02": 28,
    "03": 31,
    "04": 30,
    "05": 31,
    "06": 30,
    "07": 31,
    "08": 31,
    "09": 30,
    10: 31,
    11: 30,
    12: 31,
  };
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
  // 윤년 체크
  function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  }

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
    e.preventDefault(); // Prevent the default form submission behavior

    makeChartData();
  };

  const handleButtonClick = () => {
    const form = document.getElementById("searchForm");

    if (form) {
      const formData = new FormData(form);

      handleSubmit(new Event("submit"));
    }
  };

  const handleFavButtonClick = () => {
    const form = document.getElementById("searchForm");

    if (form) {
      const formData = new FormData(form);

      handleFavSubmit(new Event("submit"));
    }
  };

  const handleFavSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    let headers = {
      "Content-Type": "application/json",
    };
    
    const memberId = localStorage.getItem("MEMBER_ID");
    
    console.log({
      filterData,
      clickFilterData,
      member: { id: memberId }
    },)

    const apiUrl = "http://localhost:8080/favorites";
   
    try {
      const accessToken = localStorage.getItem("ACCESS_TOKEN");
      if (accessToken && accessToken !== null) {
        headers.Authorization = `Bearer ${accessToken}`;
        
      }
      const response = await axios.post(
        apiUrl,
        {
          filterData,
          clickFilterData,
          member: { id: memberId }
        },
        {headers}
      );

      console.log("API Response:", response.data);
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

  async function makeChartData() {
    const baseUrl = "http://localhost:8080";
    let headers = {
      Authorization: "Bearer your_access_token", // Include any authorization token if required
      "Content-Type": "application/json", // Set the content type according to your API requirements
      // Add any other headers as needed
    };
    try {
      const accessToken = localStorage.getItem("ACCESS_TOKEN");

      if (accessToken && accessToken !== null) {
        headers.Authorization = `Bearer ${accessToken}`;
      }
      // Make all requests concurrently
      console.log(headers)
      const [genderResponse, ageResponse, deviceResponse, clickResponse] =
        await Promise.all([
          axios.post(baseUrl + "/test/gender", filterData, { headers }),
          axios.post(baseUrl + "/test/age", filterData, { headers }),
          axios.post(baseUrl + "/test/device", filterData, { headers }),
          axios.post(baseUrl + "/test/click", clickFilterData, { headers }),
        ]);
      console.log("전송 시작값 :", filterData.startDate);
      console.log("전송 끝값 : ", filterData.endDate);
      // Extract data from responses
      const genderResults = genderResponse.data.results;
      const ageResults = ageResponse.data.results;
      const deviceResults = deviceResponse.data.results;
      const clickResults = clickResponse.data.results;

      // Update state in a single call
      setResponseData((prevData) => ({
        ...prevData,
        startDate: genderResponse.data.startDate,
        endDate: genderResponse.data.endDate,
        timeUnit: genderResponse.data.timeUnit,
        genderResults,
        ageResults,
        deviceResults,
        clickResults,
      }));
      console.log("star", responseData.startDate);
      console.log("end", responseData.endDate);
      console.log(responseData);
    } catch (error) {
      console.log(error.response.status);
      if (error.response.status === 403) {
        window.location.href = "/#/login"; // redirect
      }
      // return Promise.reject(error);
    }
  }

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
    if (isTrend === true) {
      makeChartData();
      console.log(responseData);
      if (responseData.startDate && responseData.endDate) {
        if (!root) {
          const newRoot = createRoot(document.getElementById("graph1"));
          newRoot.render(
            <GenderChart
              startDate={responseData.startDate}
              endDate={responseData.endDate}
              timeUnit={responseData.timeUnit}
              genderResults={responseData.genderResults}
            />
          );
          setRoot(newRoot);
        } else {
          root.render(
            <GenderChart
              startDate={responseData.startDate}
              endDate={responseData.endDate}
              timeUnit={responseData.timeUnit}
              genderResults={responseData.genderResults}
            />
          );
        }
      }

      if (responseData.ageResults) {
        if (!ageRoot) {
          const newRoot2 = createRoot(document.getElementById("graph2"));
          newRoot2.render(
            <AgeChart
              startDate={responseData.startDate}
              endDate={responseData.endDate}
              timeUnit={responseData.timeUnit}
              ageResults={responseData.ageResults}
            />
          );
          setAgeRoot(newRoot2);
        } else {
          ageRoot.render(
            <AgeChart
              startDate={responseData.startDate}
              endDate={responseData.endDate}
              timeUnit={responseData.timeUnit}
              ageResults={responseData.ageResults}
            />
          );
        }
      }

      if (responseData.deviceResults) {
        // Check if ageResults is available
        if (!deviceRoot) {
          const newRoot3 = createRoot(document.getElementById("graph3"));
          newRoot3.render(
            <DeviceChart
              startDate={responseData.startDate}
              endDate={responseData.endDate}
              timeUnit={responseData.timeUnit}
              deviceResults={responseData.deviceResults}
            />
          );
          setDeviceRoot(newRoot3);
        } else {
          deviceRoot.render(
            <DeviceChart
              startDate={responseData.startDate}
              endDate={responseData.endDate}
              timeUnit={responseData.timeUnit}
              deviceResults={responseData.deviceResults}
            />
          );
        }
      }

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
    }
  }, [isLoading]);

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    if (responseData.startDate && responseData.endDate) {
      if (!root) {
        const newRoot = createRoot(document.getElementById("graph1"));
        newRoot.render(
          <GenderChart
            startDate={responseData.startDate}
            endDate={responseData.endDate}
            timeUnit={responseData.timeUnit}
            genderResults={responseData.genderResults}
          />
        );
        setRoot(newRoot);
      } else {
        root.render(
          <GenderChart
            startDate={responseData.startDate}
            endDate={responseData.endDate}
            timeUnit={responseData.timeUnit}
            genderResults={responseData.genderResults}
          />
        );
      }
    }

    if (responseData.ageResults) {
      if (!ageRoot) {
        const newRoot2 = createRoot(document.getElementById("graph2"));
        newRoot2.render(
          <AgeChart
            startDate={responseData.startDate}
            endDate={responseData.endDate}
            timeUnit={responseData.timeUnit}
            ageResults={responseData.ageResults}
          />
        );
        setAgeRoot(newRoot2);
      } else {
        ageRoot.render(
          <AgeChart
            startDate={responseData.startDate}
            endDate={responseData.endDate}
            timeUnit={responseData.timeUnit}
            ageResults={responseData.ageResults}
          />
        );
      }
    }

    if (responseData.deviceResults) {
      // Check if ageResults is available
      if (!deviceRoot) {
        const newRoot3 = createRoot(document.getElementById("graph3"));
        newRoot3.render(
          <DeviceChart
            startDate={responseData.startDate}
            endDate={responseData.endDate}
            timeUnit={responseData.timeUnit}
            deviceResults={responseData.deviceResults}
          />
        );
        setDeviceRoot(newRoot3);
      } else {
        deviceRoot.render(
          <DeviceChart
            startDate={responseData.startDate}
            endDate={responseData.endDate}
            timeUnit={responseData.timeUnit}
            deviceResults={responseData.deviceResults}
          />
        );
      }
    }

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
  }, [
    responseData,
    ageRoot,
    deviceRoot,
    root,
    clickRoot,
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
        <div className="bg-white flex flex-col px-20 max-md:px-5 font-['NEXON']">
          <form id="searchForm" onSubmit={handleSubmit} className="self-center">
            <div className="self-center flex w-full max-w-[1920px] flex-col mt-20 mb-16 max-md:max-w-full max-md:my-10">
              <div className="text-black text-5xl max-w-[377px] self-center max-md:text-4xl">
                키워드 검색
              </div>

              {/* @@분야, 검색창 변경 */}
              <div className="flex gap-4">
                <div className="flex items-center gap-3 ml-5 mt-20 self-start max-md:ml-2.5 max-md:mt-10">
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
                </div>

                <div className="self-center flex  items-start  gap-5 mt-20 max-md:max-w-full max-md:flex-wrap max-md:mt-10">
                  <input
                    name="keyword"
                    defaultValue={trend ? trend : ""}
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
                  />
                </div>
                <div className="flex items-center gap-3 ml-5 mt-20 self-start max-md:ml-2.5 max-md:mt-10">
                  <select
                    className="text-lg font-semibold leading-7 uppercase border w-[100px] h-[40px] md:w-[130px] md:h-[48px] px-3 py-1 rounded-3xl border-solid border-gray-300"
                    defaultValue="date" // Set the default selected option
                    onChange={(e) => {
                      setFilterData({
                        ...filterData,
                        timeUnit: e.target.value,
                      });

                      setClickFilterData({
                        ...clickFilterData,
                        timeUnit: e.target.value,
                      });
                    }}
                  >
                    <option value="date">일간</option>
                    <option value="week">주간</option>
                    <option value="month">월간</option>
                  </select>
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
                    <option value="사용자정의이름">사용자 정의</option>
                  </select>
                </div>

                {/* <div className="flex items-center gap-3 ml-5 mt-20 self-start max-md:ml-2.5 max-md:mt-10">
                  <select
                    name="start-year"
                    defaultValue="2023"
                    onChange={(e) => {
                      const selectedYear = e.target.value;
                      const selectedMonth = document.querySelector(
                        'select[name="start-month"]'
                      ).value;

                      if (selectedMonth === "02" && isLeapYear(selectedYear)) {
                        daysInMonth["02"] = 29;
                      }

                      const selectedDay = daysInMonth[selectedMonth];
                      const newStartDate = selectedYear + "-" + selectedMonth + "-" + selectedDay;
                      setFilterData({
                        ...filterData,
                        startDate: newStartDate,
                      });

                      setClickFilterData({
                        ...clickFilterData,
                        startDate: newStartDate
                      })
                    }}
                    className="text-lg font-semibold leading-7 uppercase border w-[100px] h-[40px] md:w-[130px] md:h-[48px] px-3 py-1 rounded-3xl border-solid border-gray-300"
                  >
                    <option value="2017">2017</option>
                    <option value="2018">2018</option>
                    <option value="2019">2019</option>
                    <option value="2020">2020</option>
                    <option value="2021">2021</option>
                    <option value="2022">2022</option>
                    <option value="2023">2023</option>
                  </select>
                </div>
                <div className="flex items-center gap-3 ml-5 mt-20 self-start max-md:ml-2.5 max-md:mt-10">
                  <select
                    name="start-month"
                    defaultValue="08"
                    onChange={(e) => {
                      const selectedYear = document.querySelector(
                        'select[name="start-year"]'
                      ).value;
                      const selectedMonth = e.target.value;

                      if (selectedMonth === "02" && isLeapYear(selectedYear)) {
                        daysInMonth["02"] = 29;
                      }

                      const selectedDay = daysInMonth[selectedMonth];
                      const newStartDate = selectedYear + "-" + selectedMonth + "-" + selectedDay;
                      setFilterData({
                        ...filterData,
                        startDate: newStartDate,
                      });

                      setClickFilterData({
                        ...clickFilterData,
                        startDate: newStartDate
                      })
                    }}
                    className="text-lg font-semibold leading-7 uppercase border w-[100px] h-[40px] md:w-[130px] md:h-[48px] px-3 py-1 rounded-3xl border-solid border-gray-300"
                  >
                    <option value="01">01</option>
                    <option value="02">02</option>
                    <option value="03">03</option>
                    <option value="04">04</option>
                    <option value="05">05</option>
                    <option value="06">06</option>
                    <option value="07">07</option>
                    <option value="08">08</option>
                    <option value="09">09</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                  </select>
                </div>
                <div className="bg-zinc-300 self-center flex w-[45px] h-[7px] flex-col mt-20  " />
                <div className="flex items-center gap-3 ml-5 mt-20 self-start max-md:ml-2.5 max-md:mt-10">
                  <select
                    name="end-year"
                    defaultValue="2023"
                    onChange={(e) => {
                      const selectedYear = e.target.value;
                      const selectedMonth = document.querySelector(
                        'select[name="end-month"]'
                      ).value;

                      if (selectedMonth === "02" && isLeapYear(selectedYear)) {
                        daysInMonth["02"] = 29;
                      }

                      const selectedDay = daysInMonth[selectedMonth];
                      const newStartDate = selectedYear + "-" + selectedMonth + "-" + selectedDay;
                      setFilterData({
                        ...filterData,
                        endDate: newStartDate
                      });

                      setClickFilterData({
                        ...clickFilterData,
                        endDate: newStartDate
                      })
                    }}
                    className="text-lg font-semibold leading-7 uppercase border w-[100px] h-[40px] md:w-[130px] md:h-[48px] px-3 py-1 rounded-3xl border-solid border-gray-300"
                  >
                    <option value="2017">2017</option>
                    <option value="2018">2018</option>
                    <option value="2019">2019</option>
                    <option value="2020">2020</option>
                    <option value="2021">2021</option>
                    <option value="2022">2022</option>
                    <option value="2023">2023</option>
                  </select>
                </div>
                <div className="flex items-center gap-3 ml-5 mt-20 self-start max-md:ml-2.5 max-md:mt-10">
                  <select
                    name="end-month"
                    defaultValue="09"
                    onChange={(e) => {
                      const selectedYear = document.querySelector(
                        'select[name="end-year"]'
                      ).value;
                      const selectedMonth = e.target.value;

                      if (selectedMonth === "02" && isLeapYear(selectedYear)) {
                        daysInMonth["02"] = 29;
                      }

                      const selectedDay = daysInMonth[selectedMonth];
                      const newStartDate = selectedYear + "-" + selectedMonth + "-" + selectedDay;

                      setFilterData({
                        ...filterData,
                        endDate: newStartDate,
                      });

                      setClickFilterData({
                        ...clickFilterData,
                        endDate: newStartDate
                      })
                    }}
                    className="text-lg font-semibold leading-7 uppercase border w-[100px] h-[40px] md:w-[130px] md:h-[48px] px-3 py-1 rounded-3xl border-solid border-gray-300"
                  >
                    <option value="01">01</option>
                    <option value="02">02</option>
                    <option value="03">03</option>
                    <option value="04">04</option>
                    <option value="05">05</option>
                    <option value="06">06</option>
                    <option value="07">07</option>
                    <option value="08">08</option>
                    <option value="09">09</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                  </select>
                </div> */}

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

                {/* <div
                    onClick={handleButtonClick}
                    style={{ cursor: "pointer" }}
                  >
                <div className="flex items-center gap-3 ml-5 mt-20 self-start max-md:ml-2.5 max-md:mt-10">
                  <div className="flex flex-row text-lg font-semibold leading-7 uppercase border w-[100px] h-[40px] md:w-[130px] md:h-[48px] px-3 py-1 rounded-3xl border-solid border-gray-300">
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
                </div> */}
              </div>

              <div className="flex w-[1500] max-w-full grow flex-col ml-5 self-start max-md:mt-10">
                <div className="flex gap-4 mt-8">
                  <div className="self-stretch flex items-center justify-between gap-2">
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
                      className="text-black text-base font-light self-center whitespace-nowrap my-auto"
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

                  {/* @@기기 radio 변경 */}
                  <div className="grid w-[21rem] grid-cols-3 gap-2 rounded-xl bg-gray-200 p-2 border border-gray-300">
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

                  {/* @@성별 radio 변경 */}
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
                  <div
                    className="border bg-white flex flex-col flex-1 px-8 py-4 rounded-[30px] border-solid border-gray-300 max-md:px-5"
                    onClick={handleFavButtonClick}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="self-center flex w-[84px] max-w-full items-start gap-0">
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/7ee4812c-c045-44e9-aa52-0da59d97d0af?apiKey=d9a6bade01504f228813cd0dfee9b81b&"
                        className="aspect-[1.11] object-contain object-center w-[30px] overflow-hidden self-stretch max-w-full"
                      />
                      <div className="text-black text-base font-light self-center whitespace-nowrap my-auto">
                        즐겨찾기
                      </div>
                    </div>
                  </div>
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
                  {/* <SingleDatePicker value={dayjs(filterData.startDate)} onDateChange={handleStartDateChange}/>
                  <SingleDatePicker value={dayjs(filterData.endDate)} onDateChange={handleEndDateChange}/> */}
                </div>
              </div>
            </div>
          </form>

          <div className="self-center flex w-full max-w-[1500px] flex-col mt-5 mb-16 max-md:max-w-full max-md:my-10">
            <div className="grid gap-5 lg:grid-cols-4">
              <div id="graph4" className="col-span-3">
                {" "}
              </div>

              <div id="graph3"> </div>

              <div id="graph2" className="col-span-2">
                {" "}
              </div>

              <div id="graph1" className="col-span-2">
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
