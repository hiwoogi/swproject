import React, { useState } from "react";
import { makeChartData } from "../../function/MakeChartData";
import axios from "axios";
import FavDeleteModal from "../../function/FavDeleteModal";

export default function SidebarItem({
  data,
  num,
  setResponseData,
  setCurrentData,
  currentData,
  onDelete,
  currentPage,
  
}) {
  const { id, filterCriteria, clickFilterCriteria, title, contents, registrationTime } = data;

  const [isModalOpen, setIsModalOpen] = useState(false);


  const handleClick = async () => {
    try {
      await makeChartData(filterCriteria, clickFilterCriteria, setResponseData, contents, registrationTime,id);

    } catch (error) {
      console.error("Error:", error);
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleDeleteClick = async () => {
    //모달이 열려있는 경우에 삭제 처리
    if (isModalOpen) {
      try {
        await deleteData(id);
        onDelete(id);

        //데이터 삭제 후 페이지를 전체 새로 고침(로딩창 나오게)
        window.location.reload()

      } catch (error) {
        console.error("Error:", error);
      } finally {
        toggleModal();
      }
    } else {
      toggleModal();
    }
  };

  const deleteData = async (id) => {
    let headers = {
      "Content-Type": "application/json",
    };
    try {
      const accessToken = localStorage.getItem("ACCESS_TOKEN");
      if (accessToken && accessToken !== null) {
        headers.Authorization = `Bearer ${accessToken}`;
      }
      const response = await axios.delete(
        `http://localhost:8080/favorites/${id}`,
        {
          headers,
        }
      );
      console.log(response);
    } catch (error) {
      console.error(error);

      if (error.response && error.response.status === 403) {
        window.location.href = "/#/login";
      } else {
        console.error("Error in API request:", error);
      }
    }
  };
  return (
    <li className="flex flex-col items-start p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group mb-5">
      <div className="flex items-center w-full justify-between">
        <button
          className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
          onClick={handleClick}
        >
          <svg
            className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 18 18"
          >
            <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
          </svg>

          <span className="flex-1 ms-3 whitespace-nowrap">{`${title && title.length > 10 ? title.substring(0, 10) + '...' : title}`}</span>
        
        </button>

        <button
          className=""
          onClick={() => handleDeleteClick()}
        >
          x
        </button>
      </div>

      <FavDeleteModal
        title={title}
        isOpen={isModalOpen}
        onClose={toggleModal}
        onDelete={handleDeleteClick}
      />
      <div className="flex mt-2">
        <p className="text-xs whitespace-nowrap">{`${contents && contents.length > 20 ? contents.substring(0, 20) + '...' : contents}`}</p>
      </div>
    </li>
  );
}
