import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Placeorder from "./pages/Placeorder";
import Footer from "./components/Footer";
import Loginpopup from "./components/Loginpopup";
import { useState } from "react";
import Verify from "./pages/Verify";
import Myorders from "./pages/Myorders";

function App() {
  const [login, setlogin] = useState(false);
  return (
    <>
      {login ? <Loginpopup setlogin={setlogin} /> : null}
      <div className="app">
        <Navbar setlogin={setlogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/placeorder" element={<Placeorder />} />
          <Route path="/verify" element={<Verify />} /> //they are query parameters
          <Route path="/myorders" element={<Myorders />} /> 
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
