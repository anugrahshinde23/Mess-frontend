import React, { useState } from 'react'
import Shop from './Shop'
import Settings from './Settings'
import Menu from './Menu'
import Plan from './Plan'
import Orders from './Orders'
import DeliveryBoy from './DeliveryBoy'
import Dashboard from './Dashboard'
import { toast } from 'react-toastify'
import { getSubscriptionByStatusApi } from '../../services/subscription.services'

const HeroSection = ({activeTab, messData, handleGetMessData, showUpdateModal, setShowUpdateModal, handleLogout }) => {

  const [subscriptions, setSubscriptions] = useState([]);

   const fetchSubscriptions = async (status) => {
      try {
        const res = await getSubscriptionByStatusApi(status);
        console.log(res);
       
        setSubscriptions(res.subsData);
      } catch (err) {
        toast.error(err.response?.data?.message);
      }
    };


  return (
    <>
    
    <div className='bg-zinc-200 max-w-full sm:w-full overflow-auto my-4 mx-4 sm:mx-4 sm:my-0 rounded-2xl' >
        {activeTab === 'tab1' && <Dashboard subscriptions={subscriptions} />}
        {activeTab === 'tab2' && <Shop messData={messData} handleGetMessData={handleGetMessData} showUpdateModal={showUpdateModal} setShowUpdateModal={setShowUpdateModal} />}
        {activeTab === 'tab3' && <Orders  subscriptions={subscriptions} fetchSubscriptions={fetchSubscriptions} handleGetMessData={handleGetMessData} messData={messData}/>}
        {activeTab === 'tab4' && <DeliveryBoy messData={messData} handleGetMessData={handleGetMessData}/>}
        {activeTab === 'tab5' && <Menu/>}
        {activeTab === 'tab6' && <Plan messData={messData} handleGetMessData={handleGetMessData}/>}
        {activeTab === 'tab7' && <Settings  handleLogout={handleLogout}/>}
    </div>
    
    </>
  )
}

export default HeroSection