import axios from 'axios';

export async function makeChartData(filterData, clickFilterData, setResponseData,contents,registrationTime,favId) {
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
      const [genderResponse, ageResponse, deviceResponse, clickResponse] =
        await Promise.all([
          axios.post(baseUrl + "/test/gender", filterData, { headers }),
          axios.post(baseUrl + "/test/age", filterData, { headers }),
          axios.post(baseUrl + "/test/device", filterData, { headers }),
          axios.post(baseUrl + "/test/click", clickFilterData, { headers }),
        ]);

      
      const genderResults = genderResponse.data.results;
      const ageResults = ageResponse.data.results;
      const deviceResults = deviceResponse.data.results;
      const clickResults = clickResponse.data.results;

      setResponseData((prevData) => ({
        ...prevData,
        startDate: genderResponse.data.startDate,
        endDate: genderResponse.data.endDate,
        timeUnit: genderResponse.data.timeUnit,
        genderResults,
        ageResults,
        deviceResults,
        clickResults,
        contents,
        registrationTime,
        favId
      }));
     
    } catch (error) {
      console.log(error.response.status);
      if (error.response.status === 403) {
        window.location.href = "/#/login"; // redirect
      }
      // return Promise.reject(error);
    }
  }