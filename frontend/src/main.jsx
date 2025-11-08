import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import StorecontextProvider from "./context/StoreProvider.jsx";
  import { ToastContainer } from 'react-toastify';

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StorecontextProvider>
      <ToastContainer autoClose={1000}/>
      <App />
    </StorecontextProvider>
  </BrowserRouter>
);
