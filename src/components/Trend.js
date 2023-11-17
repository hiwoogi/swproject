import axios from 'axios';
import React, { useEffect, useState } from 'react'
import TreeMap from './charts/TreeMap';
import { useLocation } from 'react-router-dom';
import Header from './main/Header';

export default function Trend() {

  const location = useLocation();
  console.log(location)
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
            //서버로 스크래핑 요청보내고 응답데이터를 받아옴 (응답데이터는  1~10위 검색어 데이터가 10개의 배열로 들어가있음)
            const response = await axios.get(`http://localhost:8080/test2/scrape/${field}`);
            console.log('Response:', response.data);
            const arr = response.data
            const latestData = arr[arr.length-1] // 가장 최근일자로 데이터를 가져옴
            
            //가장 최근 트렌드를 가져옴
            setTrend(latestData.ranks)

            console.log('트렌드값' , trend)
            // Process the response data as needed
          } catch (error) {
            console.error('Error:', error);
          }
        };
    
        fetchData(); // Call the async function
      }, [field]);  
    

  return (
    
    <div>
      <Header/>
        <div className="flex w-[356px] max-w-full items-start justify-between gap-5 ml-5 mt-20 self-start max-md:ml-2.5 max-md:mt-10">
            <div className="text-black text-xl leading-8 uppercase self-center my-auto">
              분야
            </div>

            <select
              defaultValue={fieldValue}
              name="category"
              onChange={(e) =>
                setField(e.target.value)
              }
              className="text-black text-base font-light leading-6 uppercase self-stretch border w-[269px] max-w-full grow shrink basis-auto items-start justify-between gap-5 pl-32 py-7 rounded-3xl border-solid border-black max-md:pl-5"
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
            trend = {trend}
            field = {field}
        />
    </div>
    </div>
    

   
  )
}
