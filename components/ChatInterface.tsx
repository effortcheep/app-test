import React, { useState, useEffect, useRef } from 'react';
import { Character, Message } from '../types';
import { Icons } from './ui/Icon';
import { sendMessageStream, analyzeEmotion, suggestTopics } from '../services/geminiService';
import { EMOTION_LABELS } from '../constants';

interface ChatInterfaceProps {
  character: Character;
  onBack: () => void;
  userAvatar?: string;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ character, onBack, userAvatar }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentEmotion, setCurrentEmotion] = useState('Neutral');
  const [suggestedTopics, setSuggestedTopics] = useState<string[]>([]);
  const [showTopics, setShowTopics] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (messages.length === 0) {
       const greeting: Message = {
           id: 'init',
           role: 'model',
           text: `你好！我是${character.name}。我在这里倾听，你今天感觉怎么样？`,
           timestamp: Date.now()
       };
       setMessages([greeting]);
    }
  }, [character.name, messages.length]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: inputText,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);
    setShowTopics(false);

    if (textAreaRef.current) textAreaRef.current.style.height = 'auto';

    try {
        const emotionPromise = analyzeEmotion(userMsg.text);
        let fullResponse = '';
        const stream = sendMessageStream(userMsg.text);

        const aiMsgId = (Date.now() + 1).toString();
        setMessages(prev => [...prev, {
            id: aiMsgId,
            role: 'model',
            text: '',
            timestamp: Date.now()
        }]);

        for await (const chunk of stream) {
            fullResponse += chunk;
            setMessages(prev => prev.map(m => m.id === aiMsgId ? { ...m, text: fullResponse } : m));
        }

        const detectedEmotion = await emotionPromise;
        setCurrentEmotion(detectedEmotion);

        // Show topics for negative emotions
        if (['Sadness', 'Anxiety', 'Anger', 'Tired'].includes(detectedEmotion)) {
            const topics = await suggestTopics(detectedEmotion);
            setSuggestedTopics(topics);
            setShowTopics(true);
        }

    } catch (error) {
        console.error("Chat error", error);
        setMessages(prev => [...prev, {
            id: 'err_' + Date.now(),
            role: 'model',
            text: "错误：连接中断 (ERR_CONNECTION_LOST)。请重试传输。",
            timestamp: Date.now()
        }]);
    } finally {
        setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleAutoResize = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setInputText(e.target.value);
      e.target.style.height = 'auto';
      e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
  };

  const getEmotionColor = (emotion: string) => {
      switch(emotion) {
          case 'Joy': return 'bg-yellow-400 text-black border-yellow-600';
          case 'Sadness': return 'bg-blue-400 text-black border-blue-600';
          case 'Anger': return 'bg-red-500 text-white border-red-700';
          case 'Anxiety': return 'bg-purple-400 text-black border-purple-600';
          default: return 'bg-retro-grey/30 text-retro-dark border-retro-grey';
      }
  };

  return (
    <div className="flex flex-col h-full bg-retro-cream relative">
      {/* Header */}
      <header className="px-4 py-3 bg-retro-paper border-b-2 border-retro-dark flex items-center justify-between sticky top-0 z-20 shadow-hard-sm">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-1 border border-retro-dark bg-white hover:bg-retro-dark hover:text-white transition-colors">
            <Icons.ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
             <div className="relative">
                <img src={character.avatar} alt="char" className="w-10 h-10 border-2 border-retro-dark object-cover grayscale" />
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-retro-green border border-retro-dark animate-pulse"></div>
             </div>
             <div>
               <h3 className="font-bold font-sans text-retro-dark text-sm uppercase tracking-wide leading-none">{character.name}</h3>
               <div className="flex items-center gap-1 mt-1">
                 <span className="text-[8px] font-mono text-retro-grey">状态 (STATUS):</span>
                 <div className={`text-[8px] px-1 font-mono font-bold border ${getEmotionColor(currentEmotion)} uppercase`}>
                    {EMOTION_LABELS[currentEmotion] || currentEmotion}
                 </div>
               </div>
             </div>
          </div>
        </div>
        <button className="text-retro-dark border-l-2 border-retro-grey pl-3">
            <Icons.MoreVertical className="w-5 h-5" />
        </button>
      </header>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 pb-32 bg-grid-pattern bg-[length:40px_40px]">
        {messages.map((msg) => {
            const isUser = msg.role === 'user';
            return (
                <div key={msg.id} className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'}`}>
                    {!isUser && (
                        <div className="mr-3 self-end text-xs font-mono text-retro-grey/50 mb-4 vertical-rl">AI_RESP</div>
                    )}
                    <div className={`max-w-[85%] relative group ${isUser ? 'items-end flex flex-col' : ''}`}>
                        {/* Bubble */}
                        <div className={`px-5 py-4 text-sm font-sans leading-relaxed border-2 border-retro-dark shadow-hard ${
                            isUser
                            ? 'bg-retro-orange text-white'
                            : 'bg-white text-retro-dark'
                        }`}>
                            {msg.text}
                        </div>
                        {/* Timestamp style decoration */}
                        <div className="mt-1 text-[9px] font-mono text-retro-grey uppercase">
                            T-{Math.floor(msg.timestamp / 1000).toString().slice(-4)} // {isUser ? 'TX' : 'RX'}
                        </div>
                    </div>
                </div>
            );
        })}
        {isLoading && (
            <div className="flex w-full justify-start items-end">
                 <div className="mr-3 text-xs font-mono text-retro-grey/50 mb-2">处理中...</div>
                 <div className="bg-white px-4 py-3 border-2 border-retro-dark shadow-hard flex gap-1 items-center h-10">
                    <div className="w-2 h-2 bg-retro-dark animate-pulse"></div>
                    <div className="w-2 h-2 bg-retro-dark animate-pulse delay-75"></div>
                    <div className="w-2 h-2 bg-retro-dark animate-pulse delay-150"></div>
                 </div>
            </div>
        )}

        {/* Suggested Topics */}
        {showTopics && !isLoading && suggestedTopics.length > 0 && (
             <div className="flex flex-col items-center gap-3 mt-6 border-t-2 border-dashed border-retro-grey/30 pt-4">
                 <p className="text-[10px] font-mono text-retro-grey uppercase tracking-widest bg-retro-cream px-2 -mt-7">建议协议 (SUGGESTION_PROTOCOL)</p>
                 <div className="flex flex-wrap justify-center gap-3">
                     {suggestedTopics.map((topic, i) => (
                         <button
                            key={i}
                            onClick={() => { setInputText(topic); setShowTopics(false); }}
                            className="text-xs font-sans bg-retro-paper border-2 border-retro-dark text-retro-dark px-3 py-2 hover:bg-retro-mustard hover:shadow-hard-sm transition-all"
                         >
                            {`> ${topic}`}
                         </button>
                     ))}
                 </div>
             </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="fixed bottom-0 left-0 right-0 p-4 pb-safe bg-retro-paper border-t-2 border-retro-dark z-20 md:max-w-md md:mx-auto">
        <div className="flex items-end gap-0 bg-white border-2 border-retro-dark shadow-hard">
          <button className="p-3 text-retro-grey hover:text-retro-dark border-r-2 border-retro-dark bg-retro-cream/50">
            <Icons.Smile className="w-5 h-5" />
          </button>
          <textarea
            ref={textAreaRef}
            value={inputText}
            onChange={handleAutoResize}
            onKeyDown={handleKeyDown}
            placeholder="输入指令..."
            rows={1}
            className="flex-1 bg-transparent border-none focus:ring-0 text-sm font-sans text-retro-dark resize-none max-h-32 py-3 px-3 placeholder:text-retro-grey/50"
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputText.trim() || isLoading}
            className={`p-3 border-l-2 border-retro-dark transition-all uppercase font-bold text-xs tracking-wider ${
                inputText.trim() && !isLoading
                ? 'bg-retro-orange text-white hover:bg-retro-dark'
                : 'bg-gray-100 text-gray-300'
            }`}
          >
            发送
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;