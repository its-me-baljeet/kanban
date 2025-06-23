import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editColumn, deleteColumn } from "../store/slices/columnSlice";

const ColumnSettingsModal = ({ columnKey, currentColor, onClose }) => {
    const dispatch = useDispatch();

    // Get the full column object using its ID
    const column = useSelector(state =>
        state.columnSlice.columns.find(col => col.id === columnKey)
    );

    const [newName, setNewName] = useState("");
    const [newColor, setNewColor] = useState(currentColor);
    const [confirmDelete, setConfirmDelete] = useState(false);

    // Prefill the column name when the modal opens
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

    const handleDelete = () => {
        if (!confirmDelete) {
            setConfirmDelete(true);
            return;
        }
        dispatch(deleteColumn({ id: columnKey }));
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
                className="w-full max-w-sm bg-white dark:bg-gray-800 text-black dark:text-white p-6 rounded-xl shadow-lg space-y-5"
            >
                <h2 className="text-xl font-bold">Edit Column</h2>

                <div className="space-y-2">
                    <label className="block text-sm">Column Name</label>
                    <input
                        className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        placeholder="Enter new column name"
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-sm">Color</label>
                    <input
                        type="color"
                        value={newColor}
                        onChange={(e) => setNewColor(e.target.value)}
                        className="w-full h-10 p-1 rounded-md border dark:border-gray-600"
                    />
                </div>

                <div className="flex justify-between mt-6">
                    <button
                        onClick={handleSave}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md"
                    >
                        Save
                    </button>
                    <button
                        onClick={handleDelete}
                        className={`${confirmDelete ? "bg-red-700" : "bg-red-500"} hover:bg-red-600 text-white px-4 py-2 rounded-md`}
                    >
                        {confirmDelete ? "Click again to confirm" : "Delete"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ColumnSettingsModal;
