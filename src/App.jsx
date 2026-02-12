import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import RegisterAndLogin from "./pages/RegisterAndLogin";
import { ToastContainer } from 'react-toastify'
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


const App = () => {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="light"
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<RegisterAndLogin />} />
        <Route path="/customer-home" element={<ProtectedRoutes>
          <CustomerHome/>
        </ProtectedRoutes>}/>
        <Route
          path="/owner-dashboard"
          element={
            <RoleProtectedRoutes allowedRoles={["MESS_OWNER"]}>
              <OwnerDashBoard/>
            </RoleProtectedRoutes>
          }
        ></Route>

        <Route path="/register-mess" element={
          <RoleProtectedRoutes allowedRoles={["MESS_OWNER", "CUSTOMER"]}>
            <RegisterMess/>
          </RoleProtectedRoutes>
        } />

        <Route path="/mess-detail/:messId" element={
          <ProtectedRoutes>
            <MessDetailPage/>
          </ProtectedRoutes>
        } />

        <Route path="/order-history-customer" element={
          <ProtectedRoutes>
            <OrderHistoryPageCustomer/>
          </ProtectedRoutes>
        } />

        <Route path="/payment-history-customer" element={
          <ProtectedRoutes>
            <PaymentHistoryPageCustomer/>
          </ProtectedRoutes>
        } />

        <Route path="/pay" element={
          <ProtectedRoutes>
            <Payment/>
          </ProtectedRoutes>
        } />

        <Route path="/register-delivery-boy" element={
          <RoleProtectedRoutes allowedRoles={["DELIVERY_BOY", "CUSTOMER"]}>
            <DeliveryBoyRegisterPage/>
          </RoleProtectedRoutes>
        }/>

        <Route path="/delivery-boy-dashboard" element={
          <RoleProtectedRoutes allowedRoles={["DELIVERY_BOY"]}>
            <DeliveryBoyDashboard/>
          </RoleProtectedRoutes>
        } />

        <Route path="/reset-password" element={
          <ResetPassword/>
        } />

        <Route path="/admin-dashboard" element={
          <RoleProtectedRoutes allowedRoles={["ADMIN"]}>
            <AdminDashboard/>
          </RoleProtectedRoutes>
        }/>
      </Routes>
    </>
  );
};

export default App;
