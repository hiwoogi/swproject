import axios from "axios";
import React, { useEffect } from "react";

export default function Fav() {
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
    console.log('useEffect triggered');
    fetchData();
  }, []); // The empty dependency array ensures that useEffect runs only once when the component mounts

  return (
    <div className="text-black text-5xl max-w-[500px] self-center mx-auto max-md:text-4xl mt-20 font-['NEXON']">
      로그인 성공!
      <br />
      아직 준비 중입니다.
    </div>
  );
}
