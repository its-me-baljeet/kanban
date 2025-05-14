import { FiMoon } from "react-icons/fi";
import { LuSun } from "react-icons/lu";
import { HiDotsVertical } from "react-icons/hi";
import { useSelector } from "react-redux";
import AddTaskButton from "./AddTaskButton";

const Header = () => {
    const cols = useSelector(store => store.app.columns);
    const keyList = Object.keys(cols);
    // console.log(keyList)
    return (
        <div className="h-20 border border-b flex justify-between px-10 items-center">
            <div>
                <h1 className="text-3xl font-bold">kanban</h1>
            </div>
            <div className="flex gap-5 items-center">
                <div className="flex items-center">
                    <LuSun />
                    <FiMoon />
                </div>
                <AddTaskButton />
                <HiDotsVertical />
            </div>
        </div>
    )
}
export default Header;