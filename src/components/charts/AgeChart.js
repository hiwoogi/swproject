import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function AgeChart({
  startDate,
  endDate,
  timeUnit,
  ageResults,
}) {
  const chartRef = useRef(null);

  // console.log("시작 날짜 :",startDate); // "2017-08-01"
  // console.log("종료 날짜 :",endDate); // "2017-09-30"
  // console.log("시간 단위 : ", timeUnit); // "month"
  // console.log("연령 결과:", ageResults);

  const filterA = (data) => data.filter((item) => item.group === '10');
  const filterB = (data) => data.filter((item) => item.group === '20');
  const filterC = (data) => data.filter((item) => item.group === '30');
  const filterD = (data) => data.filter((item) => item.group === '40');
  const filterE = (data) => data.filter((item) => item.group === '50');
  const filterF = (data) => data.filter((item) => item.group === '60');

  const calculateRelativeRatio = (filteredData) => { //상대 비율 구하는 함수
    const sum = filteredData.reduce((total, item) => total + item.ratio, 0);
    const totalSum = ageResults[0].data.reduce((total, item) => total + item.ratio, 0);
    return (sum / totalSum) * 100;
  };

  useEffect(() => {
    if (ageResults.length > 0) {
      // console.log(ageResults[0].title); // 결과 데이터
      // console.log(ageResults[0].data[0]);

      // ageResults[0].data.map((data, index) => {
      //   console.log(index);
      //   console.log('기간', data.period);
      //   console.log('비율', data.ratio);
      //   console.log('나이 그룹', data.group);
      // });

      const filteredAData = filterA(ageResults[0].data);
      const filteredBData = filterB(ageResults[0].data);
      const filteredCData = filterC(ageResults[0].data);
      const filteredDData = filterD(ageResults[0].data);
      const filteredEData = filterE(ageResults[0].data);
      const filteredFData = filterF(ageResults[0].data);

      const A = calculateRelativeRatio(filteredAData);
      const B = calculateRelativeRatio(filteredBData);
      const C = calculateRelativeRatio(filteredCData);
      const D = calculateRelativeRatio(filteredDData);
      const E = calculateRelativeRatio(filteredEData);
      const F = calculateRelativeRatio(filteredFData);

      // console.log('10대 상대적 비율:', A);
      // console.log('20대 상대적 비율:', B);
      // console.log('30대 상대적 비율:', C);
      // console.log('40대 상대적 비율:', D);
      // console.log('50대 상대적 비율:', E);
      // console.log('60대 상대적 비율:', F);

      const ctx = document.getElementById('ageChart');
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
                label: ' ',
                data: [A, B, C, D, E, F],
                backgroundColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)',
                ],
                // borderColor: [
                //   'rgba(255, 99, 132, 0.5)',
                //   'rgba(54, 162, 235, 0.5)',
                //   'rgba(255, 206, 86, 0.5)',
                //   'rgba(75, 192, 192, 0.5)',
                //   'rgba(153, 102, 255, 0.5)',
                //   'rgba(255, 159, 64, 0.5)',
                // ],
                // borderWidth: 1,
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
                }
              }
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
  }, [ageResults]);


  return (
    <div className="w-full h-full border-2 border-gray-300 p-4 rounded-lg shadow-md flex justify-center items-center">
      {/* {startDate} ~ {endDate} <br />
      -{timeUnit} <br />
      AgeChart */}
      <canvas id="ageChart" />
    </div>
  );
}
