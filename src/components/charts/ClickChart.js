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
                borderColor: 'rgba(111, 50, 255, 1)',
                borderWidth: 4,
                //pointStyle: false, //포인트 없애려면 false
                pointRadius: 2, //포인트 크기 조절
                backgroundColor: 'rgba(111, 50, 255, 1)',
                lineTension: 0.3, //곡선 설정
              },
            ],
          },
          options: {
            scales: {
              y: {
                min: 0,  // Y축 최소값
                max: 120,  // Y축 최대값
                ticks: {
                  stepSize: 20, // y 축 간격 설정
                },
                display: false, //y 축 제거
              },
            },
            plugins: {
              legend: {
                display: false,
              },
              tooltip: {
                callbacks: {
                  label: (context) => `${context.formattedValue}%`, // 툴팁에 표시될 값 설정
                }
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