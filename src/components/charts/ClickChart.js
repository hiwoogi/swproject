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
                borderColor: 'rgba(204, 0, 51, 0.8)',
                borderWidth: 2,
                pointStyle: 'rect',
                backgroundColor: 'rgba(204, 0, 51, 1)',
              },
            ],
          },
          options: {
            scales: {
              y: {
                min: 0,  // Y축 최소값
                max: 100,  // Y축 최대값
                ticks: {
                  stepSize: 20, // y 축 간격 설정
                }
              },
            },
            plugins: {
              legend: {
                display: false,
              }
            }
          },
        });

      }
    }
  }, [clickResults]);


  return (
    <div className="w-full h-full border-2 border-gray-300 p-4 rounded-lg flex justify-center items-center">
      {/* {startDate} ~ {endDate} <br />
      -{timeUnit} <br />
      ClickChart */}
      <canvas id="clickChart" />
    </div>
  );
}