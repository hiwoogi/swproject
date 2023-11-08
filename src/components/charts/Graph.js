import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

export default function Graph({ startDate, endDate, timeUnit, results }) {
  const chartRef = useRef(null);

  console.log(startDate); // "2017-08-01"
  console.log(endDate); // "2017-09-30"
  console.log(timeUnit); // "month"

  const filterF = (data) => data.filter((item) => item.group === 'f');
  const filterM = (data) => data.filter((item) => item.group === 'm');

  const calculateRelativeRatio = (filteredData) => {
    const fSum = filteredData.reduce((total, item) => total + item.ratio, 0);
    const totalSum = results[0].data.reduce((total, item) => total + item.ratio, 0);
    const relativeFRatio = (fSum / totalSum) * 100;
    return relativeFRatio;
  };

  useEffect(() => {
    if (results.length > 0) {
      console.log(results[0].title); // 결과 데이터
      console.log(results[0].data[0]);

      results[0].data.map((data, index) => {
        console.log(index);
        console.log('기간', data.period);
        console.log('비율', data.ratio);
        console.log('성별그룹', data.group);
      });

      const filteredFData = filterF(results[0].data);
      const filteredMData = filterM(results[0].data);

      const fRelativeRatio = calculateRelativeRatio(filteredFData);
      const mRelativeRatio = calculateRelativeRatio(filteredMData);

      console.log('f의 상대적 비율:', fRelativeRatio);
      console.log('m의 상대적 비율:', mRelativeRatio);

      const fSum = filteredFData.reduce((total, item) => total + item.ratio, 0);
      const mSum = filteredMData.reduce((total, item) => total + item.ratio, 0);

      console.log(fSum);
      console.log(mSum);

      const Sum = fSum + mSum;
      console.log(Sum);

      const female = (fSum / Sum) * 100;
      const male = (mSum / Sum) * 100;

      console.log(female);
      console.log(male);

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
  }, [results]);

  return (
    <div>
      {startDate}
      {endDate}
      {timeUnit}
      <canvas id="myChart" width="400" height="400" />
    </div>
  );
}