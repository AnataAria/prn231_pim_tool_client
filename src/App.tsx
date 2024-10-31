import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/NavBar";
import LeftBar from "./components/LeftBar";

const App = () => {
    return (
        <div>
          <Navbar />
          <div className="container">
            <div className="left-column">
              <LeftBar className="left-column" />
            </div>
            {/* <div className="right-column">
              <Routes>
                <Route path="/" element={<MainPage />}></Route>
                <Route path="/projects" element={<ProjectPage />}></Route>
                <Route
                  path="/projects/:projectId"
                  element={<ProjectPage />}
                ></Route>
              </Routes>
            </div> */}
          </div>
          <ToastContainer />
        </div>
      );
}

export default App;

