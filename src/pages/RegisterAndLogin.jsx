import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { loginApi, registerApi } from "../services/auth.services";
import { toast } from "react-toastify";
import * as MaterialDesignIcons from 'react-icons/md'

const RegisterAndLogin = () => {
  const [isLoginActive, setIsLoginActive] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [Loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [passVisibility, setPassVisibility] = useState(false)

  const handleTogglePassVisibility = () => {
    if(passVisibility === true){
      setPassVisibility(false)
    }else {
      setPassVisibility(true)
    }
  }

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLoginActive = () => {
    if (isLoginActive === false) {
      setIsLoginActive(true);
    } else {
      setIsLoginActive(false);
    }
  };

  const handleInputChanges = (e) => {};

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    console.log("Login button clicked");

    try {
      setLoading(true);

      const res = await loginApi({ phone, password });

      login(res.data, res.accessToken);

      console.log(res);
      toast.success(res.message);

      setTimeout(() => {
        if (res.data.role === "MESS_OWNER") {
          navigate("/owner-dashboard");
        } else if (res.data.role === "CUSTOMER") {
          navigate("/customer-home");
        } else if (res.data.role === "DELIVERY_BOY") {
          navigate("/delivery-boy-dashboard");
        }
      }, 1500);
    } catch (error) {
      toast.error("Login Failed");
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);

      const res = await registerApi({
        name,
        phone,
        password,
        address,
        pincode,
      });
      console.log(res);
      toast.success(res.message);

      setTimeout(() => {
        setIsLoginActive(true);
      }, 1500);
    } catch (err) {
      // setError(err.response?.data?.message || "Registration failed");
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {isLoginActive ? (
        <div className="flex flex-col sm:flex-row w-full h-full">
          <div className="sm:w-1/2 py-10  w-full bg-indigo-500 rounded-br-[200px] rounded-bl-[200px]  sm:rounded-bl-none sm:rounded-tr-[200px] flex flex-col items-center justify-center ">
            <div className="text-white font-bold flex flex-col items-center gap-2 sm:gap-5">
              <p className=" text-3xl sm:text-4xl md:text-5xl">Welcome Back!</p>
              <p className="text-sm sm:text-[16px]">Dont have an account?</p>
            </div>

            <div className="border-2 border-white  px-5 py-0.5 sm:px-10 sm:py-1 mt-3 sm:mt-5 text-white cursor-pointer hover:bg-white hover:text-indigo-500">
              <button
                className=" text-sm sm:text-[16px] cursor-pointer"
                onClick={handleLoginActive}
              >
                Register
              </button>
            </div>
          </div>

          <div className="w-full  sm:w-1/2 mt-15 sm:mt-0 sm:h-screen justify-center flex flex-col items-center gap-7 sm:gap-7 md:gap-7  ">
            <div>
              <p className="font-bold text-3xl  sm:text-4xl md:text-5xl sm:mb-3 md:mb-5 ">
                Login
              </p>
            </div>
            <form
              onSubmit={handleLoginSubmit}
              className="flex flex-col w-2/3  md:w-1/2 gap-5 sm:gap-7 md:gap-10 "
            >
              <input
                type="text"
                name="phone"
                placeholder="Enter Phone"
                onChange={(e) => setPhone(e.target.value)}
                className=" rounded-2xl bg-zinc-300 px-3 py-2 sm:px-4 sm:py-3"
              />
              <div className="">
              <input
                type= {passVisibility  === true ? "password" : "text" }
                name="password"
                placeholder="Enter Password"
                onChange={(e) => setPassword(e.target.value)}
                className=" relative rounded-2xl bg-zinc-300  px-3 py-2 w-full sm:px-4 sm:py-3"
              />



              {passVisibility === true ? (
                <MaterialDesignIcons.MdVisibility size={20} className="absolute right-55 top-99 cursor-pointer" onClick={handleTogglePassVisibility}/>
              ) : (

                <MaterialDesignIcons.MdVisibilityOff size={20} className="absolute right-55 top-99 cursor-pointer" onClick={handleTogglePassVisibility}/>
              )}
              
              </div>

            

              <div>
                <p className=" text-zinc-500 sm:text-[16px] text-sm cursor-pointer" onClick={() => {
                  navigate('/reset-password')
                }}>
                  Forgot Password?
                </p>
              </div>

              <div className="bg-indigo-500 flex justify-center w-2/3 md:w-1/2 rounded-2xl">
                <button
                  className=" px-3 py-2 sm:px-4 sm:py-3 text-white font-bold"
                  type="submit"
                >
                  {Loading ? "Logging In..." : "Login"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="flex flex-col-reverse sm:flex-row w-full h-full">
          <div className="w-full  sm:w-1/2 mt-15 sm:mt-0 sm:h-screen justify-center flex flex-col items-center gap-7 sm:gap-7 md:gap-7 ">
            <div>
              <p className="font-bold text-3xl  sm:text-4xl md:text-5xl sm:mb-3 md:mb-5 ">
                Register
              </p>
              {error && <p className="text-red-500">{error}</p>}
            </div>
            <div className="flex flex-col w-2/3  md:w-1/2 gap-5 sm:gap-7 md:gap-10  ">
              <input
                type="text"
                name="name"
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter Name"
                className=" rounded-2xl bg-zinc-300 px-3 py-2 sm:px-4 sm:py-3"
              />
              <input
                type="text"
                name="phone"
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter Phone"
                className=" rounded-2xl bg-zinc-300 px-3 py-2 sm:px-4 sm:py-3"
              />
              <input
                type="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                className=" rounded-2xl bg-zinc-300 px-3 py-2 sm:px-4 sm:py-3"
              />
              <input
                type="text"
                name="address"
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter Address"
                className=" rounded-2xl bg-zinc-300 px-3 py-2 sm:px-4 sm:py-3"
              />
              <input
                type="Number"
                name="pincode"
                onChange={(e) => setPincode(e.target.value)}
                placeholder="Enter Pincode"
                className=" rounded-2xl bg-zinc-300 px-3 py-2 sm:px-4 sm:py-3"
              />
            </div>

            <div className="bg-indigo-500 flex justify-center w-2/3 md:w-1/2 rounded-2xl">
              <button
                className=" px-3 py-2 sm:px-4 sm:py-3 text-white font-bold"
                onClick={handleRegisterSubmit}
                type="submit"
                disabled={Loading}
              >
                {Loading ? "Registering..." : "Register"}
              </button>
            </div>
          </div>

          <div className="sm:w-1/2 py-10  w-full bg-indigo-500 rounded-br-[200px] rounded-bl-[200px] sm:rounded-bl-[200px] sm:rounded-br-none sm:rounded-tl-[200px] flex flex-col items-center justify-center">
            <div className="text-white font-bold flex flex-col items-center gap-2 sm:gap-5">
              <p className="text-3xl sm:text-4xl md:text-5xl">Welcome Back!</p>
              <p className="text-sm sm:text-[16px]">Already have an account?</p>
            </div>

            <div className="border-2 border-white  px-5 py-0.5 sm:px-10 sm:py-1 mt-3 sm:mt-5 text-white cursor-pointer hover:bg-white hover:text-indigo-500">
              <button
                className="text-sm sm:text-[16px] cursor-pointer"
                onClick={handleLoginActive}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RegisterAndLogin;
