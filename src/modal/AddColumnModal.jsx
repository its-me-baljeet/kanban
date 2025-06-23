import { useState } from "react";
import { useDispatch } from "react-redux";
import { addColumn } from "../store/slices/columnSlice";

const AddColumnModal = ({ setIsOpen }) => {
    const dispatch = useDispatch();
    const [input, setInput] = useState("");
    const [color, setColor] = useState("#ffffff");

    function handleAdd() {
        if (!input.trim()) return;
        dispatch(addColumn({ name: input.toUpperCase(), color }));
        setIsOpen(false);
    }

    return (
        <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50"
            onClick={() => setIsOpen(false)}
        >
            <div
                className="w-11/12 max-w-md bg-white dark:bg-gray-900 text-black dark:text-white 
        rounded-xl p-6 shadow-2xl transition-all duration-300 border border-gray-300 dark:border-gray-700"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-xl font-bold mb-4">Add New Column</h2>

                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") handleAdd();
                    }}
                    className="w-full border border-gray-300 dark:border-gray-600 px-4 py-2 rounded-md 
          bg-white dark:bg-gray-800 text-black dark:text-white 
          focus:outline-none focus:ring-2 focus:ring-purple-600
          transition-all duration-300 mb-4"
                    placeholder="Enter Column Title..."
                />

                {/* Color Picker Styled */}
                <label className="flex items-center gap-3 mb-6">
                    <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">Column Color:</span>
                    <input
                        type="color"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        className="w-10 h-10 rounded-md border border-gray-300 dark:border-gray-600 cursor-pointer bg-transparent"
                    />
                </label>

                <div className="mt-6 flex justify-end gap-4">
                    <button
                        onClick={() => setIsOpen(false)}
                        className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 
            text-black dark:text-white rounded-md px-4 py-2 transition-colors duration-200"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleAdd}
                        className={`px-4 py-2 rounded-md text-white font-medium 
            ${input.trim()
                                ? "bg-purple-600 hover:bg-purple-700 dark:hover:bg-purple-500"
                                : "bg-purple-400 cursor-not-allowed"
                            } transition-colors duration-200`}
                        disabled={!input.trim()}
                    >
                        Add Column
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddColumnModal;
