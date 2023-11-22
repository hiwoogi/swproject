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

export default function TreeMap({ trend , field}) {
  const chartRef = useRef(null);

  // console.log('컴포넌트에 값 전달 확인:', trend);
  // console.log('필드값', field)

  useEffect(() => {
    if (trend.length > 0) {
      const data = trend.map((item, index) => ({
        name: item.keyword,
        capacityMW: 100 / item.rank, //capacityMW 값을 100/item.rank로 설정
        dataCoverage: 1,
        index: index, //색상 구별용 index

        //@@keyword값으로 우선 사용했는데 linkId를 사용하고 싶으면 바꿔도 가능
        link: `#/keyword?trend=${encodeURIComponent(item.keyword)}&field=${encodeURIComponent(field)}`, //링크 정보 추가
      }));

      //@@colorsMap
      let colorMap = {
        50000000: 'skyblue',
        50000007: 'green',
        50000003: 'purple',
        50000006: 'red',
        50005542: 'orange'
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
                  font: function(context) {
                    const { capacityMW } = context.raw._data;
                    const name = context.raw._data.name;
                    let fontSize = 40;
                    //작은 칸에 맞춰서 크기 조절
                    if(capacityMW < 12)
                      fontSize = fontSize - name.length*3.5; 
                    else if(capacityMW <= 30)
                      fontSize = fontSize - name.length*2;

                    return { size: fontSize, weight: 'bold' };
                  },

                  //font: {size: 30, weight: 'bold'},
                  //color: 'grey',
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
                //클릭한 데이터셋 및 인덱스로부터 데이터 추출
                const data = chart.data.datasets[datasetIndex].tree[index];
                //데이터에서 link 속성 추출
                const link = data.link;
                //해당 링크로 이동
                window.location.href = link;
              }
            },
          },
        });
      }
    }
  }, [trend]);

  return (
    <div className="w-[1600px] max-w-full border-2 border-gray-300 p-4 rounded-lg flex justify-center items-center mt-10">
      <canvas id="Treemap" />
    </div>
  );
}
