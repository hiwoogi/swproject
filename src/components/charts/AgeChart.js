import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function AgeChart({
  startDate,
  endDate,
  timeUnit,
  ageResults,
  width,
  height,
}) {
  const chartRef = useRef(null);

  console.log("시작 날짜 :",startDate); // "2017-08-01"
  console.log("종료 날짜 :",endDate); // "2017-09-30"
  console.log("시간 단위 : ", timeUnit); // "month"
  console.log("연령 결과:", ageResults);

  return (
    <div style={{ width, height }}>
      {startDate}
      {endDate}
      {timeUnit}
      <canvas id="myChart" />
    </div>
  );
}
