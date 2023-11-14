import axios from 'axios';
import React, { useEffect, useState } from 'react'
import TreeMap from './charts/TreeMap';

export default function Trend() {

    const [trend, setTrend] = useState({
        keywords: [],
        
      });

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('http://localhost:8080/test2/scrape/50000000');
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
      }, []);  
    

  return (
    <div id='treemap'>
        <TreeMap
            trend = {trend}
        />
    </div>
  )
}
