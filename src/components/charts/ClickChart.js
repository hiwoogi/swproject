import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function ClickChart({
  startDate,
  endDate,
  timeUnit,
  clickResults,
}) {
  const chartRef = useRef(null);

  console.log('클릭응답값:', clickResults);
  console.log(clickResults[0].data);

  useEffect(() => {
    if (clickResults.length > 0) {

      const data = clickResults[0].data;

      const days = data.map(item => item.period);
      const ratios = data.map(item => item.ratio);

      const ctx = document.getElementById('clickChart');
      if (ctx) {
        if (chartRef.current) {
          chartRef.current.destroy();
        }
        chartRef.current = new Chart(ctx, {
          type: 'line',
          data: {
            labels: days,
            datasets: [
              {
                label: '%',
                data: ratios,
                borderColor: 'rgb(70, 215, 202)',
                borderWidth: 1,
                fill: false
              },
            ],
          },
        });
      }
    }
  }, [clickResults]);


  return (
    <div className="w-120 h-80 border-2 border-gray-300 p-4 rounded-lg shadow-md flex justify-center items-center">
      {startDate} ~ {endDate} <br />
      -{timeUnit} <br />
      ClickChart
      <canvas id="clickChart" />
    </div>
  );
}