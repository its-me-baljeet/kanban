import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editColumn, deleteColumn } from "../store/slices/columnSlice";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

const ColumnSettingsModal = ({ columnKey, currentColor, onClose }) => {
    const dispatch = useDispatch();
    const column = useSelector(state =>
        state.columnSlice.columns.find(col => col.id === columnKey)
    );

    const [newName, setNewName] = useState("");
    const [newColor, setNewColor] = useState(currentColor);
    const [showConfirm, setShowConfirm] = useState(false);

    useEffect(() => {
        if (column) {
            setNewName(column.name);
            setNewColor(column.color);
        }
    }, [column]);

    const handleSave = () => {
        if (!newName.trim()) return;
        dispatch(editColumn({ id: columnKey, newName: newName.trim(), newColor }));
        onClose();
    };

    const handleConfirmDelete = () => {
        dispatch(deleteColumn({ id: columnKey }));
        setShowConfirm(false);
        onClose();
    };

    if (!column) return null;

    return (
        <div
            className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex justify-center items-center"
            onClick={onClose}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="w-11/12 max-w-md bg-white dark:bg-gray-900 text-black dark:text-white 
                rounded-xl p-6 shadow-2xl transition-all duration-300 border border-gray-300 dark:border-gray-700"
            >
                <h2 className="text-xl font-bold mb-4">Edit Column</h2>

                <div className="mb-4">
                    <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
                        Column Name
                    </label>
                    <input
                        className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white border-gray-300 dark:border-gray-600"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        placeholder="Enter new column name"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
                        Column Color
                    </label>
                    <input
                        type="color"
                        value={newColor}
                        onChange={(e) => setNewColor(e.target.value)}
                        className="w-10 h-10 rounded-md border border-gray-300 dark:border-gray-600 bg-transparent"
                    />
                </div>

                <div className="flex justify-end gap-4">
                    <button
                        onClick={onClose}
                        className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 
                        text-black dark:text-white rounded-md px-4 py-2 transition-colors duration-200"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md transition-colors"
                    >
                        Save
                    </button>
                    <button
                        onClick={() => setShowConfirm(true)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors"
                    >
                        Delete
                    </button>
                </div>
            </div>

            {/* Confirm Delete Modal */}
            {showConfirm && (
                <ConfirmDeleteModal
                    title="Delete Column"
                    message="Are you sure you want to delete this column? All tasks under it will also be deleted."
                    onConfirm={handleConfirmDelete}
                    onCancel={() => setShowConfirm(false)}
                />
            )}
        </div>
    );
};

export default ColumnSettingsModal;
