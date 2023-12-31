import React, { useEffect, useState } from "react";
import SidebarItem from "./SidebarItem";

export default function Sidebar({ data, setResponseData, setData, isSidebarOpen,toggleSidebar }) {
  const itemsPerPage = 8; //페이지당 아이템 수
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = data.slice(startIndex, endIndex);
  const [currentData, setCurrentData] = useState(currentItems);
  //전체 데이터를 페이지별로 나누기


  const handleDelete = (deletedId) => {
    const updatedData = currentData.filter((item) => item.id !== deletedId);
    const updatedAllData = data.filter((item) => item.id !== deletedId);
    setCurrentData(updatedData);
    setData(updatedAllData);
    setCurrentData(updatedAllData.slice(startIndex, endIndex));
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
    setCurrentData(data.slice(startIndex, endIndex));
  }, [data]);

  useEffect(() => {

  }, [currentData]);

  useEffect(() => {

  }, [currentPage]);

  useEffect(() => {

  }, [isSidebarOpen]);

  return (
    <>
    
      {isSidebarOpen && (
        <aside
          id="default-sidebar"
          className="fixed top-32 left-0 z-40 h-screen transition-transform sm:translate-x-0 
          sm:w-16 md:w-16 lg:w-36 xl:w-72"
          aria-label="Sidebar"
        >
          <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800 font-['NEXON'] rounded-r-md ">
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
      )}

      
    </>
  );
}
