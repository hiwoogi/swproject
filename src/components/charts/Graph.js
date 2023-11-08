import React from 'react'

export default function Graph({startDate,endDate,timeUnit,results}) {
  
  console.log(startDate); // "2017-08-01"
  console.log(endDate); // "2017-09-30"
  console.log(timeUnit); // "month"
  
  
  if (results.length > 0) {
    console.log(results[0].title); // 결과 데이터
    console.log(results[0].data[0])

    // console.log(results[0].data[1])

    results[0].data.map((data, index) => {
      console.log(index)
      console.log("기간",data.period)
      console.log("비율", data.ratio)
      console.log("성별그룹",data.group)


    })

    // const teens = results[0].data.filter((data, index) => {
    //   return data.group === "10";
    // })
    // console.log(teens)
  }
  
  
  

  return (
    <div>
      {startDate}
      {endDate}
      {timeUnit}
    </div>

  )
}
