import React, { useState } from "react";
import SidebarItem from "./SidebarItem";

export default function Sidebar({ data,setResponseData }) {
  const itemsPerPage = 15; //페이지당 아이템 수
  const [currentPage, setCurrentPage] = useState(1);

  //전체 데이터를 페이지별로 나누기
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = data.slice(startIndex, endIndex);

  //이전 페이지
  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  //다음 페이지
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
    <aside
      id="default-sidebar"
      className="fixed top-90 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
      aria-label="Sidebar"
    >
      <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800 font-['NEXON']">

        {currentItems.map((item, index) => (
          <SidebarItem key={index} data={item} setResponseData = {setResponseData} num={(currentPage - 1) * itemsPerPage + index} />
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