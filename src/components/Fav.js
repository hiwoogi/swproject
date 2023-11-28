import axios from "axios";
import React, { useEffect, useState } from "react";
import Sidebar from "./fav/Sidebar";

export default function Fav() {
  const [responseData, setResponseData] = useState();

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
      setResponseData(response.data);

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
  }, []); 

  useEffect(() => {
    console.log(responseData);
  }, [responseData]);

  return (
    <div>
      {responseData &&responseData.length!==0 ? (
        <div>
          <Sidebar data = {responseData}/>
          <div class="p-4 sm:ml-64">
            <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
              <p>Data is present</p>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="text-black text-5xl max-w-[1000px] self-center mx-auto max-md:text-4xl mt-20 font-['NEXON']"
>
            <p>즐겨찾기 데이터가 존재하지 않습니다.</p>
          </div>
        </div>
      )}
    </div>
  );
}
