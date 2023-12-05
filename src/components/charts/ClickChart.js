import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function ClickChart({ clickResults }) {
  const chartRef = useRef(null);

  useEffect(() => {
    if (clickResults && clickResults.length > 0) {
      const datasets = [];
      const labels = [];

      clickResults.forEach((result, index) => {
        if (result.data) {

          if (index === 0) { //labels=기간
            labels.push(...result.data.map(item => item.period));
          }

          const title = result.title || `Dataset ${index + 1}`; //키워드
          const data = result.data.map(item => item.ratio); //각 데이터 값

          const colors = [
            'rgba(48, 99, 142, 1)',
            'rgba(209, 73, 91, 1)',
            'rgba(237, 174, 73, 1)',
            'rgba(0, 121, 140, 1)',
            'rgba(0, 61, 91, 1)',
          ];
          const colorIndex = index % colors.length;

          datasets.push({
            label: title,
            data,
            borderColor: colors[colorIndex],
            backgroundColor: colors[colorIndex],
            borderWidth: 4,
            pointRadius: 2, //포인트 크기 조절
            lineTension: 0.3, //곡선 설정
          });
        }
      });


      const ctx = document.getElementById('clickChart');
      if (ctx) {
        if (chartRef.current) {
          chartRef.current.destroy();
        }
        chartRef.current = new Chart(ctx, {
          type: 'line',
          data: {
            labels,
            datasets,
          },
          options: {
            scales: {
              x: {
                ticks: {
                  font: {
                    size: 15,
                  }
                }
              },
              y: {
                min: 0,  // Y축 최소값
                max: 120,  // Y축 최대값
                ticks: {
                  stepSize: 20, // y축 간격 설정
                },
                display: false, //y 축 제거
              },
            },
            plugins: {
              legend: {
                labels: {
                  font: {
                    size: 20,
                  }
                }
              },
              tooltip: {
                bodySpacing: 20,
                padding: 15,
                titleFont: {
                  size: 18
                },
                bodyFont: {
                  size: 20
                },
                callbacks: {
                  label: (context) => `${context.formattedValue}%`,
                }
              },
            },
          },
        });
      }
    }
  }, [clickResults]);


  return (
    <div className="w-full h-full border-2 border-gray-300 p-4 rounded-lg flex justify-center items-center">
      <canvas id="clickChart" />
    </div>
  );
}