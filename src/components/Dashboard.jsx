import { useDispatch, useSelector } from "react-redux";
import AddColumn from "./AddColumn";
import Column from "./Column";
import { DragDropContext } from "@hello-pangea/dnd";
import { moveTask } from "../store/slices/taskSlice";

const DashBoard = () => {
    const cols = useSelector(store => store.columnSlice.columns);
    const dispatch = useDispatch();

    function handleDrop(result) {
        const { source, destination, draggableId } = result;

        if (!destination) return;
        dispatch(
            moveTask({
                id: draggableId,
                sourceCol: source.droppableId,
                destCol: destination.droppableId,
                sourceIdx: source.index,
                destIdx: destination.index
            }
            )
        )

    }

    return (
        <div className="flex p-10 gap-10 bg-gray-100 dark:bg-gray-800 min-h-[calc(100vh-80px)] transition-colors duration-500 ease-in-out">
            <DragDropContext onDragEnd={handleDrop}>

                {
                    cols.map((col) => (
                        <div key={col.id}>
                            <Column colKey={col.id} />
                        </div>
                    ))

                }
            </DragDropContext>
            <AddColumn />
        </div>
    )
}

export default DashBoard;
