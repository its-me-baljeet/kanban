import { Provider } from "react-redux";
import Header from "./components/Header";
import store from "./store/store"
import DashBoard from "./components/Dashboard";

function App() {

  return (
    <Provider store={store}>
      <Header />
      <DashBoard />
    </Provider>
  )
}

export default App
