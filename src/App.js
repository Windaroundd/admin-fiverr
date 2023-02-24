import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import UserPage from "./pages/User/UserPage";

import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import JobPage from "./pages/Job/JobPage";
import JobTypePage from "./pages/JobType/JobTypePage";
import SevicesPage from "./pages/Serviecs/SevicesPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SideBar from "./HOC/HeaderOnly/SideBar";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/signup" element={<Register />} />

          <Route
            path="/user"
            element={
              <SideBar>
                <UserPage />
              </SideBar>
            }
          ></Route>
          <Route
            path="/job"
            element={
              <SideBar>
                <JobPage />
              </SideBar>
            }
          />
          <Route
            path="/job-type"
            element={
              <SideBar>
                <JobTypePage />
              </SideBar>
            }
          />
          <Route
            path="/services"
            element={
              <SideBar>
                <SevicesPage />
              </SideBar>
            }
          ></Route>
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </div>
  );
}

export default App;
