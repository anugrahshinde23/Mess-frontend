import React, { useRef, useState } from "react";
import * as MaterialDesignIcons from "react-icons/md";
import { verifyOtpApi } from "../../services/auth.services";
import { toast } from "react-toastify"

const VerifyOTP = ({ phoneNumber, setTab }) => {

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputs = useRef([]);

  const [loading, setLoading] = useState(false)

  

  const handleChange = (value, index) => {
    if (/^\d?$/.test(value)) { // Allow only single digit or empty
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to next input if digit entered and not last field
      if (value && index < 5) {
        inputs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    // Move to previous input on Backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData('text');
    if (/^\d{6}$/.test(paste)) {
      const digits = paste.split('');
      setOtp(digits);
      digits.forEach((digit, idx) => {
        if (inputs.current[idx]) inputs.current[idx].value = digit;
      });
      inputs.current[5].focus();
    }
  };

  
  const finalOtp = otp.join("")

  const handleVerifyOtp = async() => {
    if(!phoneNumber || !finalOtp){
      alert("Required fields")
      return
    }

   try {
    setLoading(true)
    const res = await verifyOtpApi({phone : phoneNumber, otp: finalOtp})
    console.log(res);
    setTimeout(() => {
      setTab("tab3")
    }, 2000);
    toast.success(res.message)
   } catch (error) {
    toast.error(error.response?.data?.message)
   } finally {
    setLoading(false)
   }
  }


  return (
    <>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-5 justify-center items-center">
          <div className="flex flex-col  bg-indigo-500 p-2 rounded-2xl w-fit">
            <MaterialDesignIcons.MdOutlineMessage size={30} color="white" />
          </div>
          <p className="text-2xl font-bold">Enter your code</p>
          <p className="text-gray-400">
             Enter the code sent to <span className="font-bold">{phoneNumber}</span>
          </p>
        </div>
        <div className="flex items-center gap-2">
        {otp.map((digit, index) => (
        <input
          key={index}
          ref={(el) => (inputs.current[index] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(e.target.value, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          className="border w-10 p-2 rounded-2xl text-center"
          autoFocus={index === 0}
        />
      ))}
        </div>
        <button onClick={handleVerifyOtp} className="bg-indigo-500 hover:bg-indigo-400 text-sm text-white font-bold px-5 py-2 mt-50 rounded-2xl cursor-pointer">{
          loading ? "Verifying..." : "Verify"
          }</button>
      </div>
    </>
  );
};

export default VerifyOTP;
