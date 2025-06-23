import { useEffect } from "react";
import { useSelector } from "react-redux";
import DashBoard from "./components/Dashboard";
import Header from "./components/Header";

function App() {
  const isDark = useSelector((store) => store.columnSlice.isDark);

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <>
      <Header />
      <DashBoard />
    </>
  )
}

export default App