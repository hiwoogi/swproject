import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

export default function GenderChart({ startDate, endDate, timeUnit, genderResults }) {
  const chartRefF = useRef(null);
  const chartRefM = useRef(null);

  // console.log(startDate); // "2017-08-01"
  // console.log(endDate); // "2017-09-30"
  // console.log(timeUnit); // "month"

  const filterF = (data) => data.filter((item) => item.group === 'f');
  const filterM = (data) => data.filter((item) => item.group === 'm');

  const calculateRelativeRatio = (filteredData) => { //상대 비율 구하는 함수
    const sum = filteredData.reduce((total, item) => total + item.ratio, 0);
    const totalSum = genderResults[0].data.reduce((total, item) => total + item.ratio, 0);
    return (sum / totalSum) * 100;
  };

  useEffect(() => {
    if (genderResults.length > 0) {
      // console.log(genderResults[0].title); // 결과 데이터
      // console.log(genderResults[0].data[0]);

      // genderResults[0].data.map((data, index) => {
      //   console.log(index);
      //   console.log('기간', data.period);
      //   console.log('비율', data.ratio);
      //   console.log('성별그룹', data.group);
      // });

      const filteredFData = filterF(genderResults[0].data);
      const filteredMData = filterM(genderResults[0].data);

      const female = calculateRelativeRatio(filteredFData);
      const male = calculateRelativeRatio(filteredMData);

      // console.log('female 상대적 비율:', female);
      // console.log('male 상대적 비율:', male);


      const ctxF = document.getElementById('femaleChart');
      if (ctxF) {
        if (chartRefF.current) {
          chartRefF.current.destroy();
        }
        chartRefF.current = new Chart(ctxF, {
          type: 'doughnut',
          data: {
            labels: ['여성'],
            datasets: [
              {
                label: '%',
                data: [female, 100 - female],
                backgroundColor: ['rgba(255, 99, 132, 0.5)', 'rgba(0, 0, 0, 0.2)'],
              },
            ],
          },
          options:{
            responsive: false,
            rotation: -90,
            circumference: 180,
            
          }
        });
      }

      const ctxM = document.getElementById('maleChart');
      if (ctxM) {
        if (chartRefM.current) {
          chartRefM.current.destroy();
        }
        chartRefM.current = new Chart(ctxM, {
          type: 'doughnut',
          data: {
            labels: ['남성'],
            datasets: [
              {
                label: '%',
                data: [male, 100 - male],
                backgroundColor: ['rgba(54, 162, 235, 0.5)', 'rgba(0, 0, 0, 0.2)'],
              },
            ],
          },
          options: {
            responsive: false,
            rotation: -90,
            circumference: 180,
            
          }
        });
      }


    }
  }, [genderResults]);

  return (
    <div className="w-full h-full border-2 border-gray-300 p-4 rounded-lg flex justify-center items-center overflow-hidden">
      {/* {startDate} ~ {endDate} <br />
      -{timeUnit} <br />
      GenderChart */}
      <canvas id="femaleChart" />
      <canvas id="maleChart" />
    </div>
  );
}