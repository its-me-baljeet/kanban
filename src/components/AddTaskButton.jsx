import { useState } from "react";
import AddTaskModal from "../modal/AddTaskModal";

const AddTaskButton = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            {
                isOpen && <AddTaskModal setIsOpen={setIsOpen} />
            }
            <button className={`bg-purple-600 text-white px-3 py-2 rounded-3xl font-semibold`} onClick={() => setIsOpen(true)}>
                + Add new Task
            </button>
        </>
    )
}
export default AddTaskButton;