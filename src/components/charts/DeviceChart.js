import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function DeviceChart({
  startDate,
  endDate,
  timeUnit,
  deviceResults,
}) {
  const chartRef = useRef(null);

  console.log("기기별 시작 날짜 :",startDate); // "2017-08-01"
  console.log("종료 날짜 :",endDate); // "2017-09-30"
  console.log("시간 단위 : ", timeUnit); // "month"
  console.log("기기 결과:", deviceResults);

  
  return (
    <div className="w-120 h-80 border-2 border-gray-300 p-4 rounded-lg shadow-md flex justify-center items-center">
      
    </div>
  );
}
