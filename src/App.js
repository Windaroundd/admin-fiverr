import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import User from "./components/UserManagement/User";
import UserPage from "./pages/User/UserPage";
import HeaderOnly from "./HOC/HeaderOnly/HeaderOnly";
import Homepages from "./pages/home/Homepages";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import JobPage from "./pages/Job/JobPage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/signup" element={<Register />} />
          <Route
            path="/home"
            element={
              <HeaderOnly>
                <Homepages />
              </HeaderOnly>
            }
          ></Route>
          <Route
            path="/user"
            element={
              <HeaderOnly>
                <UserPage />
              </HeaderOnly>
            }
          ></Route>
          <Route
            path="/job"
            element={
              <HeaderOnly>
                <JobPage />
              </HeaderOnly>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
