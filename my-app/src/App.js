import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login&Signup/Login";
import Signup from "./pages/Login&Signup/Signup";
import Aboutus from "./pages/About-us/About";
import Contactus from "./pages/Contact-us/Contact";
import PaymentPage from "./pages/Payment/Payment";
import Reservations from "./pages/Resorts/Resorts";
import Resort from "./pages/Resort/Resort";
import Add from "./pages/Resort/Add";
import Update from "./pages/Resort/Update";
import Userprofile from "./pages/UserProfile/Userprofile";
import EditProfile from "./pages/UserProfile/EditProfile";

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
        <Route path="/resorts" element={<Reservations />} />
        <Route path="/resort" element={<Resort />} />
        <Route path="/add" element={<Add />} />
        <Route path="/Update:id" element={<Update />} />
        <Route path="/userprofile" element={<Userprofile />} />
        <Route path="/editProfile" element={<EditProfile />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
