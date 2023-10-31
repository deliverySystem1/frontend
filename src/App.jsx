import { Provider } from "react-redux";
import Store from "./store/index.js";
import "./App.css";
import Login from "./components/login/Login.jsx";
import Siginup from "./components/siginup/siginup.jsx";


function App() {
  return (
    <>
      <Provider store={Store}>
        <Login />
        {/* <Siginup/> */}
      </Provider>
    </>
  );
}

export default App;
