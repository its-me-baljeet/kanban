import { useState } from "react";
import { useSelector } from "react-redux";
import AddTaskModal from "../modal/AddTaskModal";

const AddTaskButton = () => {
    const cols = useSelector(store => store.columnSlice.columns);
    const [isOpen, setIsOpen] = useState(false);

    function handleClick() {
        if (!cols.length) return;
        setIsOpen(true);
    }

    return (
        <>
            {isOpen && <AddTaskModal setIsOpen={setIsOpen} />}
            <button
                onClick={handleClick}
                disabled={!cols.length}
                className={`
                    bg-purple-600 text-white px-4 py-2 rounded-3xl font-semibold
                    transition-colors duration-300
                    ${!cols.length
                        ? "bg-purple-400 cursor-not-allowed"
                        : "hover:bg-purple-700 dark:hover:bg-purple-500"
                    }
                    focus:outline-none focus:ring-2 focus:ring-purple-500
                    dark:focus:ring-purple-300
                `}
            >
                + Add new Task
            </button>
        </>
    )
}

export default AddTaskButton;
