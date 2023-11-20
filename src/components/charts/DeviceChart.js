import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function DeviceChart({
  startDate,
  endDate,
  timeUnit,
  deviceResults,
}) {
  const chartRef = useRef(null);

const filterPc = (data) => data.filter((item) => item.group === 'pc');
  const filterMo = (data) => data.filter((item) => item.group === 'mo');
  

  const calculateRelativeRatio = (filteredData) => { //상대 비율 구하는 함수
    const sum = filteredData.reduce((total, item) => total + item.ratio, 0);
    const totalSum = deviceResults[0].data.reduce((total, item) => total + item.ratio, 0);
    return (sum / totalSum) * 100;
  };

  useEffect(() => {
    if (deviceResults.length > 0) {
     
const filteredPcData = filterPc(deviceResults[0].data);
      const filteredMoData = filterMo(deviceResults[0].data);
      
 const pc = calculateRelativeRatio(filteredPcData);
      const mobail = calculateRelativeRatio(filteredMoData);
     

      const ctx = document.getElementById('deviceChart');
      if (ctx) {
        if (chartRef.current) {
          chartRef.current.destroy();
        }
        chartRef.current = new Chart(ctx, {
          type: 'pie',
          data: {
            labels: ['PC', '모바일'],
            datasets: [
              {
                label: '%',
                data: [pc, mobail],
                backgroundColor: ['rgba(153, 102, 51, 0.8)', 'rgba(51, 206, 86, 0.8)'],
                // borderColor: [ 'rgba(153, 102, 51, 0.6)', 'rgba(51, 206, 86, 0.6)'],
                // borderWidth: 1,
              },
            ],
          },
          options: {
            //responsive: false,
          }
        });
      }
    }
  }, [deviceResults]);

  
  return (
    <div className="w-full h-full border-2 border-gray-300 p-4 rounded-lg flex justify-center items-center">
      {/* {startDate} ~ {endDate} <br />
      -{timeUnit} <br />
      DeviceChart */}
      <canvas id="deviceChart" />
    </div>
  );
}
