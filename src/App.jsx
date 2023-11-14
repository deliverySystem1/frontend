import { Provider } from "react-redux";
import Store from "./store/index.js";
import "./App.css";
import Login from "./components/login/Login.jsx";
import Signup from "./components/signup/Signup.jsx";
import { Route, Routes } from "react-router-dom";
import AdminForm from "./components/adminPage/admin.jsx"
function App() {
  return (
    <>
      <Provider store={Store}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/admin" element={<AdminForm/>}/>
        </Routes>
      </Provider>
    </>
  );
}

export default App;
