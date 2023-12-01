import React from "react";

const DeleteModal = ({ title, isOpen, onClose, onDelete }) => {
    const handleDeleteClick = async () => {
        try {
            await onDelete();
        } catch (error) {
            console.error("Error:", error);
        } finally {
            onClose();
        }
    };

    return (
        <>
            {isOpen && (
                <div className="absolute inset-0 flex items-center justify-center z-50">
                <div className="absolute inset-0 bg-opacity-75"></div>
                    <div className="relative bg-white p-8 rounded-lg shadow-md w-64">
                        <button
                            onClick={onClose}
                            className="absolute top-2 right-2 text-gray-400 hover:text-gray-900"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>

                        <p className="mb-4 text-gray-500 dark:text-gray-300 text-base">
                            {`'${title}'를 삭제하시겠습니까?`}
                        </p>

                        <div className="flex justify-center items-center space-x-4">
                            <button
                                onClick={handleDeleteClick}
                                className="py-2 px-3 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
                            >
                                Yes
                            </button>
                            <button
                                onClick={onClose}
                                className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                            >
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default DeleteModal;
