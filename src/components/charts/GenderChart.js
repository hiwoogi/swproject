import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

export default function GenderChart({ num, genderResults }) {
  const chartRef = useRef(null);

  const filterF = (data) => data.filter((item) => item.group === 'f');
  const filterM = (data) => data.filter((item) => item.group === 'm');

  const calculateRelativeRatio = (filteredData) => { //상대 비율 구하는 함수
    const sum = filteredData.reduce((total, item) => total + item.ratio, 0);
    const totalSum = genderResults[0].data.reduce((total, item) => total + item.ratio, 0);
    return (sum / totalSum) * 100;
  };

  useEffect(() => {
    if (genderResults.length > 0) {
      const filteredFData = filterF(genderResults[0].data);
      const filteredMData = filterM(genderResults[0].data);

      const female = calculateRelativeRatio(filteredFData);
      const male = calculateRelativeRatio(filteredMData);

      // console.log('female 상대적 비율:', female);
      // console.log('male 상대적 비율:', male);

      const ctx = document.getElementById(`genderChart${num}`);
      if (ctx) {
        if (chartRef.current) {
          chartRef.current.destroy();
        }
        chartRef.current = new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: ['여성', '남성'],
            datasets: [
              {
                data: [female, male],
                backgroundColor: ['rgba(255, 116, 115, 0.5)', 'rgba(71, 184, 224, 0.5)'],
              },
            ],
          },
          options:{
            //responsive: false,
            maintainAspectRatio: false,
            rotation: -90,
            circumference: 180,
            plugins: {
              legend: {
                labels: {
                  font: {
                    size: 20,
                    family: 'NEXON'
                  }
                }
              },
              title: {
                display: true,
                text: '성별 클릭량 차트',
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
                  label: (context) => `${context.formattedValue}%`, // 툴팁에 표시될 값 설정
                }
              }
            }
          }
        });
      }
    }
  }, [genderResults]);

  return (
    <div className="w-full h-full border-2 border-gray-300 p-4 rounded-lg flex justify-center items-center overflow-hidden">
      <canvas id={`genderChart${num}`} />
    </div>
  );
}