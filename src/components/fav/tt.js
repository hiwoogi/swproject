// SidebarItem.js
// ...

export default function SidebarItem({
    data,
    num,
    setResponseData,
    onDelete,
    setCurrentData,
    currentData,
  }) {
    // ...
    const handleDelete = (deletedId) => {
        const updatedData = currentData.filter((item) => item.id !== deletedId);
        setCurrentData(updatedData);
      };
    const handleDeleteClick = async () => {
      try {
        await deleteData(id);
        onDelete(id);  // 삭제를 처리하고 부모 컴포넌트에서 콜백 호출
      } catch (error) {
        console.error("에러:", error);
      }
    };
  
    // ...
  }
  
  // Sidebar.js
  // ...
  
  export default function Sidebar({ data, setResponseData }) {
    // ...
  
    // 삭제를 처리하고 currentData를 업데이트하는 콜백 함수
    const handleDelete = (deletedId) => {
      const updatedData = currentData.filter((item) => item.id !== deletedId);
      setCurrentData(updatedData);
    };
  
    return (
      <aside
        // ...
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800 font-['NEXON']">
          {currentData.map((item, index) => (
            <SidebarItem
              key={index}
              data={item}
              setResponseData={setResponseData}
              num={(currentPage - 1) * itemsPerPage + index}
              onDelete={handleDelete}  // 삭제를 처리할 콜백 함수 전달
              setCurrentData={setCurrentData}
              currentData={currentData}
              handleDelete= {handleDelete}
            />
          ))}
  
          <div className="flex justify-between mt-4">
            {/* ... */}
          </div>
        </div>
      </aside>
    );
  }