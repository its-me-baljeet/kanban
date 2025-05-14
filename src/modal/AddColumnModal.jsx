import { useState } from "react";
import { useDispatch } from "react-redux";
import { addColumn } from "../store/slices/taskSlice";

const AddColumnModal = ({ setIsOpen }) => {
    const dispatch = useDispatch();
    const [input, setInput] = useState("");
    function handleAdd(e) {
        if (!input.trim()) return;
        dispatch(addColumn(input));
        setIsOpen(false);
    }
    return (
        <div className="fixed top-0 left-0 h-screen w-full flex justify-center items-center bg-black/20">
            <div className="w-96 h-96 bg-white">
                <input type="text" value={input} onChange={(e) => setInput(e.target.value)} className="border" placeholder="Enter Title..." />
                <button onClick={(e) => handleAdd(e)}>add</button>
            </div>
        </div>
    )
}
export default AddColumnModal;