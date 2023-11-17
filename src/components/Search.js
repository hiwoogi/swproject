import axios from "axios";
import React, { useEffect, useState } from "react";

import { useLocation } from 'react-router-dom'; 

import { createRoot } from 'react-dom/client';
import GenderChart from "./charts/GenderChart";
import AgeChart from "./charts/AgeChart";
import DeviceChart from "./charts/DeviceChart";
import ClickChart from "./charts/ClickChart";

export default function Search(props) {
  const [filterData, setFilterData] = useState({
    keyword: "",
    category: "50000000",
    timeUnit: "month",
    startDate: "2017-08-01",
    endDate: "2017-09-30",
    device: "",
    ages: [],
    gender: "",
  });

  const [clickFilterData, setClickFilterData] = useState({
    keyword: [
      {
        name: "",
        param: []
      }
    ],
    category: "50000000",
    timeUnit: "month",
    startDate: "2017-08-01",
    endDate: "2017-09-30",
    device: "",
    ages: [],
    gender: "",
  });
  const [root, setRoot] = useState(null);

  const [ageRoot, setAgeRoot] = useState(null);
  const [deviceRoot, setDeviceRoot] = useState(null);
  const [clickRoot, setClickRoot] = useState(null);
  const [isTrend, setIsTrend] = useState(false);


  const [responseData, setResponseData] = useState({
    startDate: null,
    endDate: null,
    timeUnit: null,
    genderResults: null,
    ageResults: null,
    deviceResults: null,
    clickResults : null,
    
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

  // 윤년 체크
  function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  }
  const handleAgeCheckboxChange = (e) => {
    const ageValue = e.target.value;
    const isChecked = e.target.checked;
  
    if (ageValue === "") {
      // If "전체" checkbox is clicked, update all age checkboxes
      const allAgeDivs = document.querySelectorAll(".self-stretch input[type=checkbox]");
      allAgeDivs.forEach((ageCheckbox) => {
        ageCheckbox.checked = isChecked;  
      });
      setFilterData({
        ...filterData,
        ages: [],
      });
      setClickFilterData({
        ...clickFilterData,
        ages: [],
      });
    } else {
      // For other age checkboxes, handle individually
      setFilterData((prevFilterData) => ({
        ...prevFilterData,
        ages: isChecked
          ? [...prevFilterData.ages, ageValue]
          : prevFilterData.ages.filter((age) => age !== ageValue),
      }));
      setClickFilterData((prevClickFilterData) => ({
        ...prevClickFilterData,
        ages: isChecked
          ? [...prevClickFilterData.ages, ageValue]
          : prevClickFilterData.ages.filter((age) => age !== ageValue),
      }));
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

  async function makeChartData() {
    const baseUrl = "http://localhost:8080";
    
    try {
      // Make all requests concurrently
      const [genderResponse, ageResponse, deviceResponse, clickResponse] = await Promise.all([
        axios.post(baseUrl + "/test/gender", filterData),
        axios.post(baseUrl + "/test/age", filterData),
        axios.post(baseUrl + "/test/device", filterData),
        axios.post(baseUrl + "/test/click", clickFilterData)
        
      ]);
  
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
  
   
    } catch (error) {
      console.log(error);
    }
  }

  //@@trend에서 보내는 값
  const location = useLocation();
  const trend = new URLSearchParams(location.search).get('trend');
  const field = new URLSearchParams(location.search).get('field');
  
  //@@우선 따로 빼서 확인만 해놨어요..
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
      }))

      setIsTrend(true)
    }

  }, [trend, field]);

  

  useEffect(() => {
    makeChartData()
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
  
    if (responseData.deviceResults) { // Check if ageResults is available
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
  
    if (responseData.clickResults) { // Check if ageResults is available
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
 
  }, [isTrend]);
  
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

  if (responseData.deviceResults) { // Check if ageResults is available
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

  if (responseData.clickResults) { // Check if ageResults is available
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

},  [responseData, ageRoot, deviceRoot, root,clickRoot ,responseData.clickResults]);
  
  return (
    <div className="bg-white flex flex-col px-20 max-md:px-5">
      <form id="searchForm" onSubmit={handleSubmit}>
        <div className="self-center flex w-full max-w-[1078px] flex-col mt-32 mb-24 max-md:max-w-full max-md:my-10">
          <div className="text-black text-5xl max-w-[377px] self-center max-md:text-4xl">
            키워드 검색하기
          </div>
          <div className="flex w-[356px] max-w-full items-start justify-between gap-5 ml-5 mt-20 self-start max-md:ml-2.5 max-md:mt-10">
            <div className="text-black text-xl leading-8 uppercase self-center my-auto">
              분야
            </div>

            <select
              name="category"
              onChange={(e) =>
                setFilterData({
                  ...filterData,
                  category: e.target.value,
                })
              }
              className="text-black text-base font-light leading-6 uppercase self-stretch border w-[269px] max-w-full grow shrink basis-auto items-start justify-between gap-5 pl-32 py-7 rounded-3xl border-solid border-black max-md:pl-5"
            >
              <option value="50000000">패션</option>
              <option value="50000007">스포츠</option>
              <option value="50000003">가전제품</option>
              <option value="leisure">여가</option>
              <option value="50000006">음식</option>
            </select>
          </div>
          <div className="self-center flex w-full items-start justify-between gap-5 mt-16 max-md:max-w-full max-md:flex-wrap max-md:mt-10">
            <div className="text-black text-xl leading-8 uppercase self-center my-auto">
              검색어
            </div>
            <input
              name="keyword"
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
              className="text-black text-xl leading-8 uppercase self-stretch border w-[975px] max-w-full grow shrink basis-auto items-start justify-between gap-5 stroke-[1px] stroke-black pl-5 py-3 rounded-3xl border-solid border-black max-md:pl-3"
              placeholder="검색어를 입력하세요"
            />
          </div>
          <div className="flex w-[953px] max-w-full grow flex-col ml-5 mt-14 self-start max-md:mt-10">
            <div className="self-stretch flex items-start justify-between gap-4 pr-60 max-md:max-w-full max-md:flex-wrap max-md:pr-5">
              <div className="text-black text-xl leading-8 uppercase self-center my-auto">
                기간
              </div>
              <div className="relative">
                <select
                  className="text-black text-base font-light leading-6 uppercase self-stretch border w-[102px] max-w-full items-start justify-between gap-4 pl-9 pr-2.5 py-8 rounded-3xl border-solid border-black max-md:pl-5"
                  defaultValue="month" // Set the default selected option
                >
                  <option value="date">일간</option>
                  <option value="week">주간</option>
                  <option value="month">월간</option>
                </select>
              </div>
              <select
                name="start-year"
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
                    startDate:newStartDate
                  })
                }}
                className="text-black text-base font-light leading-6 uppercase self-stretch border w-[102px] max-w-full items-start justify-between gap-2.5 pl-8 pr-2.5 py-8 rounded-3xl border-solid border-black max-md:pl-5"
              >
                <option value="2017">2017</option>
                <option value="2018">2018</option>
                <option value="2019">2019</option>
                <option value="2020">2020</option>
                <option value="2021">2021</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
              </select>
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
                    startDate:newStartDate
                  })
                }}
                className="text-black text-base font-light leading-6 uppercase self-stretch border w-[83px] max-w-full items-start justify-between gap-2.5 pl-8 pr-2.5 py-8 rounded-3xl border-solid border-black max-md:pl-5"
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
              <div className="bg-zinc-300 self-center flex w-[45px] h-[7px] flex-col grow shrink-0 basis-auto my-auto" />
              <select
                name="end-year"
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
                    endDate:newStartDate
                  })
                }}
                className="text-black text-base font-light leading-6 uppercase self-stretch border w-[102px] max-w-full items-start justify-between gap-2.5 pl-8 pr-2.5 py-8 rounded-3xl border-solid border-black max-md:pl-5"
              >
                <option value="2017">2017</option>
                <option value="2018">2018</option>
                <option value="2019">2019</option>
                <option value="2020">2020</option>
                <option value="2021">2021</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
              </select>
              <select
                name="end-month"
                defaultValue="08"
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
                    endDate:newStartDate
                  })
                }}
                className="text-black text-base font-light leading-6 uppercase self-stretch border w-[83px] max-w-full items-start justify-between gap-2.5 pl-8 pr-2.5 py-8 rounded-3xl border-solid border-black max-md:pl-5"
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
            <div className="flex w-[435px] max-w-full items-start justify-between gap-5 mt-14 self-start max-md:flex-wrap max-md:justify-center max-md:mt-10">
              <div className="text-black text-lg self-center my-auto">기기</div>
              <div className="self-stretch flex items-start justify-between gap-2">
                <input type="radio" id="all-device" name="기기" value="" 
                onChange={(e) =>{
                  setFilterData({
                    ...filterData,
                    device: e.target.value,
                  })

                  setClickFilterData({
                    ...clickFilterData,
                    device:e.target.value,
                  })
                }
                
                }/>
                <label
                  htmlFor="all-device"
                  className="text-black text-base font-light self-center whitespace-nowrap my-auto"
                >
                  전체
                </label>
              </div>
              <div className="self-stretch flex items-start justify-between gap-2">
                <input type="radio" id="pc-device" name="기기" value="pc"
                onChange={(e) =>{
                  setFilterData({
                    ...filterData,
                    device: e.target.value,
                  })
                  setClickFilterData({
                    ...clickFilterData,
                    device:e.target.value,
                  })
                }
                } />
                <label
                  htmlFor="pc-device"
                  className="text-black text-base font-light self-center whitespace-nowrap my-auto"
                >
                  PC
                </label>
              </div>
              <div className="self-stretch flex items-start justify-between gap-2">
                <input
                  type="radio"
                  id="mobile-device"
                  name="기기"
                  value="mo"
                  onChange={(e) =>{
                    setFilterData({
                      ...filterData,
                      device: e.target.value,
                    })
                    setClickFilterData({
                      ...clickFilterData,
                      device:e.target.value,
                    })
                  }
                    
                  }
                />
                <label
                  htmlFor="mobile-device"
                  className="text-black text-base font-light self-center whitespace-nowrap my-auto"
                >
                  모바일
                </label>
              </div>
            </div>
            <div className="flex w-[418px] max-w-full items-start justify-between gap-5 mt-6 self-start max-md:justify-center">
              <div className="text-black text-lg self-center my-auto">성별</div>
              <div className="self-stretch flex items-start justify-between gap-2">
                <input type="radio" id="all-gender" name="성별" value=""
                onChange={(e) =>
                  {

                    setFilterData({
                      ...filterData,
                      gender: e.target.value,
                    })

                    setClickFilterData({
                      ...clickFilterData,
                      gender:e.target.value,
                    })
                  }

                } />
                <label
                  htmlFor="all-gender"
                  className="text-black text-base font-light self-center whitespace-nowrap my-auto"
                >
                  전체
                </label>
              </div>
              <div className="self-stretch flex items-start justify-between gap-2">
                <input type="radio" id="female" name="성별" value="f"
                onChange={(e) =>{

                  setFilterData({
                    ...filterData,
                    gender: e.target.value,
                  })
                  setClickFilterData({
                    ...clickFilterData,
                    gender:e.target.value,
                  })
                }
                }
                />
                <label
                  htmlFor="female"
                  className="text-black text-base font-light self-center whitespace-nowrap my-auto"
                >
                  여성
                </label>
              </div>
              <div className="self-stretch flex items-start justify-between gap-2">
                <input type="radio" id="male" name="성별" value="m" 
                onChange={(e) => {

                  setFilterData({
                    ...filterData,
                    gender: e.target.value,
                  })
                  setClickFilterData({
                    ...clickFilterData,
                    gender:e.target.value,
                  })
                }
                
              }
                />
                <label
                  htmlFor="male"
                  className="text-black text-base font-light self-center whitespace-nowrap my-auto"
                >
                  남성
                </label>
              </div>
            </div>
            <div className="self-stretch flex w-full items-start justify-between gap-5 mt-6 max-md:max-w-full max-md:flex-wrap max-md:justify-center">
              <div className="text-black text-lg self-center my-auto">연령</div>
              <div className="self-stretch flex items-start justify-between gap-2">
                <input type="checkbox" id="all-age" name="연령" value=""
                onChange={handleAgeCheckboxChange}
                />
                <label
                  htmlFor="all-age"
                  className="text-black text-base font-light self-center whitespace-nowrap my-auto"
                >
                  전체
                </label>
              </div>
              <div className="self-stretch flex items-start justify-between gap-2">
                <input type="checkbox" id="teens" name="연령" value="10"
                onChange={handleAgeCheckboxChange} />
                <label
                  htmlFor="teens"
                  className="text-black text-base font-light self-center whitespace-nowrap my-auto"
                >
                  10대
                </label>
              </div>
              <div className="self-stretch flex items-start justify-between gap-2">
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
              <div className="self-stretch flex items-start justify-between gap-2">
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
              <div className="self-stretch flex items-start justify-between gap-2">
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
              <div className="self-stretch flex items-start justify-between gap-2">
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
              <div className="self-stretch flex items-start justify-between gap-2">
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
            </div>

            <div className="flex w-[864px] max-w-full items-start justify-between gap-5 mt-24 self-end max-md:flex-wrap max-md:mt-10">
              <div className="border bg-white flex flex-col flex-1 px-20 py-7 rounded-[30px] border-solid border-black max-md:px-5">
                <div className="self-center flex w-[84px] max-w-full items-start gap-1">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/7ee4812c-c045-44e9-aa52-0da59d97d0af?apiKey=d9a6bade01504f228813cd0dfee9b81b&"
                    className="aspect-[1.05] object-contain object-center w-[21px] overflow-hidden max-w-full self-start"
                  />
                  <div className="text-black text-base font-light whitespace-nowrap mt-1.5 self-start">
                    즐겨찾기
                  </div>
                </div>
              </div>
              <div
                className="border bg-white flex flex-col flex-1 px-20 py-6 rounded-[30px] border-solid border-black max-md:px-5"
                onClick={handleButtonClick}
                style={{ cursor: "pointer" }}
              >
                <div className="self-center flex w-[89px] max-w-full items-start gap-0">
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

      <div id="graph1">
        
      </div>

      <div id="graph2">
                
      </div>

      <div id="graph3">

      </div>

      <div id="graph4">

      </div>
      
    </div>
  );
}
