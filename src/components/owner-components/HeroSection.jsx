import React, { useEffect, useState } from 'react'
import Shop from './Shop'
import Settings from './Settings'
import Menu from './Menu'
import Plan from './Plan'
import Orders from './Orders'
import DeliveryBoy from './DeliveryBoy'
import Dashboard from './Dashboard'
import { toast } from 'react-toastify'
import { getSubscriptionByStatusApi } from '../../services/subscription.services'
import { getOrdersApi } from '../../services/order.services'

const HeroSection = ({activeTab, messData, handleGetMessData, showUpdateModal, setShowUpdateModal, handleLogout }) => {

  const [subscriptions, setSubscriptions] = useState([]);
  const [order, setOrders] = useState([]);
  const [status, setStatus] = useState("")

   const fetchSubscriptions = async (status) => {
      try {
        const res = await getSubscriptionByStatusApi(status);
        console.log(res);
       
        setSubscriptions(res.subsData);
      } catch (err) {
        toast.error(err.response?.data?.message);
      }
    };

    const handleGetOrders = async () => {
        try {
          const res = await getOrdersApi();
          // console.log(res);
          handleGetMessData();
          setOrders(res.orderData);
          // toast.success(res.message);
        } catch (error) {
          console.log(error.message);
    
          // toast.error("Failed to fetch Orders");
        }
      };

      useEffect(() => {
        fetchSubscriptions(status)
      }, [status])

  return (
    <>
    
    <div className='bg-zinc-200 max-w-full sm:w-full overflow-auto my-4 mx-4 sm:mx-4 sm:my-0 rounded-2xl' >
        {activeTab === 'tab1' && <Dashboard order={order} subscriptions={subscriptions} />}
        {activeTab === 'tab2' && <Shop messData={messData} handleGetMessData={handleGetMessData} showUpdateModal={showUpdateModal} setShowUpdateModal={setShowUpdateModal} />}
        {activeTab === 'tab3' && <Orders setStatus={setStatus} order={order} handleGetOrders={handleGetOrders}  subscriptions={subscriptions} fetchSubscriptions={fetchSubscriptions} handleGetMessData={handleGetMessData} messData={messData}/>}
        {activeTab === 'tab4' && <DeliveryBoy messData={messData} handleGetMessData={handleGetMessData}/>}
        {activeTab === 'tab5' && <Menu/>}
        {activeTab === 'tab6' && <Plan messData={messData} handleGetMessData={handleGetMessData}/>}
        {activeTab === 'tab7' && <Settings  handleLogout={handleLogout}/>}
    </div>
    
    </>
  )
}

export default HeroSection