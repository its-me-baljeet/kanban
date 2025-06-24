// AddTaskButton.jsx (for mobile only)
import { useState } from "react";
import { useSelector } from "react-redux";
import { FiPlus } from "react-icons/fi";
import AddTaskModal from "../modal/AddTaskModal";

const AddTaskDashboardButton = () => {
    const cols = useSelector(store => store.columnSlice.columns);
    const [isOpen, setIsOpen] = useState(false);

    function handleClick() {
        if (!cols.length) return;
        setIsOpen(true);
    }

    return (
        <>
            {isOpen && <AddTaskModal setIsOpen={setIsOpen} />}

            {/* FAB - Mobile only */}
            <button
                onClick={handleClick}
                disabled={!cols.length}
                className={`
                    fixed bottom-6 left-1/2 -translate-x-1/2 z-10
                    bg-purple-600 text-white p-4 rounded-full shadow-lg
                    transition-all duration-300 ease-in-out
                    ${!cols.length
                        ? "bg-purple-400 cursor-not-allowed"
                        : "hover:bg-purple-700 dark:hover:bg-purple-500"
                    }
                    md:hidden
                `}
                aria-label="Add Task"
            >
                <FiPlus size={24} />
            </button>
        </>
    );
};

export default AddTaskDashboardButton;
