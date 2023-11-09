import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

export default function GenderChart({ startDate, endDate, timeUnit, genderResults, width, height }) {
  const chartRef = useRef(null);

  console.log(startDate); // "2017-08-01"
  console.log(endDate); // "2017-09-30"
  console.log(timeUnit); // "month"

  const filterF = (data) => data.filter((item) => item.group === 'f');
  const filterM = (data) => data.filter((item) => item.group === 'm');

  const calculateRelativeRatio = (filteredData) => { //상대 비율 구하는 함수
    const sum = filteredData.reduce((total, item) => total + item.ratio, 0);
    const totalSum = genderResults[0].data.reduce((total, item) => total + item.ratio, 0);
    return (sum / totalSum) * 100;
  };

  useEffect(() => {
    if (genderResults.length > 0) {
      console.log(genderResults[0].title); // 결과 데이터
      console.log(genderResults[0].data[0]);

      genderResults[0].data.map((data, index) => {
        console.log(index);
        console.log('기간', data.period);
        console.log('비율', data.ratio);
        console.log('성별그룹', data.group);
      });

      const filteredFData = filterF(genderResults[0].data);
      const filteredMData = filterM(genderResults[0].data);

      const female = calculateRelativeRatio(filteredFData);
      const male = calculateRelativeRatio(filteredMData);

      console.log('female 상대적 비율:', female);
      console.log('male의 상대적 비율:', male);

      const ctx = document.getElementById('myChart');
      if (ctx) {
        if (chartRef.current) {
          chartRef.current.destroy();
        }
        chartRef.current = new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: ['Female', 'Male'],
            datasets: [
              {
                label: 'Gender',
                data: [female, male],
                backgroundColor: ['rgba(255, 99, 132)', 'rgba(54, 162, 235)'],
              },
            ],
          },
        });
      }
    }
  }, [genderResults]);

  return (
    <div style={ {width, height} } >
      {startDate}
      {endDate}
      {timeUnit}
      <canvas id="myChart" />
    </div>
  );
}