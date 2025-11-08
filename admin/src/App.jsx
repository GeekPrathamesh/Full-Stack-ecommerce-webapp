import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Add from "./pages/Add";
import List from "./pages/List";
import Orders from "./pages/Orders";
import { ToastContainer, toast } from "react-toastify";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <div className="app">
        <ToastContainer position="bottom-center" autoClose={2000} />
        <Navbar />
        <div className="flex">
          <Sidebar />
          <div className="flex flex-1">

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/add" element={<Add />} />
              <Route path="/list" element={<List />} />
              <Route path="/Orders" element={<Orders />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
