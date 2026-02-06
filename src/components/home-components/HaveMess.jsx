import React from "react";
import registerBanner from "../../assests/images/registerBanner.png";
import { useNavigate } from "react-router-dom";

const HaveMess = () => {


  const navigate = useNavigate()


  return (
    <>
      <div className="flex flex-row sm:flex-col mx-5 gap-5 items-end sm:mr-15 my-20 ">
        <p className=" text-3xl sm:text-5xl font-bold text-indigo-500">Have a Mess?</p>
        <p className="text-sm font-medium text-gray-500">
          {" "}
          Already operate a mass feeding location, you can register your
          facility on our website.<br></br> The website will help you manage
          your existing operations and reach a wider audience.
        </p>
      </div>

      <div className="mx-15 my-10 group relative">
        <img
          className="rounded-4xl cursor-pointer object-cover 
    shadow-lg shadow-black/20
    transition-all duration-300
    hover:-translate-y-2 hover:shadow-2xl"
          src={registerBanner}
          alt=""
        />

<div className="absolute  inset-0 bg-indigo-500 opacity-0 group-hover:opacity-80 transition-opacity duration-300 rounded-4xl cursor-pointer">

</div>

<div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 text-7xl font-bold cursor-pointer text-white " onClick={() => {
  navigate('/register-mess')
}
  
}>
  Register Now
</div>

        
      </div>
    </>
  );
};

export default HaveMess;
