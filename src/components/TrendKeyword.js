import axios from 'axios';
import React, { useEffect, useState } from 'react'
import TreeMap from './charts/TreeMap';
import { useLocation } from 'react-router-dom';

export default function TrendKeyword() {

  const location = useLocation();
  // console.log(location)
  // keywordInstruction (키워드 소개하는 메인페이지) 에서 분야버튼을 클릭해 넘어온 경우 그 값 코드를 설정, 그게 아니라면 패션키워드로 default함
  const fieldValue = location.state ? location.state.fieldValue : '50000000';
  const [trend, setTrend] = useState({
    keywords: [],

  });
  const [field, setField] = useState(fieldValue)
  // console.log("필드value : ", fieldValue)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/test2/scrape/${field}`);
        // console.log('Response:', response.data);
        const arr = response.data
        const latestData = arr[arr.length - 1]

        setTrend(latestData.ranks)

        // console.log('트렌드값', trend)
        // Process the response data as needed
      } catch (error) {
        // console.error('Error:', error);
      }
    };

    fetchData(); // Call the async function
  }, [field]);


  return (
    <div className="flex flex-col items-center font-['NEXON']">
      <div className="text-black text-5xl max-w-[500px] self-center mx-auto max-md:text-4xl mt-20">
        실시간 검색어 순위
      </div>
      <div className="flex self-start gap-3 ml-5 mt-10 max-md:ml-2.5 max-md:mt-10">
        <div className="text-black text-xl right-0 leading-8 uppercase self-center my-auto">
          분야
        </div>

        <select
          defaultValue={fieldValue}
          name="category"
          onChange={(e) =>
            setField(e.target.value)
          }
          className="text-lg font-semibold leading-7 uppercase border w-[100px] h-[40px] md:w-[130px] md:h-[48px] px-3 py-1 rounded-3xl border-solid border-black"
        >
          <option value="50000000">패션</option>
          <option value="50000007">스포츠</option>
          <option value="50000003">가전제품</option>
          <option value="50005542">도서</option>
          <option value="50000006">식품</option>
        </select>
      </div>

      <div id='treemap'>
        <TreeMap
          trend={trend}
          field={field}
        />
      </div>
    </div>

  )
}
