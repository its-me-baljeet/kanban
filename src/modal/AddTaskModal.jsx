import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../store/slices/taskSlice";

const AddTaskModal = ({ setIsOpen }) => {
    const dispatch = useDispatch();
    const cols = useSelector(store => store.columnSlice.columns);
    const initialKey = cols.length > 0 ? cols[0].id : "";
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [column, setColumn] = useState(initialKey);

    function handleAdd() {
        if (title.trim().length < 1) return;
        dispatch(addTask({
            title,
            description,
            column
        }));
        setIsOpen(false);
    }

    return (
        <div
            className="fixed top-0 left-0 h-screen w-full flex justify-center items-center bg-black/40"
            onClick={() => setIsOpen(false)}
        >
            <div
                className="w-96 bg-white dark:bg-gray-800 rounded-md p-6 flex flex-col gap-5 shadow-lg"
                onClick={e => e.stopPropagation()}
            >
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter Title..."
                    className="border border-gray-300 dark:border-gray-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 bg-white dark:bg-gray-700 text-black dark:text-white transition-colors duration-300"
                />
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter Description..."
                    className="border border-gray-300 dark:border-gray-600 rounded-md px-4 py-2 h-40 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 bg-white dark:bg-gray-700 text-black dark:text-white transition-colors duration-300"
                />
                <select
                    value={column}
                    onChange={(e) => setColumn(e.target.value)}
                    className="border border-gray-300 dark:border-gray-600 rounded-md px-4 py-2 bg-white dark:bg-gray-700 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 transition-colors duration-300"
                >
                    {cols.map((col) => (
                        <option key={col.id} value={col.id}>
                            {col.name}
                        </option>
                    ))}
                </select>

                <div className="flex gap-4 justify-end">
                    <button
                        onClick={() => setIsOpen(false)}
                        className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 
                            text-black dark:text-white rounded-md px-4 py-2 transition-colors duration-200"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleAdd}
                        disabled={title.trim().length === 0}
                        className={`
                            px-4 py-2 rounded-md font-semibold text-white
                            transition-colors duration-300
                            ${title.trim().length === 0
                                ? "bg-purple-400 cursor-not-allowed"
                                : "bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600"
                            }
                            focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400
                        `}
                    >
                        Add Task
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddTaskModal;
