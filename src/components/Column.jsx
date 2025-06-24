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
        <div className="flex flex-col h-full">
            {showSettings && (
                <ColumnSettingsModal
                    columnKey={column.id}
                    currentColor={column.color}
                    onClose={() => setShowSettings(false)}
                />
            )}

            {/* Fixed Header */}
            <div className="w-full flex items-center justify-between mb-3 px-1 flex-shrink-0">
                <div className="flex items-center gap-2">
                    <span
                        className="w-4 h-4 rounded-full flex-shrink-0"
                        style={{ backgroundColor: column.color }}
                    ></span>

                    <h2 className="text-gray-500 dark:text-gray-400 font-semibold transition-colors duration-500 max-w-32 truncate overflow-ellipsis"
                        title={column.name}>
                        {column.name?.toUpperCase()}
                    </h2>

                    <p className="text-sm text-gray-500 dark:text-gray-400 flex-shrink-0">
                        ({tasks.length})
                    </p>
                </div>
                <FaRegEdit
                    className="text-gray-900 dark:text-gray-100 cursor-pointer hover:text-gray-600 dark:hover:text-gray-300 transition-colors flex-shrink-0"
                    onClick={() => setShowSettings(true)}
                />
            </div>

            {/* Scrollable Content Area */}
            <div className="flex-1 min-h-0">
                <Droppable droppableId={colKey}>
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className={`
                                flex flex-col gap-3 w-64 rounded-md transition-all duration-300
                                h-full overflow-y-auto overflow-x-hidden
                                scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 
                                scrollbar-track-transparent hover:scrollbar-thumb-gray-400 dark:hover:scrollbar-thumb-gray-500
                                ${snapshot.isDraggingOver ? "bg-gray-100 dark:bg-gray-800" : ""}
                                ${tasks.length === 0 ? "min-h-[250px]" : ""}
                            `}
                            style={{
                                // Custom scrollbar for better cross-browser support
                                scrollbarWidth: 'thin',
                                scrollbarColor: snapshot.isDraggingOver
                                    ? '#9CA3AF #F3F4F6'
                                    : '#D1D5DB transparent'
                            }}
                        >
                            {tasks.length > 0 ? (
                                <>
                                    {tasks.map((task, idx) => (
                                        <Task task={task} key={task.id} idx={idx} />
                                    ))}
                                    {/* Invisible placeholder for smooth scrolling */}
                                    <div className="h-2 flex-shrink-0" />
                                </>
                            ) : (
                                <div className="flex-1 flex items-center justify-center border-2 border-dashed border-gray-400 dark:border-gray-600 rounded-md px-4 text-sm italic text-gray-400 dark:text-gray-500 text-center min-h-[200px]">
                                    No tasks here. Drag or Add a task to get started.
                                </div>
                            )}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </div>
        </div>
    );
};

export default Column;