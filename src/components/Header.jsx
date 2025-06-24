import { BsFillMoonStarsFill } from "react-icons/bs";
import { MdSunny } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import AddTaskButton from "../buttons/AddTaskButton";
import { toggleTheme } from "../store/slices/columnSlice";
import { FaToggleOn, FaToggleOff } from "react-icons/fa6";
import Logo from "./Logo";

const Header = () => {
    const cols = useSelector(store => store.columnSlice.columns);
    const isDark = useSelector(store => store.columnSlice.isDark);
    const dispatch = useDispatch();

    function handleClick() {
        dispatch(toggleTheme());
    }

    return (
        <div className="w-[100vw] h-16 md:h-20 border-b flex justify-between px-5 md:px-10 items-center bg-white text-black dark:bg-gray-900 dark:text-white dark:border-gray-700 transition-colors duration-300 ease-in-out shadow-sm">
            <div className="flex gap-2">
                <Logo />
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight">kanban</h1>
            </div>

            <div className="flex gap-3 md:gap-5 items-center">
                {/* Theme Toggle */}
                <div className="flex items-center bg-gray-100 dark:bg-gray-800 px-2 md:px-3 py-1.5 md:py-2 gap-1.5 md:gap-2 rounded-full transition-all duration-300 hover:shadow-md">
                    <MdSunny
                        size={window.innerWidth < 768 ? "18px" : "20px"}
                        className="text-yellow-500 dark:text-yellow-400"
                    />
                    <div
                        onClick={handleClick}
                        className="cursor-pointer transition-transform duration-200 hover:scale-110 active:scale-95"
                    >
                        {isDark
                            ? <FaToggleOn color="#9333EA" size={window.innerWidth < 768 ? "22px" : "25px"} />
                            : <FaToggleOff color="#6B7280" size={window.innerWidth < 768 ? "22px" : "25px"} />
                        }
                    </div>
                    <BsFillMoonStarsFill
                        size={window.innerWidth < 768 ? "16px" : "18px"}
                        className="text-purple-600 dark:text-purple-400"
                    />
                </div>

                {/* Add Task Button - Hidden on mobile */}
                <div className="hidden md:block">
                    <AddTaskButton />
                </div>
            </div>
        </div>
    )
}

export default Header;