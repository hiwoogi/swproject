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
import { useNavigate } from 'react-router-dom';

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

export default function TreeMap({ trend, field }) {
  
  const chartRef = useRef(null);
  const navigate = useNavigate(); //useNavigate 사용

  useEffect(() => {
    if (trend.length > 0) {
      const data = trend.map((item, index) => ({
        name: item.keyword,
        capacityMW: 100 / item.rank, //capacityMW 값을 100/item.rank로 설정
        dataCoverage: 1,
        index: index, //색상 구별용 index
      }));

      //@@colorsMap
      let colorMap = {
        50000000: 'skyblue', //패션
        50000007: 'green', //스포츠
        50000003: 'purple', //가전
        50005542: 'orange', //도서
        50000006: 'red', //식품
        50000002: 'yellow', //미용
        50000004: 'blue', //가구
        50000005: 'olive', //육아
        50000008: 'hotpink', //생활건강
        50000009: 'brown', //여가생활
      };
      let colors = colorMap[field];

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

                  //@@font 설정
                  font: function (context) {
                    const { capacityMW } = context.raw._data;
                    const name = context.raw._data.name;
                    let fontSize = 40;
                    //작은 칸에 맞춰서 크기 조절
                    if (capacityMW < 12)
                      fontSize = fontSize - name.length * 3;
                    else if (capacityMW <= 30)
                      fontSize = fontSize - name.length * 2;

                    return { size: fontSize, weight: 'bold' };
                  },
                },
                //각 칸 배경색 동적으로 설정
                backgroundColor(context) {
                  if (context.type !== 'data') return 'transparent';

                  const { dataCoverage, capacityMW } = context.raw._data;
                  const alpha = capacityMW / maxCapacity * 0.5; //capacityMW에 따라 투명도 조절

                  return dataCoverage === 0
                    ? color('grey').alpha(alpha).rgbString()
                    : color(colors).alpha(alpha * dataCoverage).rgbString();
                },
              },
            ],
          },
          options: {
            plugins: {
              title: {
                display: true,
              },
              legend: {
                display: false,
              },
              tooltip: {
                enabled: false,
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
            
            //@@각 값 클릭 이벤트
            onClick(event, elements, chart) {
              if (elements && elements[0]) {
                const datasetIndex = elements[0].datasetIndex;
                const index = elements[0].index;
                const data = chart.data.datasets[datasetIndex].tree[index];

                navigate('/keyword', { //useNavigate 사용하여 페이지 이동
                  state: {
                    trend: data.name, //trend 값
                    field: field, //field 값 전달
                  }
                });
              }
            },
          },
        });
      }
    }
  }, [trend]);

  return (
    <div className="w-[1600px] max-w-full border-2 border-gray-300 p-4 rounded-lg flex justify-center items-center mt-5">
      <canvas id="Treemap" />
    </div>
  );
}