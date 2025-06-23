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
            })
        );
    }

    return (
        <div className="w-screen h-[calc(100vh-80px)] overflow-x-auto overflow-y-hidden bg-gray-100 dark:bg-gray-800 transition-colors duration-300 scrollbar-hide">
            <div className="flex h-full w-max gap-6 px-6 py-10 snap-x snap-mandatory">
                <DragDropContext onDragEnd={handleDrop}>
                    {cols.map((col) => (
                        <div key={col.id} className="snap-start shrink-0">
                            <Column colKey={col.id} />
                        </div>
                    ))}
                </DragDropContext>

                <div className="snap-start shrink-0">
                    <AddColumn />
                </div>
            </div>
        </div>
    );
};

export default DashBoard;
