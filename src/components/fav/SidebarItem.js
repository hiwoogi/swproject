import React from "react";
import { makeChartData } from "../../function/MakeChartData";

export default function SidebarItem({ data, num  ,setResponseData}) {
  const { id, filterCriteria, clickFilterCriteria } = data;
  
  const handleClick = async () => {
    try {
      // Example filterData and clickFilterData, replace with your actual data
      
      // Call the makeChartData function
      await makeChartData(filterCriteria, clickFilterCriteria, setResponseData);
      
      // Additional logic after button click if needed
    } catch (error) {
      // Handle errors if needed
      console.error("Error:", error);
    }
  };


  return (
    <li className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group mb-5">
      <button
        className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
        onClick={handleClick}
      >
        <svg
        className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 18 18"
      >
        <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
      </svg>

      <span className="flex-1 ms-3 whitespace-nowrap">{`${num+1}번째 데이터`}</span>
      </button>
      
      

      {/* <h3 className="text-xl font-bold">{`Item ${id}`}</h3> */}
    </li>
  );
}
