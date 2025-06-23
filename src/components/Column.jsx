import { Droppable } from "@hello-pangea/dnd";
import { useSelector } from "react-redux";
import Task from "./Task";
import { useState } from "react";
import ColumnSettingsModal from "../modal/ColumnSettingsModal";
import { FaRegEdit } from "react-icons/fa";

const Column = ({ colKey }) => {
    const column = useSelector(store =>
        store.columnSlice.columns.find(col => col.id === colKey)
    );
    if (!column) return null;

    const allTasks = useSelector(store => store.taskSlice.tasks);
    const tasks = allTasks.filter(task => task.column === colKey);
    const [showSettings, setShowSettings] = useState(false);

    return (
        <div>
            {showSettings && (
                <ColumnSettingsModal
                    columnKey={column.id}
                    currentColor={column.color}
                    onClose={() => setShowSettings(false)}
                />
            )}
            <div className="w-full flex items-center justify-between mb-1">
                <div className="flex items-center gap-2"
                >
                    <span
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: column.color }}
                    ></span>

                    <h2 className="text-gray-500 dark:text-gray-400 font-semibold transition-colors duration-500 max-w-32 truncate flex-shrink overflow-ellipsis"
                        title={column.name}>
                        {column.name?.toUpperCase()}
                    </h2>

                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        ({tasks.length})
                    </p>
                </div>
                <FaRegEdit className="text-gray-900 dark:text-gray-100 cursor-pointer"
                    onClick={() => setShowSettings(true)} />
            </div>

            <Droppable droppableId={colKey}>
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`flex flex-col gap-5 pt-3 w-64 rounded-md transition-all duration-300 
                            min-h-[250px] ${snapshot.isDraggingOver ? "bg-gray-100 dark:bg-gray-800" : ""}`}
                    >
                        {tasks.length > 0 ? (
                            tasks.map((task, idx) => (
                                <Task task={task} key={task.id} idx={idx} />
                            ))
                        ) : (
                            <div className="flex-1 min-h-[calc(100vh-200px)] flex items-center justify-center border-2 border-dashed border-gray-400 dark:border-gray-600 rounded-md px-4 text-sm italic text-gray-400 dark:text-gray-500 text-center">
                                No tasks here. Drag or Add a task to get started.
                            </div>
                        )}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
};

export default Column;
