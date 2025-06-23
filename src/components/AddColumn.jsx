import { useState } from "react";
import AddColumnModal from "../modal/AddColumnModal";

const AddColumn = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div
            className="
                w-64 flex justify-center items-center max-h-[calc(100vh-200px)] 
                bg-gradient-to-b from-gray-300 via-gray-200 to-gray-100 
                dark:from-gray-700 dark:via-gray-750 dark:to-gray-800 
                mt-10 rounded-lg cursor-pointer 
                text-black dark:text-white 
                transition-colors duration-500

                hover:from-gray-400 hover:via-gray-300 hover:to-gray-200
                dark:hover:from-gray-600 dark:hover:via-gray-700 dark:hover:to-gray-800

                shadow-lg
            "
            onClick={() => {
                if (!isOpen) setIsOpen(true);
            }}
        >
            + New Column
            {isOpen && <AddColumnModal setIsOpen={setIsOpen} />}
        </div>
    )
}

export default AddColumn;
