// App.js
import React, { useState, useEffect } from 'react';
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import RegisterAndLogin from "./pages/RegisterAndLogin";
import { ToastContainer } from 'react-toastify';
import CustomerHome from "./pages/CustomerHome";
import OwnerDashBoard from "./pages/OwnerDashBoard";
import RoleProtectedRoutes from "./routes/RoleProtectedRoutes";
import RegisterMess from "./pages/RegisterMess";
import MessDetailPage from "./pages/MessDetailPage";
import OrderHistoryPageCustomer from "./pages/OrderHistoryPageCustomer";
import Payment from "./pages/Payment";
import PaymentHistoryPageCustomer from "./pages/PaymentHistoryPageCustomer";
import DeliveryBoyDashboard from "./pages/DeliveryBoyDashboard";
import DeliveryBoyRegisterPage from "./pages/DeliveryBoyRegisterPage";
import ResetPassword from "./pages/ResetPassword";
import AdminDashboard from "./pages/AdminDashboard";
import Loader from './utils/Loader';
import ProgressNav from './utils/ProgressNav';
import TargetCursor from './utils/TargetCursor';
import VerityChatPage from './pages/VerityChatPage';
import VerityChatButton from './components/verity-components/VerityChatButton';
import NotFound from './utils/NotFound';
import AboutUs from './components/home-components/AboutUs';
import ContactUs from './components/home-components/ContactUs';
import HowItWorks from './components/home-components/HowItWorks';
import "shepherd.js/dist/css/shepherd.css";




const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading (e.g., auth check, API call)
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>

<TargetCursor 
        spinDuration={2}
        hideDefaultCursor
        parallaxOn
  hoverDuration={0.2}
/>
       
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            pauseOnHover
            theme="light"
          />
          <ProgressNav/>
          <Routes>
            
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<RegisterAndLogin />} />
            <Route path="/customer-home" element={<ProtectedRoutes><CustomerHome /></ProtectedRoutes>} />
            <Route path="/owner-dashboard" element={<RoleProtectedRoutes allowedRoles={["MESS_OWNER"]}><OwnerDashBoard /></RoleProtectedRoutes>} />
            <Route path="/register-mess" element={<RoleProtectedRoutes allowedRoles={["MESS_OWNER", "CUSTOMER"]}><RegisterMess /></RoleProtectedRoutes>} />
            <Route path="/mess-detail/:messId" element={<ProtectedRoutes><MessDetailPage /></ProtectedRoutes>} />
            <Route path="/order-history-customer" element={<ProtectedRoutes><OrderHistoryPageCustomer /></ProtectedRoutes>} />
            <Route path="/payment-history-customer" element={<ProtectedRoutes><PaymentHistoryPageCustomer /></ProtectedRoutes>} />
            <Route path="/pay" element={<ProtectedRoutes><Payment /></ProtectedRoutes>} />
            <Route path="/register-delivery-boy" element={<RoleProtectedRoutes allowedRoles={["DELIVERY_BOY", "CUSTOMER"]}><DeliveryBoyRegisterPage /></RoleProtectedRoutes>} />
            <Route path="/delivery-boy-dashboard" element={<RoleProtectedRoutes allowedRoles={["DELIVERY_BOY"]}><DeliveryBoyDashboard /></RoleProtectedRoutes>} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/admin-dashboard" element={<RoleProtectedRoutes allowedRoles={["ADMIN"]}><AdminDashboard /></RoleProtectedRoutes>} />
            <Route path='/verity' element={<ProtectedRoutes><VerityChatPage/></ProtectedRoutes>}/>
            <Route path='/aboutus' element={<AboutUs/>} />
            <Route path='/contact-us' element={<ContactUs/>} />
            <Route path='/how-messmate-works' element={<HowItWorks/>} />
            <Route path='*' element={<NotFound/>} />
          </Routes>
          <VerityChatButton/>
        </>
      )}
    </>
  );
};

export default App;   