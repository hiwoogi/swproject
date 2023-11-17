import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function DeviceChart({
  startDate,
  endDate,
  timeUnit,
  deviceResults,
}) {
  const chartRef = useRef(null);


  const filterMo = (data) => data.filter((item) => item.group === 'mo');
  const filterPc = (data) => data.filter((item) => item.group === 'pc');

  const calculateRelativeRatio = (filteredData) => { //상대 비율 구하는 함수
    const sum = filteredData.reduce((total, item) => total + item.ratio, 0);
    const totalSum = deviceResults[0].data.reduce((total, item) => total + item.ratio, 0);
    return (sum / totalSum) * 100;
  };

  useEffect(() => {
    if (deviceResults.length > 0) {
     

      const filteredMoData = filterMo(deviceResults[0].data);
      const filteredPcData = filterPc(deviceResults[0].data);

      const mobail = calculateRelativeRatio(filteredMoData);
      const pc = calculateRelativeRatio(filteredPcData);

     

      const ctx = document.getElementById('deviceChart');
      if (ctx) {
        if (chartRef.current) {
          chartRef.current.destroy();
        }
        chartRef.current = new Chart(ctx, {
          type: 'pie',
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
