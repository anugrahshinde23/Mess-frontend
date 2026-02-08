import React from 'react'
import Shop from './Shop'
import Settings from './Settings'
import Menu from './Menu'
import Plan from './Plan'
import Orders from './Orders'
import DeliveryBoy from './DeliveryBoy'

const HeroSection = ({activeTab, messData, handleGetMessData, showUpdateModal, setShowUpdateModal, handleLogout }) => {
  return (
    <>
    
    <div className='bg-zinc-200 max-w-full sm:w-full overflow-auto my-4 mx-4 sm:mx-4 sm:my-0 rounded-2xl' >
        {activeTab === 'tab1' && <p>Dashboard</p>}
        {activeTab === 'tab2' && <Shop messData={messData} handleGetMessData={handleGetMessData} showUpdateModal={showUpdateModal} setShowUpdateModal={setShowUpdateModal} />}
        {activeTab === 'tab3' && <Orders handleGetMessData={handleGetMessData} messData={messData}/>}
        {activeTab === 'tab4' && <DeliveryBoy messData={messData} handleGetMessData={handleGetMessData}/>}
        {activeTab === 'tab5' && <Menu/>}
        {activeTab === 'tab6' && <Plan messData={messData} handleGetMessData={handleGetMessData}/>}
        {activeTab === 'tab7' && <Settings  handleLogout={handleLogout}/>}
    </div>
    
    </>
  )
}

export default HeroSection