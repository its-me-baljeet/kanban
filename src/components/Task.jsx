import { Draggable } from "@hello-pangea/dnd";
import { useState } from "react";
import { TbGridDots } from "react-icons/tb";
import TaskModal from "../modal/TaskModal";

const Task = ({ task, idx }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {
                isOpen && <TaskModal setIsOpen={setIsOpen} task={task} />
            }
            <Draggable draggableId={task.id} index={idx}>
                {
                    (provided, snapshot) => (

                        <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className="w-full bg-white cursor-pointer dark:bg-gray-700 py-4 px-3 rounded-lg shadow-lg text-lg font-semibold min-w-64 
                                       text-black dark:text-white transition-colors duration-500 flex gap-2 items-center"
                            onClick={() => setIsOpen(true)}
                        >
                            <span {...provided.dragHandleProps} className="cursor-grab">
                                <TbGridDots />
                            </span>
                            <p
                                title={task.title}
                                className="overflow-hidden whitespace-nowrap text-ellipsis flex-1"
                            >
                                {task.title}
                            </p>

                        </div>
                    )
                }
            </Draggable>
        </>
    )
}
export default Task;