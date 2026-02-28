import React, { useState, useEffect, useRef } from 'react';
import { Send, User, Bot, ArrowLeft, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { askVerityApi } from '../services/verity.services';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'; // VS Code Dark Theme
import TypeWriter from '../components/verity-components/TypeWriter';

const VerityChatPage = () => {
    const [input, setInput] = useState('');
    // 1. Consistency: 'messages' use karein msg ki jagah (aapke JSX mein yahi hai)
    const [messages, setMessages] = useState([
        { role: 'ai', text: "Hello! I am Verity AI. How can I assist you today?" }
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef(null);
    const navigate = useNavigate();
    const [isTyping, setIsTyping] = useState(false);

// Update handleSend: When AI replies, set isTyping to true
// ... inside handleSend, after response ...


    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isLoading]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;
    
        // 1. Create the new user message
        const userMsg = { role: 'user', text: input };
        
        // 2. Add it to the list immediately for the UI
        const updatedMessages = [...messages, userMsg];
        setMessages(updatedMessages);
        
        const currentInput = input;
        setInput('');
        setIsLoading(true);
    
        try {
            // 3. Prepare the FULL history to send to the backend
            // We map 'ai' to 'assistant' because that's what the AI API understands
            const chatHistory = updatedMessages
            .filter(m => m.text && m.text.trim() !== "")
            .map(m => ({
              role: m.role === 'ai' ? 'assistant' : 'user',
              content: m.text
            }));
    
            // 4. Send 'history' instead of just 'msg'
            const response = await askVerityApi({ history: chatHistory });

            if (response?.reply) {
                setMessages(prev => [...prev, { role: 'ai', text: response.reply }]);
                setIsTyping(true); // Start the animation
            }
    
            
        } catch (error) {
            console.error("Chat Error:", error);
            setMessages(prev => [...prev, { role: 'ai', text: "Server error! Please check your connection." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-screen bg-[#f9f9f9] font-sans">
            {/* Header logic fixed */}
            <header className="flex items-center justify-between px-6 py-4 bg-white border-b shadow-sm sticky top-0 z-10">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600">
                        <ArrowLeft size={20} />
                    </button>
                    <div className="flex items-center gap-3">
                        <div className="bg-indigo-500 p-2 rounded-xl text-white shadow-md">
                            <Bot size={24} />
                        </div>
                        <div>
                            <h1 className="text-lg font-bold text-gray-800 tracking-tight">Verity AI</h1>
                            <span className="flex items-center gap-1.5 text-[11px] text-green-500 font-semibold uppercase">
                                
                            </span>
                        </div>
                    </div>
                </div>
                {/* Clear chat function fix */}
                <button 
                    onClick={() => setMessages([{ role: 'ai', text: "Chat cleared. How can I help?" }])}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                >
                    <Trash2 size={20} />
                </button>
            </header>

            <main className="flex-1 overflow-y-auto px-4 py-8 md:px-20 lg:px-64 scrollbar-hide">
    <div className="space-y-8">
        {messages.map((m, index) => {
            const isLastMessage = index === messages.length - 1;
            const showAnimation = isLastMessage && m.role === 'ai' && isTyping;

            return (
                <div key={index} className={`flex w-full ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`flex max-w-[85%] gap-4 ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                        <div className={`h-9 w-9 rounded-full flex items-center justify-center shrink-0 shadow-sm ${
                            m.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-white border text-indigo-500'
                        }`}>
                            {m.role === 'user' ? <User size={18} /> : <Bot size={18} />}
                        </div>

                        <div className={`p-4 text-[15px] leading-relaxed shadow-sm ${
                            m.role === 'user' 
                            ? 'bg-indigo-600 text-white rounded-2xl rounded-tr-none' 
                            : 'bg-white border border-gray-200 text-gray-700 rounded-2xl rounded-tl-none'
                        }`}>
                            <div className={`prose prose-sm max-w-none break-words ${m.role === 'user' ? 'text-white' : 'text-gray-700'}`}>
                                {showAnimation ? (
                                    /* Show TypeWriter for the animation */
                                    <TypeWriter 
                                        text={m.text} 
                                        speed={10} 
                                        onFinished={() => setIsTyping(false)} 
                                    />
                                ) : (
                                    /* Show Markdown once typing is done or for old messages */
                                    <ReactMarkdown
                                        remarkPlugins={[remarkGfm]}
                                        components={{
                                            code({ node, inline, className, children, ...props }) {
                                                const match = /language-(\w+)/.exec(className || '');
                                                return !inline && match ? (
                                                    <div className="rounded-lg overflow-hidden my-4 shadow-md">
                                                        <div className="bg-gray-800 text-gray-400 text-xs px-4 py-1 flex justify-between items-center">
                                                            <span>{match[1]}</span>
                                                        </div>
                                                        <SyntaxHighlighter
                                                            style={vscDarkPlus}
                                                            language={match[1]}
                                                            PreTag="div"
                                                            {...props}
                                                        >
                                                            {String(children).replace(/\n$/, '')}
                                                        </SyntaxHighlighter>
                                                    </div>
                                                ) : (
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
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            );
        })}
        
        {isLoading && (
            <div className="flex justify-start gap-4 animate-pulse">
               {/* Your existing loading dots */}
               <div className="bg-white border p-4 rounded-2xl flex gap-1">
                    <span className="h-1.5 w-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                    <span className="h-1.5 w-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="h-1.5 w-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </div>
            </div>
        )}
        <div ref={scrollRef} />
    </div>
</main>

            <footer className="p-4 bg-white border-t md:px-20 lg:px-64">
                <div className="max-w-4xl mx-auto flex items-center gap-3 bg-gray-100 p-1.5 rounded-2xl border focus-within:border-indigo-300 transition-all shadow-sm">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Message Verity..."
                        className="flex-1 bg-transparent outline-none px-4 py-3"
                    />
                    <button onClick={handleSend} disabled={isLoading || !input.trim()} className="bg-indigo-500 text-white p-3 rounded-xl disabled:bg-gray-200">
                        <Send size={18} />
                    </button>
                </div>
            </footer>
        </div>
    );
};

export default VerityChatPage;
