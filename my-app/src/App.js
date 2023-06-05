import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login&Signup/Login";
import Signup from "./pages/Login&Signup/Signup";
import Aboutus from "./pages/About-us/About";
import Contactus from "./pages/Contact-us/Contact";
import PaymentPage from "./pages/Payment/Payment";
import Reservations from "./pages/Resorts/Resorts";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/aboutus" element={<Aboutus />} />
        <Route path="/contactus" element={<Contactus />} />
        <Route path="/paymentPage" element={<PaymentPage />} />
        <Route path="/reservations" element={<Reservations />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
