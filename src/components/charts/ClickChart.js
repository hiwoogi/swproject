import React from "react";

export default function ClickChart({
  startDate,
  endDate,
  timeUnit,
  clickResults,
}) {
  
    console.log('클릭응답값:', clickResults);

  return (
    <div>
      {startDate}
      {endDate}
      {timeUnit}
    </div>
  );
}
