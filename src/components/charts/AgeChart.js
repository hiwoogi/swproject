import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function AgeChart({num, ageResults }) {
  const chartRef = useRef(null);

  const filterData = (data, group) => data.filter(item => item.group === group);

  //상대 비율 구하는 함수
  const calculateRelativeRatio = (filteredData, totalSum) =>
    ((filteredData.reduce((total, item) => total + item.ratio, 0) / totalSum) * 100).toFixed(2);

  useEffect(() => {
    if (ageResults.length > 0) {
      const totalSum = ageResults[0].data.reduce((total, item) => total + item.ratio, 0);

      const ageGroups = ['10', '20', '30', '40', '50', '60'];
      const relativeRatios = ageGroups.map(group => {
        const filteredData = filterData(ageResults[0].data, group);
        return calculateRelativeRatio(filteredData, totalSum);
      });

      const colors = [
        'rgba(254, 67, 101, 1)',
        'rgba(252, 157, 154, 1)',
        'rgba(249, 205, 173, 1)',
        'rgba(200, 200, 169, 1)',
        'rgba(237, 229, 116, 1)',
        'rgba(249, 212, 35, 1)',
      ];

      const ctx = document.getElementById(`ageChart${num}`);
      if (ctx) {
        if (chartRef.current) {
          chartRef.current.destroy();
        }
        chartRef.current = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['10대', '20대', '30대', '40대', '50대', '60대'],
            datasets: [
              {
                data: relativeRatios,
                backgroundColor: colors,
              },
            ],
          },
          options: {
            //responsive: false,
            indexAxis: 'y', // 가로 그래프
            scales: {
              x: {
                 display: false,
              },
              y: {
                grid: {
                   display: false
                },
                ticks: {
                  font : {
                    size: 20,
                    family: 'NEXON'
                  }
                }
              }
           },
            plugins: {
              legend: {
                display: false,
              },
              title: {
                display: true,
                text: '연령별 클릭량 차트',
                font: {
                  size: 20,
                  family: 'NEXON'
                },
              },
              tooltip: {
                bodySpacing: 20,
                padding: 15,
                titleFont: {
                  size: 20,
                  family: 'NEXON'
                  
                },
                bodyFont: {
                  size: 20,
                  family: 'NEXON'
                },
                callbacks: {
                  label: (context) => `${context.formattedValue}%`,
                }
              }
            }
          },
        });
      }
    }
  }, [ageResults]);

  return (
    <div className="w-full h-full border-2 border-gray-300 p-4 rounded-lg flex justify-center items-center fo  ">
      <canvas id={`ageChart${num}`}  />
    </div>
  );
}
