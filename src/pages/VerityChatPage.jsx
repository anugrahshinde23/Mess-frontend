import React, { useState, useEffect, useRef } from 'react';
import { Send, User, Bot, ArrowLeft, Trash2, Copy, RotateCcw, Sun, Moon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { askVerityApi, createNewChatApi, deleteChatApi, getAllChatsApi, getChatApi, sendMessageApi, updateChatTitleApi } from '../services/verity.services';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism'; // VS Code Dark Theme
import TypeWriter from '../components/verity-components/TypeWriter';
import LiquidEther from '../components/verity-components/VerityBackground';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import verityGIF from '../assests/gif/verityGif.gif'
import { generateImageApi } from '../services/image.services';




const VerityChatPage = () => {


    const {user} = useAuth()


    const [darkMode, setDarkMode] = useState(() => {
      return localStorage.getItem("verity_theme") === "dark";
    });


    useEffect(() => {
      const root = document.documentElement;
    
      if (darkMode) {
        root.classList.add("dark");
        localStorage.setItem("verity_theme", "dark");
      } else {
        root.classList.remove("dark");
        localStorage.setItem("verity_theme", "light");
      }
    }, [darkMode]);

   
    const [chats, setChats] = useState([]);
    const [chatId, setChatId] = useState(null);
    const [input, setInput] = useState('');
    // 1. Consistency: 'messages' use karein msg ki jagah (aapke JSX mein yahi hai)
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef(null);
    const navigate = useNavigate();
    const [isTyping, setIsTyping] = useState(false);
    const [showScrollButton, setShowScrollButton] = useState(false);
    const chatContainerRef = useRef(null);
    const titleUpdatedRef = useRef(false);




// Update handleSend: When AI replies, set isTyping to true
// ... inside handleSend, after response ...


    // Load ONCE on mount
// useEffect(() => {
//     const saved = localStorage.getItem("verityChat");
//     if (saved) {
//       setMessages(JSON.parse(saved));
//     }
//   }, []);
  
//   // Save ONLY when messages change AFTER first render
//   useEffect(() => {
//     if (messages.length > 0) {
//       localStorage.setItem("verityChat", JSON.stringify(messages));
//     }
//   }, [messages]);






const fetchChats = async () => {
  try {
    const res = await getAllChatsApi();
    console.log(res);
    
    setChats(res.chats);
  } catch (err) {
    console.log(err);
  }
};

const deleteChat = async (id) => {
  if (!id) return;

  try {
    const res = await deleteChatApi(id);
    toast.success(res.message);

    // Sidebar update
    const updatedChats = chats.filter(chat => chat._id !== id);
    setChats(updatedChats);

    // Agar current chat delete hua
    if (chatId === id) {
      if (updatedChats.length > 0) {
        // Pehla chat select karo
        const firstChat = updatedChats[0];
        setChatId(firstChat._id);
        localStorage.setItem("verity_chat_id", firstChat._id);
      } else {
        // Agar koi chat nahi hai → NEW CHAT create
        const newChat = await createNewChatApi();
        setChatId(newChat.chatData._id);
        localStorage.setItem("verity_chat_id", newChat.chatData._id);
        setChats([newChat.chatData]);
      }

      setMessages([]);
    }

  } catch (error) {
    console.error(error);
    toast.error(error.response?.data?.message);
  }
};

useEffect(() => {
  

  fetchChats();
}, []);


useEffect(() => {
  const initChat = async () => {
    try {
      let savedChatId = localStorage.getItem("verity_chat_id");

      if (savedChatId) {
        setChatId(savedChatId);
      } else {
        const chat = await createNewChatApi();
        setChatId(chat.chatData._id);
        localStorage.setItem("verity_chat_id", chat.chatData._id);
      }
    } catch (err) {
      console.error(err);
    }
  };

  initChat();
}, []);

useEffect(() => {
  const loadChat = async () => {
    if (!chatId) return;

    try {
      const chat = await getChatApi(chatId);
      console.log(chat)
      setMessages(chat.chatData.messages || []);
    } catch (err) {
      console.error(err);
    }
  };

  loadChat();
}, [chatId]);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
  
    container.scrollIntoView({
      behavior: "smooth",
      block: "end"
    });
  }, [messages, isLoading]);


 // Track if we already updated

 useEffect(() => {
  if (!chatId) return;
  if (titleUpdatedRef.current) return;

  const firstUserMessage = messages.find(m => m.role === "user");
  if (!firstUserMessage) return;

  const newTitle =
    firstUserMessage.text.length > 20
      ? firstUserMessage.text.slice(0, 20) + "..."
      : firstUserMessage.text;

  updateChatTitleApi(chatId, newTitle)
    .then(res => {
      setChats(prev =>
        prev.map(c => c._id === chatId ? res.chatData : c)
      );
      titleUpdatedRef.current = true;
    })
    .catch(err => console.error(err));

}, [messages, chatId]);

  useEffect(() => {
    titleUpdatedRef.current = false;
  }, [chatId]);
    // const handleSend = async () => {
    //     if (!input.trim() || isLoading) return;
    
    //     // 1. Create the new user message
    //     const userMsg = { role: 'user', text: input };
        
    //     // 2. Add it to the list immediately for the UI
    //     const updatedMessages = [...messages, userMsg];
    //     setMessages(updatedMessages);
        
    //     const currentInput = input;
    //     setInput('');
    //     setIsLoading(true);
    
    //     try {
    //         // 3. Prepare the FULL history to send to the backend
    //         // We map 'ai' to 'assistant' because that's what the AI API understands
    //         const chatHistory = updatedMessages
    //         .filter(m => m.text && m.text.trim() !== "")
    //         .map(m => ({
    //           role: m.role === 'ai' ? 'assistant' : 'user',
    //           content: m.text
    //         }));
    
    //         // 4. Send 'history' instead of just 'msg'
    //         const response = await askVerityApi({ history: chatHistory });

    //         if (response?.reply) {
    //             setMessages(prev => [...prev, { role: 'ai', text: response.reply }]);
    //             setIsTyping(true); // Start the animation
    //         }
    
            
    //     } catch (error) {
    //         console.error("Chat Error:", error);
    //         setMessages(prev => [...prev, { role: 'ai', text: "Server error! Please check your connection." }]);
    //     } finally {
    //         setIsLoading(false);
    //     }
    // };

    const handleSend = async () => {
      if (!input.trim() || isLoading || !chatId) return;
    
      const userMsg = { role: "user", text: input };
      setMessages(prev => [...prev, userMsg]);
    
      const currentInput = input;
      setInput("");
      setIsLoading(true);
    
      try {
        const res = await sendMessageApi({
          chatId,
          message: currentInput,
         
        });
    
        if (res?.reply) {
          setMessages(prev => {
            const newMessages = [...prev];
          
            // Remove last assistant message
            if (newMessages[newMessages.length - 1]?.role === "assistant") {
              newMessages.pop();
            }
          
            newMessages.push({ role: "assistant", text: res.reply });
          
            return newMessages;
          });

          fetchChats()
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };


    // const handleRegenerate = async () => {
    //     if (isLoading) return;
      
    //     const lastUserMessage = [...messages]
    //       .reverse()
    //       .find(m => m.role === "user");
      
    //     if (!lastUserMessage) return;
      
    //     setIsLoading(true);
      
    //     try {
    //       const chatHistory = messages
    //         .filter(m => m.role !== "ai" || m !== messages[messages.length - 1])
    //         .map(m => ({
    //           role: m.role === "ai" ? "assistant" : "user",
    //           content: m.text
    //         }));
      
    //         const response = await sendMessageApi({
    //           chatId,
    //           message: lastUserMessage.text
    //         });;
      
    //       if (response?.reply) {
    //         setMessages(prev => [
    //           ...prev.slice(0, -1),
    //           { role: "ai", text: response.reply }
    //         ]);
    //         setIsTyping(true);
    //       }
    //     } catch (err) {
    //       console.error(err);
    //     } finally {
    //       setIsLoading(false);
    //     }
    //   };

    const handleImageGenerate = async () => {
      if (!input.trim() || isLoading || !chatId) return;
    
      const prompt = input;
    
      setMessages(prev => [
        ...prev,
        { role: "user", text: prompt }
      ]);
    
      setInput("");
      setIsLoading(true);
    
      try {
    
        const res = await generateImageApi({prompt})
    
        setMessages(prev => [
          ...prev,
          {
            role: "assistant",
            image: res.imageURL,
            text: "Generated Image"
          }
        ]);
    
      } catch (err) {
        console.error(err);
    
        setMessages(prev => [
          ...prev,
          {
            role: "assistant",
            text: "Failed to generate image"
          }
        ]);
      }
    
      setIsLoading(false);
    };


    const handleRegenerate = async () => {
      if (isLoading || !chatId) return;
    
      const lastUserMessage = [...messages]
        .reverse()
        .find(m => m.role === "user");
    
      if (!lastUserMessage) return;
    
      setIsLoading(true);
    
      try {
        const res = await sendMessageApi({
          chatId,
          message: lastUserMessage.text,
         
        });
    
        if (res?.reply) {
          setMessages(prev => [
            ...prev,
            { role: "assistant", text: res.reply }
          ]);
          setIsTyping(true);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    return (

      <div  className="h-screen w-full flex bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
         <aside className="w-72 bg-indigo-200 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col transition-colors">
         <div className="p-4 border-b flex flex-col gap-2 border-gray-200">
  <button
    onClick={async () => {
      const chat = await createNewChatApi();
      setChatId(chat.chatData._id);
      setMessages([]);
      fetchChats()
      localStorage.setItem("verity_chat_id", chat.chatData._id);
    }}
    className="w-full text-start px-2 bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition"
  >
    + New Chat
  </button>
  <button
  onClick={handleImageGenerate}
  disabled={isLoading || !input.trim()}
  className="bg-green-500 font-medium text-white p-2 rounded-lg disabled:bg-gray-200"
>
  Generate image
</button>

</div>
<div className="flex-1 overflow-y-auto p-2 my-5 space-y-2">
<h3 className="text-xs font-bold text-gray-500 px-2 mt-4">Chats</h3>

{chats.map((chat) => (
  <div
    key={chat._id}
    onClick={() => {
      setChatId(chat._id);
      localStorage.setItem("verity_chat_id", chat._id);
    }}
    className={`group flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition
      ${chatId === chat._id
        ? "bg-indigo-100 text-indigo-700"
        : "hover:bg-gray-100 text-gray-700"
      }`}
  >
    <span className="truncate text-sm">
      {chat.title || "Untitled Chat"}
    </span>

    <button
      onClick={(e) => {
        e.stopPropagation();
        deleteChat(chat._id);
      }}
      className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition"
    >
      <Trash2 size={14} />
    </button>
  </div>
))}
</div>
<div className='py-5 text-center font-thin '>

  <p className='text-sm text-indigo-500'> © All rights are reserved by Anugrah</p>
</div>
  </aside>
        <div className="flex-1 relative overflow-hidden">
            {/* <div className='absolute inset-0 -z-10'>
  <LiquidEther
    colors={[ '#5227FF', '#FF9FFC', '#B19EEF' ]}
    mouseForce={20}
    cursorSize={100}
    isViscous
    viscous={30}
    iterationsViscous={32}
    iterationsPoisson={32}
    resolution={0.5}
    isBounce={false}
    autoDemo
    autoSpeed={0.5}
    autoIntensity={2.2}
    takeoverDuration={0.25}
    autoResumeDelay={3000}
    autoRampDuration={0.6}
    color0="#5227FF"
    color1="#FF9FFC"
    color2="#B19EEF"
/>
</div> */}
            {/* Header logic fixed */}

            <div className='relative  z-10 flex flex-col h-screen'>
                  <header className="flex items-center justify-between px-6 py-4 shadow-sm sticky top-0 z-10 bg-white dark:bg-gray-900 transition-colors">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600">
                        <ArrowLeft size={20} />
                    </button>
                    <div className="flex items-center gap-3">
                        <div className="bg-indigo-500  p-2 rounded-xl text-white shadow-md">
                            {/* <Bot size={24} /> */}
                            {/* <img class src={verityGIF} alt="" /> */}
                        </div>
                        <div>
                            <h1 className="text-lg font-bold text-gray-800 dark:text-gray-300 tracking-tight">Verity AI</h1>
                            <span className="flex items-center gap-1.5 text-[11px] text-green-500 font-semibold uppercase">
                                
                            </span>
                        </div>
                    </div>
                </div>

                <button
  onClick={() => setDarkMode(prev => !prev)}
  className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 transition"
>
  {darkMode ? <Moon color='white'/> : <Sun/>}
</button>

                {/* Clear chat function fix */}
                
            </header>

            <main
  ref={chatContainerRef}
  onScroll={() => {
    const el = chatContainerRef.current;
    if (!el) return;

    const isNearBottom =
      el.scrollHeight - el.scrollTop - el.clientHeight < 150;

    setShowScrollButton(!isNearBottom);
  }}
  className="flex-1  overflow-y-auto px-4 py-15 md:px-20 lg:px-72 scrollbar-hide"
>
{messages.length === 0 && (
  <div className="  h-full flex text-4xl font-semibold  justify-center items-center text-gray-400 ">
    What's on your mind?
  </div>
)}

    <div className=" space-y-20">
      
        {messages.map((m, index) => {
            const isLastMessage = index === messages.length - 1;
            const showAnimation = isLastMessage && m.role === 'assistant' && isTyping;

            return (
                <div key={index} className={`flex w-full ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`flex max-w-[85%] gap-4 ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                        <div className={`h-9 w-9 rounded-full flex items-center justify-center shrink-0 shadow-sm ${
                           m.role === 'user'
                           ? 'bg-indigo-600 text-white'
                           : 'bg-white dark:bg-gray-700 border  dark:border-gray-600 text-indigo-500'
                        }`}>
                            {m.role === 'user' ? <User size={18} /> : <Bot size={18} />}
                        </div>

                        <div className='relative group'>
                        <div className={`p-4 text-[15px] leading-relaxed shadow-sm ${
                            m.role === 'user' 
                            ? 'bg-indigo-600 text-white rounded-2xl rounded-tr-none' 
                            : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-white rounded-2xl rounded-tl-none'
                        }`}>
                           <div className={`prose prose-sm max-w-none break-words ${m.role === 'user' ? 'text-white' : 'text-gray-700 dark:text-indigo-500'}`}>
  {/* If there is an image, show it. If not, proceed to text logic */}
  {m.image ? (
    <div className="mt-2">
      <img
        src={m.image}
        alt="AI Generated"
        className="rounded-lg w-full max-w-md shadow-lg border border-gray-200 dark:border-gray-700"
      />
      <a
        href={m.image}
        target="_blank"
        rel="noreferrer"
        className="text-xs text-indigo-400 hover:underline mt-2 block"
      >
        Open full size
      </a>
    </div>
  ) : (
    /* This nested ternary handles the text vs animation */
    showAnimation ? (
      <TypeWriter
        text={m.text}
        speed={10}
        onFinished={() => setIsTyping(false)}
      />
    ) : (
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            const codeString = String(children).replace(/\n$/, '');

            if (!inline && match) {
              return (
                <div className="rounded-lg overflow-hidden my-4 shadow-md relative group">
                  <div className="bg-gray-800 text-gray-400 text-xs px-4 py-2 flex justify-between items-center">
                    <span>{match[1]}</span>
                    <button
                      onClick={() => navigator.clipboard.writeText(codeString)}
                      className="text-gray-400 hover:text-white transition opacity-0 group-hover:opacity-100"
                    >
                      Copy
                    </button>
                  </div>
                  <SyntaxHighlighter
                    style={materialDark}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  >
                    {codeString}
                  </SyntaxHighlighter>
                </div>
              );
            }
            return (
              <code className="bg-gray-200 text-pink-600 px-1 rounded font-bold" {...props}>
                {children}
              </code>
            );
          },
          strong({ children }) {
            return <strong className="text-orange-600 font-extrabold">{children}</strong>;
          }
        }}
      >
        {m.text}
      </ReactMarkdown>
    )
  )}
</div>
                        </div>
                        {m.role === "assistant" && (
  <div className="absolute -top-8 right-2 opacity-0 group-hover:opacity-100 transition flex gap-2 bg-white border border-gray-400 rounded-lg px-2 py-1 shadow-sm">
    
    {/* Copy Button */}
    <button
      onClick={() => {
        navigator.clipboard.writeText(m.text)
        toast.info("Copied")
      }}
      className="text-gray-500 hover:text-indigo-600 transition"
    >
      <Copy size={14} />
    </button>

    {/* Regenerate Button */}
    <button
      onClick={handleRegenerate}
      className="text-gray-500 hover:text-indigo-600 transition"
    >
      <RotateCcw size={14} />
    </button>

  </div>
)}
                        </div>
                    </div>
                </div>
            );
        })}
        
        {isLoading && (
            <div className="flex justify-start gap-4 animate-pulse">
               {/* Your existing loading dots */}
               <div className="bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 p-4 rounded-2xl flex gap-1">
                    <span className="h-1.5 w-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                    <span className="h-1.5 w-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="h-1.5 w-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </div>
            </div>
        )}
        <div ref={scrollRef} />
    </div>
    {showScrollButton && (
  <button
    onClick={() =>
      scrollRef.current?.scrollIntoView({ behavior: "smooth" })
    }
    className="fixed bottom-30 right-20 bg-indigo-600 text-white px-4  py-2 rounded-full shadow-lg hover:scale-110 transition"
  >
    ↓
  </button>
)}
</main>

            <footer className="p-4 pb-10 md:px-20 lg:px-64">
                <div className="max-w-4xl mx-auto flex items-center gap-3 
bg-white dark:bg-gray-800 backdrop-blur-md
border border-gray-400 dark:border-gray-700
px-4 py-2 rounded-full 
transition-all shadow-lg">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Ask Verity..."
                        className="flex-1 bg-transparent outline-none px-7 py-3 text-gray-800 dark:text-gray-200"
                    />
                    <button onClick={handleSend} disabled={isLoading || !input.trim()} className="bg-indigo-500 text-white p-3 rounded-3xl disabled:bg-gray-200">
                        <Send size={18} />
                    </button>
                </div>
            </footer>
        </div>
            </div>
      </div>
        

          
    );
};

export default VerityChatPage;
