import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function DeviceChart({
  startDate,
  endDate,
  timeUnit,
  deviceResults,
}) {
  const chartRef = useRef(null);

  console.log("기기별 시작 날짜 :",startDate); // "2017-08-01"
  console.log("종료 날짜 :",endDate); // "2017-09-30"
  console.log("시간 단위 : ", timeUnit); // "month"
  console.log("기기 결과:", deviceResults);


  const filterMo = (data) => data.filter((item) => item.group === 'mo');
  const filterPc = (data) => data.filter((item) => item.group === 'pc');

  const calculateRelativeRatio = (filteredData) => { //상대 비율 구하는 함수
    const sum = filteredData.reduce((total, item) => total + item.ratio, 0);
    const totalSum = deviceResults[0].data.reduce((total, item) => total + item.ratio, 0);
    return (sum / totalSum) * 100;
  };

  useEffect(() => {
    if (deviceResults.length > 0) {
      console.log(deviceResults[0].title); // 결과 데이터
      //console.log(deviceResults[0].data[0]);

      deviceResults[0].data.map((data, index) => {
        console.log(index);
        console.log('기간', data.period);
        console.log('비율', data.ratio);
        console.log('기기그룹', data.group);
      });

      const filteredMoData = filterMo(deviceResults[0].data);
      const filteredPcData = filterPc(deviceResults[0].data);

      const mobail = calculateRelativeRatio(filteredMoData);
      const pc = calculateRelativeRatio(filteredPcData);

      console.log('mobail 상대적 비율:', mobail);
      console.log('pc 상대적 비율:', pc);

      const ctx = document.getElementById('deviceChart');
      if (ctx) {
        if (chartRef.current) {
          chartRef.current.destroy();
        }
        chartRef.current = new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: ['mobail', 'pc'],
            datasets: [
              {
                label: '%',
                data: [mobail, pc],
                backgroundColor: ['rgba(051, 206, 86, 0.6)', 'rgba(153, 102, 51, 0.6)'],
                borderColor: [ 'rgba(051, 206, 86, 1)', 'rgba(153, 102, 51, 1)'],
                borderWidth: 1,
              },
            ],
          },
        });
      }
    }
  }, [deviceResults]);

  
  return (
    <div className="w-120 h-80 border-2 border-gray-300 p-4 rounded-lg shadow-md flex justify-center items-center">
      {startDate} ~ {endDate} <br />
      -{timeUnit} <br />
      DeviceChart
      <canvas id="deviceChart" />
    </div>
  );
}
