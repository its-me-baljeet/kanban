import { BsFillMoonStarsFill } from "react-icons/bs";
import { HiDotsVertical } from "react-icons/hi";
import { MdSunny } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import AddTaskButton from "./AddTaskButton";
import { toggleTheme } from "../store/slices/columnSlice";
import { FaToggleOn, FaToggleOff } from "react-icons/fa6";

const Header = () => {
    const cols = useSelector(store => store.columnSlice.columns);
    const isDark = useSelector(store => store.columnSlice.isDark);
    const dispatch = useDispatch();

    function handleClick() {
        dispatch(toggleTheme());
    }

    return (
        <div className="h-20 border border-b flex justify-between px-10 items-center bg-white text-black dark:bg-gray-900 dark:text-white dark: border-none transition-colors duration-500 ease-in-out">
            <div>
                <h1 className="text-3xl font-bold">kanban</h1>
            </div>
            <div className="flex gap-5 items-center">
                <div className="flex items-center bg-gray-200 dark:bg-gray-700 p-3 gap-2 rounded-lg transition-colors duration-500">
                    <MdSunny />
                    <div onClick={handleClick} className="cursor-pointer transition-colors duration-500">
                        {isDark
                            ? <FaToggleOn color="#9333EA" size={"30px"} />
                            : <FaToggleOff color="gray" size={"30px"} />}
                    </div>
                    <BsFillMoonStarsFill />
                </div>
                <AddTaskButton />
                <HiDotsVertical />
            </div>
        </div>
    )
}

export default Header;
