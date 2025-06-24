import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import { deleteTask, editTask } from "../store/slices/taskSlice";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import { FaRegEdit } from "react-icons/fa";


const TaskModal = ({ setIsOpen, task }) => {
    const dispatch = useDispatch();
    const columns = useSelector((state) => state.columnSlice.columns);
    const fromCol = task.column;

    const [mode, setMode] = useState("view");
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description || "");
    const [column, setColumn] = useState(fromCol);
    const [showConfirm, setShowConfirm] = useState(false);

    const handleSave = () => {
        if (!title.trim()) return;
        dispatch(editTask({ id: task.id, title, description, fromCol, toCol: column }));
        setIsOpen(false);
    };

    const handleDelete = () => {
        setShowConfirm(true);
    };

    const confirmDelete = () => {
        dispatch(deleteTask({ id: task.id, column: task.column }));
        setIsOpen(false);
    };

    return (
        <AnimatePresence>
            <div
                className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex justify-center items-center px-4"
                onClick={() => setIsOpen(false)}
            >
                <motion.div
                    key="modal"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    onClick={(e) => e.stopPropagation()}
                    className="w-full max-w-lg bg-gray-100 dark:bg-gray-800 text-black dark:text-white p-6 rounded-xl shadow-2xl flex flex-col gap-4 max-h-[90vh] overflow-y-auto"
                >
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-semibold">
                            {mode === "view" ? "Task Details" : "Edit Task"}
                        </h2>
                        <button
                            className="text-gray-900 dark:text-gray-100 cursor-pointer hover:text-gray-600 dark:hover:text-gray-300 transition-colors flex-shrink-0"
                            onClick={() => setMode(mode === "view" ? "edit" : "view")}
                        >
                            {mode === "view" ? <FaRegEdit size={"20px"} /> : "Cancel"}
                        </button>
                    </div>
                    <hr className="border-gray-300 dark:border-gray-600 my-2" />

                    {mode === "view" ? (
                        <>
                            <div className="mb-3">
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Title</p>
                                <p className="text-base font-medium">{task.title}</p>
                            </div>
                            <div className="mb-3">
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Description</p>
                                <p className="text-sm whitespace-pre-wrap">
                                    {task.description || "No description provided."}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Category</p>
                                <p className="text-sm">
                                    {columns.find(col => col.id === fromCol)?.name || "Unknown"}
                                </p>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm text-gray-600 dark:text-gray-300">Title</label>
                                <input
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="p-2 rounded-md border dark:border-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    placeholder="Enter title"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm text-gray-600 dark:text-gray-300">Description</label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    rows="4"
                                    className="p-2 rounded-md border dark:border-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    placeholder="Enter description"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm text-gray-600 dark:text-gray-300">Category</label>
                                <select
                                    value={column}
                                    onChange={(e) => setColumn(e.target.value)}
                                    className="p-2 rounded-md border dark:border-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                >
                                    {columns.map((col) => (
                                        <option key={col.id} value={col.id}>
                                            {col.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </>
                    )}

                    <div className="flex justify-end gap-3 mt-6">
                        <button
                            onClick={() => setIsOpen(false)}
                            className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 
                        text-black dark:text-white rounded-md px-4 py-2 transition-colors duration-200"
                        >
                            Close
                        </button>
                        {mode === "edit" ? (
                            <button
                                onClick={handleSave}
                                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors"
                            >
                                Save
                            </button>
                        ) : (
                            <button
                                onClick={handleDelete}
                                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors"
                            >
                                Delete
                            </button>
                        )}
                    </div>
                </motion.div>

                {showConfirm && (
                    <ConfirmDeleteModal
                        onCancel={() => setShowConfirm(false)}
                        onConfirm={confirmDelete}
                    />
                )}
            </div>
        </AnimatePresence>
    );
};

export default TaskModal;
