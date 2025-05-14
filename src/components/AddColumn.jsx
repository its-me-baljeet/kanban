import { useState } from "react";
import AddColumnModal from "../modal/AddColumnModal";

const AddColumn = () => {
    const [isOpen, setIsOpen] = useState(false);
    // console.log(isOpen)

    return (
        <div className="w-56 flex justify-center items-center h-[calc(100vh-200px)]  bg-gradient-to-b from-gray-400 via-gray-300 to-gray-100 mt-10 rounded-lg" onClick={() => {
            if (!isOpen) setIsOpen(true);
        }}>
            + New Column
            {
                isOpen && <AddColumnModal setIsOpen={setIsOpen} />
            }
        </div>
    )
}
export default AddColumn;