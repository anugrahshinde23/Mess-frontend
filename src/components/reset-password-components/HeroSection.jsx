import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import VerifyOTP from "./VerifyOTP";
import ResetPassword from "./ResetPassword";
import ResetDone from "./ResetDone";
import SendOTP from "./SendOTP";

const HeroSection = () => {
  const [tab, setTab] = useState("tab1");
  const [phoneNumber, setPhoneNumber] = useState("");

  const renderComponent = () => {
    switch (tab) {
      case "tab1":
        return <SendOTP setTab={setTab} setPhoneNumber={setPhoneNumber} />;
      case "tab2":
        return <VerifyOTP phoneNumber={phoneNumber} setTab={setTab} />;
      case "tab3":
        return <ResetPassword phoneNumber={phoneNumber} setTab={setTab} />;
      case "tab4":
        return <ResetDone />;
      default:
        return null;
    }
  };

  return (
    <div className="h-screen flex justify-center items-center overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{
            duration: 0.4,
            ease: [0.4, 0, 0.2, 1], // smooth material easing
          }}
          className="w-full flex justify-center"
        >
          {renderComponent()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default HeroSection;
