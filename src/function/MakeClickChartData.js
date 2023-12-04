import axios from 'axios';

export async function makeClickChartData(filterData, clickFilterData, setResponseData,contents,registrationTime) {
    const baseUrl = "http://localhost:8080";
    let headers = {
      Authorization: "Bearer your_access_token", 
      "Content-Type": "application/json",
    };
    try {
      const accessToken = localStorage.getItem("ACCESS_TOKEN");

      if (accessToken && accessToken !== null) {
        headers.Authorization = `Bearer ${accessToken}`;
      }
      const [clickResponse] =
        await Promise.all([

          axios.post(baseUrl + "/test/click", clickFilterData, { headers }),
        ]);


      const clickResults = clickResponse.data.results;

      setResponseData((prevData) => ({
        ...prevData,
        startDate: clickResponse.data.startDate,
        endDate: clickResponse.data.endDate,
        timeUnit: clickResponse.data.timeUnit,
        clickResults,
        contents,
        registrationTime
      }));
     
    } catch (error) {
      console.log(error.response.status);
      if (error.response.status === 403) {
        window.location.href = "/#/login"; // redirect
      }
      // return Promise.reject(error);
    }
  }