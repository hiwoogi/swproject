import axios from 'axios';
import React, { useEffect, useState } from 'react'
import TreeMap from './charts/TreeMap';
import { useLocation } from 'react-router-dom';
import Header from './main/Header';

export default function Trend() {

  const location = useLocation();
  console.log(location)
  // Access the prop from the state object in location
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
            console.log('Response:', response.data);
            const arr = response.data
            const latestData = arr[arr.length-1]
            
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
