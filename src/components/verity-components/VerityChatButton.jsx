import React from 'react'
import { useNavigate } from 'react-router-dom'
import { MessageCircle } from 'lucide-react';

const VerityChatButton = () => {


  const navigate = useNavigate()

  return (
    <button
    onClick={() => navigate('/verity')} // Aapka chatbot page ka path
    className="fixed bottom-6 right-6 p-4 bg-indigo-500 text-white rounded-full shadow-2xl hover:bg-blue-700 transition-all duration-300 transform hover:scale-110 z-50 flex items-center justify-center group"
  >
    {/* Tooltip jo hover pe dikhega */}
    <span className="absolute right-16 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
      Ask Verity
    </span>
    
    <MessageCircle size={28} />
  </button>
  )
}

export default VerityChatButton