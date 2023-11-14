import React, { useEffect, useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'; //Chart.js 및 필요한 모듈
import { color } from 'chart.js/helpers';
import { TreemapController, TreemapElement } from 'chartjs-chart-treemap';

//Chart.js에 필요한 모듈
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  TreemapController,
  TreemapElement
);

export default function TreeMap({ trend }) {
  const chartRef = useRef(null);

  console.log('컴포넌트에 값 전달 확인:', trend);

  useEffect(() => {
    if (trend.length > 0) {
      const data = trend.map((item, index) => ({
        name: item.keyword,
        capacityMW: 100 / item.rank, //capacityMW 값을 100/item.rank로 설정
        dataCoverage: 1,
        index: index, //색상 구별용 index
      }));

      //capacityMW의 최대값 계산
      const maxCapacity = Math.max(...data.map((item) => item.capacityMW));

      const ctx = document.getElementById('Treemap');

      if (ctx) {
        if (chartRef.current) {
          chartRef.current.destroy();
        }

        chartRef.current = new ChartJS(ctx, {
          type: 'treemap',
          data: {
            datasets: [
              {
                tree: data,
                key: 'capacityMW',
                labels: {
                  display: true,
                  formatter: (context) => context.raw._data.name,
                },
                //각 칸 배경색 동적으로 설정
                backgroundColor(context) {
                  if (context.type !== 'data') return 'transparent';

                  const { dataCoverage, capacityMW } = context.raw._data;
                  const alpha = capacityMW / maxCapacity * 0.5; //capacityMW에 따라 투명도 조절

                  return dataCoverage === 0
                    ? color('grey').alpha(alpha).rgbString()
                    : color('green').alpha(alpha * dataCoverage).rgbString();
                },
              },
            ],
          },
          options: {
            plugins: {
              title: {
                display: true,
                text: '실시간 검색어 Treemap',
              },
              legend: {
                display: false,
              },
              tooltip: {
                displayColors: false,
                callbacks: {
                  title(items) {
                    return items[0].raw._data.name;
                  },
                  label(item) {
                    const {
                      _data: { capacityMW, dataCoverage },
                    } = item.raw;
                    return [
                      `Export capacity: ${capacityMW} MW`,
                      `Data Coverage: ${dataCoverage * 100}%`,
                    ];
                  },
                },
              },
            },
          },
        });
      }
    }
  }, [trend]);

  return (
    <div>
      <canvas id="Treemap" />
    </div>
  );
}
