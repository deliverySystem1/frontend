import { Provider } from "react-redux";
import Store from "./store/index.js";
import "./App.css";
import Login from "./components/login/Login.jsx";

function App() {
  return (
    <>
      <Provider store={Store}>
        <Login />
      </Provider>
    </>
  );
}

export default App;
