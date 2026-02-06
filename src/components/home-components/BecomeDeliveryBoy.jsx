import React from 'react'
import registerDelivery from '../../assests/images/registerDelivery.png'
import { useNavigate } from 'react-router-dom'

const BecomeDeliveryBoy = () => {


  const navigate = useNavigate()

  return (
    <>
     <div className="flex flex-row sm:flex-col mx-5 gap-5 items-start sm:ml-15 my-20 ">
        <p className=" text-3xl sm:text-5xl font-bold text-indigo-500">Become Delivery Boy!</p>
        <p className="text-sm font-medium text-gray-500">
          {" "}
          Transform your vehicle into an income source by becoming a delivery<br/> partner for our local meal service! If you have a bike, scooter, or car,<br/> a valid license, and a smartphone, you can start delivering fresh, <br/>prepared meals to customers in your area. This opportunity offers<br/> flexible hours that can work around your schedule, giving you the <br/> freedom to earn money independently. Utilize your vehicle to deliver <br/> quality, nutritious food and join a reliable team. Visit our website to <br/> sign up today and begin delivering soon.
        </p>
      </div>
      <div className="mx-15 my-10 group relative">
              <img
                className="rounded-4xl cursor-pointer object-cover 
          shadow-lg shadow-black/20
          transition-all duration-300
          hover:-translate-y-2 hover:shadow-2xl"
                src={registerDelivery}
                alt=""
              />
      
      <div className="absolute  inset-0 bg-indigo-500 opacity-0 group-hover:opacity-80 transition-opacity duration-300 rounded-4xl cursor-pointer">
      
      </div>
      
      <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 text-7xl font-bold cursor-pointer text-white " onClick={() => {
        navigate('/register-delivery-boy')
      }
        
      }>
        Register Now
      </div>
      
              
            </div>
    </>
  )
}

export default BecomeDeliveryBoy