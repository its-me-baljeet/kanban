import { Draggable } from "@hello-pangea/dnd";
import { useState } from "react";
import { TbGridDots } from "react-icons/tb";
import TaskModal from "../modal/TaskModal";

const Task = ({ task, idx }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {isOpen && <TaskModal setIsOpen={setIsOpen} task={task} />}
            <Draggable draggableId={task.id} index={idx}>
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className={`
                            w-full bg-white cursor-pointer dark:bg-gray-700 py-4 px-3 rounded-lg shadow-lg 
                            text-lg font-semibold flex-shrink-0
                            text-black dark:text-white transition-all duration-200 flex gap-2 items-center
                            hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]
                            ${snapshot.isDragging ? 'rotate-3 shadow-2xl z-50' : ''}
                        `}
                        onClick={() => setIsOpen(true)}
                    >
                        <span
                            {...provided.dragHandleProps}
                            className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors flex-shrink-0"
                        >
                            <TbGridDots />
                        </span>
                        <p
                            title={task.title}
                            className="overflow-hidden whitespace-nowrap text-ellipsis flex-1 min-w-0"
                        >
                            {task.title}
                        </p>
                    </div>
                )}
            </Draggable>
        </>
    );
};

export default Task;