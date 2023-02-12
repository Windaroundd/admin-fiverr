import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import User from "./components/UserManagement/User";
import UserPage from "./pages/User/UserPage";
import HeaderOnly from "./HOC/HeaderOnly/HeaderOnly";
import Homepages from "./pages/home/Homepages";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import JobPage from "./pages/Job/JobPage";
import JobTypePage from "./pages/JobType/JobTypePage";
import SevicesPage from "./pages/Serviecs/SevicesPage";

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
          <Route
            path="/job-type"
            element={
              <HeaderOnly>
                <JobTypePage />
              </HeaderOnly>
            }
          />
          <Route
            path="/services"
            element={
              <HeaderOnly>
                <SevicesPage />
              </HeaderOnly>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
