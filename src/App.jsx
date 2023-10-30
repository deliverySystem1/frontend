import { Provider } from "react-redux";
import Store from "./store/index.js";
import "./App.css";
import Login from "./components/login/Login.jsx";
import Signup from "./components/signup/Signup.jsx";

function App() {
  return (
    <>
      <Provider store={Store}>
        {/* <Login /> */}
        <Signup/>
      </Provider>
    </>
  );
}

export default App;
