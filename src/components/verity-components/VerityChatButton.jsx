import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom' // 1. useLocation add kiya
import { MessageCircle , BrainCog, Brain} from 'lucide-react';

const VerityChatButton = () => {
  const navigate = useNavigate()
  const location = useLocation() // 2. Current path check karne ke liye

  // 3. Agar path '/verity' hai, toh button return mat karo (Hide)
  if (location.pathname === '/verity' || location.pathname === 'admin-dashboard') {
    return null;
  }


  return (
    <button
    
      onClick={() => navigate('/verity')} 
      className="fixed bottom-20 right-15 p-4 bg-indigo-500 text-white rounded-full shadow-2xl hover:bg-indigo-700 transition-all duration-300 transform hover:scale-110 z-50 flex items-center justify-center group"
    >
      <span className="absolute right-16 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        Ask Verity
      </span>
      
      <Brain size={28} />
    </button>
  )
}

export default VerityChatButton
