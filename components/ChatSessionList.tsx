import React from 'react';
import { Character } from '../types';
import { Icons } from './ui/Icon';

interface ChatSessionListProps {
  characters: Character[]; // In a real app, this would be sessions
  onSelectCharacter: (char: Character) => void;
  onNewChat: () => void;
}

const ChatSessionList: React.FC<ChatSessionListProps> = ({ characters, onSelectCharacter, onNewChat }) => {
  // Mocking sessions based on characters for now
  const recentChats = characters.slice(0, 3); 

  return (
    <div className="flex flex-col h-full bg-retro-cream">
      <header className="bg-retro-paper border-b-2 border-retro-dark px-6 py-6 sticky top-0 z-10 shadow-hard-sm">
        <h1 className="text-xl font-sans font-bold text-retro-dark uppercase tracking-tighter">对话记录 (LOGS)</h1>
        <div className="mt-4 relative">
             <input 
                type="text" 
                placeholder="搜索通讯记录..." 
                className="w-full pl-9 pr-3 py-2 bg-white border-2 border-retro-dark font-mono text-xs focus:outline-none focus:shadow-hard-sm"
            />
            <Icons.Search className="w-4 h-4 text-retro-grey absolute left-2 top-2.5" />
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-0 bg-grid-pattern bg-[length:40px_40px]">
         {recentChats.length > 0 ? (
             <div className="divide-y-2 divide-retro-dark/10">
                 {recentChats.map(char => (
                     <div 
                        key={char.id} 
                        onClick={() => onSelectCharacter(char)}
                        className="bg-white p-4 flex items-center gap-4 hover:bg-retro-mustard/10 transition-colors cursor-pointer group"
                     >
                         <div className="relative">
                            <img src={char.avatar} className="w-12 h-12 border-2 border-retro-dark object-cover" />
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-retro-orange border border-retro-dark rounded-full"></div>
                         </div>
                         <div className="flex-1 min-w-0">
                             <div className="flex justify-between items-baseline mb-1">
                                 <h3 className="font-bold font-sans text-retro-dark uppercase">{char.name}</h3>
                                 <span className="text-[10px] font-mono text-retro-grey">14:20</span>
                             </div>
                             <p className="text-xs font-mono text-retro-grey truncate">好的，我会一直陪着你的。不要担心...</p>
                         </div>
                         <Icons.ChevronRight className="w-4 h-4 text-retro-grey group-hover:text-retro-dark" />
                     </div>
                 ))}
             </div>
         ) : (
             <div className="flex flex-col items-center justify-center h-64 text-center p-6">
                 <div className="w-16 h-16 border-2 border-dashed border-retro-grey flex items-center justify-center mb-4">
                     <Icons.MessageCircle className="w-8 h-8 text-retro-grey" />
                 </div>
                 <p className="text-sm font-mono text-retro-grey">暂无通讯记录</p>
             </div>
         )}
      </div>

      <button 
        onClick={onNewChat}
        className="absolute bottom-24 right-6 w-14 h-14 bg-retro-orange border-2 border-retro-dark shadow-hard flex items-center justify-center text-white hover:scale-110 transition-transform z-20"
      >
          <Icons.Plus className="w-8 h-8" />
      </button>
    </div>
  );
};

export default ChatSessionList;