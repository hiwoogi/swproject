import axios from "axios";
import React, { useEffect, useState } from "react";
import Sidebar from "./fav/Sidebar";
import GenderChart from "./charts/GenderChart";
import AgeChart from "./charts/AgeChart";
import DeviceChart from "./charts/DeviceChart";
import ClickChart from "./charts/ClickChart";
import { SyncLoader } from "react-spinners";
import { Link } from "react-router-dom";

export default function Fav() {
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
    registrationTime: null
  });

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

  useEffect(() => {
    console.log("useEffect triggered");
    fetchData();
  }, [isLoading]);

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);


  useEffect(() => {
    console.log(favResponse);
  }, [favResponse]);

  useEffect(() => {
    console.log(responseData);
  }, [responseData]);

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
              <Sidebar data={favResponse} setResponseData={setResponseData} setData={setFavResponse} />
              <div className="p-4 sm:ml-72 mt-24">
                <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
                  {responseData.genderResults ? (

                    <div className="self-center flex w-full max-w-[1800px] flex-col mt-5 mb-16 max-md:max-w-full max-md:my-10">

                      <div className="mb-5">
                        <span className="text-3xl font-semibold leading-7 uppercase border w-[100px] h-[40px] md:w-[130px] md:h-[48px] px-3 py-1 rounded-3xl border-solid border-gray-300">{responseData.genderResults[0].title}</span>
                        <div className="mt-2 w-full h-full p-4 rounded-lg flex flex-col">
                          <span className="text-xl">등록일시 : {responseData.registrationTime.substring(0, 19).replace('T', '  ')}</span>
                          <span className="text-lg mt-2">데이터 기간 : {responseData.startDate} ~ {responseData.endDate}</span>
                          <div className="mt-2">
                            {responseData.contents}
                          </div>
                        </div>
                      </div>

                      <div className="grid gap-5 lg:grid-cols-4">
                        <div className="col-span-3">
                          <ClickChart
                            startDate={responseData.startDate}
                            endDate={responseData.endDate}
                            timeUnit={responseData.timeUnit}
                            clickResults={responseData.clickResults}
                          />
                        </div>
                        <div className="">
                          <DeviceChart
                            startDate={responseData.startDate}
                            endDate={responseData.endDate}
                            timeUnit={responseData.timeUnit}
                            deviceResults={responseData.deviceResults}
                          />
                        </div>
                        <div className="col-span-2">
                          <AgeChart
                            startDate={responseData.startDate}
                            endDate={responseData.endDate}
                            timeUnit={responseData.timeUnit}
                            ageResults={responseData.ageResults}
                          />
                        </div>
                        <div className="col-span-2">
                          <GenderChart
                            startDate={responseData.startDate}
                            endDate={responseData.endDate}
                            timeUnit={responseData.timeUnit}
                            genderResults={responseData.genderResults}
                          />
                        </div>
                      </div>

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
                <p className="text-3xl mt-8">지금 키워드를 분석하고 즐겨찾기에 데이터를 추가해보세요!</p>
                <div className="flex flex-col items-center mt-10">
                  <div className="bg-neutral-200 leading-6 uppercase whitespace-nowrap w-[130px] max-w-full pl-6 pr-6 py-3.5 rounded-md max-md:px-5">
                    <Link to="/keyword" className="text-xl text-center font-light">바로 가기</Link>
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