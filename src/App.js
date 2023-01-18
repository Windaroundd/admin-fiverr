import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Homepages from "./pages/home/Homepages";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/signup" element={<Register />} />
          <Route path="/home" element={<Homepages />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
