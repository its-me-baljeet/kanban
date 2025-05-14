import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import store from "../store/store";
import { addTask } from "../store/slices/taskSlice";

const AddTaskModal = ({ setIsOpen }) => {
    const dispatch = useDispatch();
    const cols = useSelector(store => store.app.columns);
    const keys = Object.keys(cols)
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const intialKey = keys.length > 0 ? keys[0] : "";
    const [column, setColumn] = useState(intialKey);
    function handleAdd(e) {
        dispatch(addTask({
            title,
            description,
            column
        }))
        setIsOpen(false);
    }
    return (
        <div className="fixed top-0 left-0 h-screen w-full flex justify-center items-center bg-black/20">
            <div className="w-96 h-96 bg-white">
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="border" placeholder="Enter Title..." />
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter Description..."></textarea>
                <select value={column} onChange={(e) => setColumn(e.target.value)}>
                    {
                        keys.map((key) => {
                            return <option key={key} value={key}>{key}</option>
                        })
                    }
                </select>
                <button onClick={(e) => handleAdd(e)}>add</button>
            </div>
        </div>
    )
}
export default AddTaskModal;