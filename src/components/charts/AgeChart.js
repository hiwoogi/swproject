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

  console.log(startDate); // "2017-08-01"
  console.log(endDate); // "2017-09-30"
  console.log(timeUnit); // "month"
  console.log(ageResults);

  return (
    <div style={{ width, height }}>
      {startDate}
      {endDate}
      {timeUnit}
      <canvas id="myChart" />
    </div>
  );
}
