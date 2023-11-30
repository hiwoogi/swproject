import React, { useEffect, useState } from "react";
import SidebarItem from "./SidebarItem";

export default function Sidebar({ data, setResponseData }) {
  const itemsPerPage = 15; //페이지당 아이템 수
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = data.slice(startIndex, endIndex);

  const [currentData, setCurrentData] = useState(currentItems);
  //전체 데이터를 페이지별로 나누기

  const handleDelete = (deletedId) => {
    const updatedData = currentData.filter((item) => item.id !== deletedId);
    setCurrentData(updatedData);
  };
  //이전 페이지
  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      const startIndex = (currentPage - 2) * itemsPerPage; // Adjusted index for previous page
      const endIndex = startIndex + itemsPerPage;
      setCurrentData(data.slice(startIndex, endIndex));
    }
  };

  //다음 페이지
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
      const startIndex = currentPage * itemsPerPage; // Adjusted index for next page
      const endIndex = startIndex + itemsPerPage;
      setCurrentData(data.slice(startIndex, endIndex));
    }
  };

  useEffect(() => {
    console.log("리렌더링 : ");
    console.log(currentData);
  }, [currentData]);

  useEffect(() => {
    console.log(currentPage);
    console.log(currentData);
  }, [currentPage]);

  return (
    <aside
      id="default-sidebar"
      className="fixed top-90 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
      aria-label="Sidebar"
    >
      <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800 font-['NEXON']">
        {currentData.map((item, index) => (
          <SidebarItem
            key={index}
            data={item}
            setResponseData={setResponseData}
            num={(currentPage - 1) * itemsPerPage + index}
            setCurrentData={setCurrentData}
            onDelete={handleDelete}  
            currentData={currentData}
            currentPage={currentPage}
          />
        ))}

        <div className="flex justify-between mt-4">
          <button
            onClick={goToPrevPage}
            disabled={currentPage === 1}
            className="px-2 py-1 bg-gray-300 dark:bg-gray-700"
          >
            이전
          </button>
          <span>{`${currentPage} / ${totalPages}`}</span>
          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className="px-2 py-1 bg-gray-300 dark:bg-gray-700"
          >
            다음
          </button>
        </div>
      </div>
    </aside>
  );
}
