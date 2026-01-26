import React from 'react';
import { Character } from '../types';
import { Icons } from './ui/Icon';

interface CharacterDetailProps {
  character: Character;
  onBack: () => void;
  onStartChat: (char: Character) => void;
  onEdit: (char: Character) => void;
  onDelete: (id: string) => void;
}

const CharacterDetail: React.FC<CharacterDetailProps> = ({ character, onBack, onStartChat, onEdit, onDelete }) => {
  return (
    <div className="flex flex-col h-full bg-retro-cream relative">
      <div className="absolute top-0 w-full h-48 bg-retro-mustard/20 -z-0"></div>
      
      {/* Header */}
      <header className="px-4 py-4 flex justify-between items-center z-10">
         <button onClick={onBack} className="p-2 bg-white border-2 border-retro-dark shadow-hard-sm hover:translate-y-1 hover:shadow-none transition-all">
             <Icons.ChevronLeft className="w-5 h-5" />
         </button>
         <div className="relative group">
             <button className="p-2 bg-white border-2 border-retro-dark shadow-hard-sm hover:translate-y-1 hover:shadow-none transition-all">
                 <Icons.MoreVertical className="w-5 h-5" />
             </button>
             {/* Dropdown Menu Mock */}
             <div className="absolute right-0 top-12 bg-white border-2 border-retro-dark shadow-hard hidden group-hover:block w-32">
                 <button onClick={() => onEdit(character)} className="w-full text-left px-4 py-2 hover:bg-retro-cream font-mono text-xs flex gap-2 items-center"><Icons.Edit className="w-3 h-3"/> 编辑</button>
                 <button onClick={() => onDelete(character.id)} className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 font-mono text-xs flex gap-2 items-center"><Icons.Trash className="w-3 h-3"/> 删除</button>
             </div>
         </div>
      </header>

      <div className="flex-1 overflow-y-auto px-6 pt-4 pb-24 z-10">
          {/* Hero Card */}
          <div className="bg-white border-2 border-retro-dark p-6 shadow-hard mb-6 relative">
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 border-2 border-retro-dark bg-white p-1 shadow-hard-sm rotate-3">
                  <img src={character.avatar} className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all" />
              </div>
              
              <div className="mt-12 text-center">
                  <h1 className="text-2xl font-bold font-sans uppercase tracking-tight">{character.name}</h1>
                  <p className="text-xs font-mono text-retro-grey mt-1">{character.gender} // {character.age}</p>
                  <div className="flex justify-center gap-2 mt-3 flex-wrap">
                      <span className="bg-retro-orange text-white text-[10px] font-bold px-2 py-0.5 border border-retro-dark">{character.role}</span>
                      {character.specialties?.map(s => (
                          <span key={s} className="bg-retro-mustard/30 text-retro-dark text-[10px] font-mono px-2 py-0.5 border border-retro-dark">#{s}</span>
                      ))}
                  </div>
              </div>
          </div>

          {/* Info Sections */}
          <div className="space-y-6">
              <section>
                  <h3 className="text-xs font-bold font-sans uppercase mb-2 border-b-2 border-retro-dark inline-block">性格特征 (TRAITS)</h3>
                  <div className="bg-retro-paper border-2 border-retro-dark p-4 text-sm font-mono text-retro-dark leading-relaxed">
                      {character.personality}
                  </div>
              </section>

              <section>
                  <h3 className="text-xs font-bold font-sans uppercase mb-2 border-b-2 border-retro-dark inline-block">背景档案 (ARCHIVE)</h3>
                  <div className="bg-retro-paper border-2 border-retro-dark p-4 text-sm font-mono text-retro-dark leading-relaxed">
                      {character.background}
                  </div>
              </section>

              <section className="grid grid-cols-2 gap-4">
                  <div className="border-2 border-retro-dark p-3 bg-white text-center">
                      <div className="text-[10px] font-mono text-retro-grey uppercase">最后通讯</div>
                      <div className="font-bold text-sm">2小时前</div>
                  </div>
                  <div className="border-2 border-retro-dark p-3 bg-white text-center">
                      <div className="text-[10px] font-mono text-retro-grey uppercase">交互次数</div>
                      <div className="font-bold text-sm">{character.usageCount || 0}</div>
                  </div>
              </section>
          </div>
      </div>

      <div className="p-4 pb-safe bg-white border-t-2 border-retro-dark fixed bottom-0 w-full max-w-md z-20">
          <button 
            onClick={() => onStartChat(character)}
            className="w-full bg-retro-dark text-white font-bold font-sans uppercase py-4 text-sm shadow-hard hover:translate-y-1 hover:shadow-none transition-all flex items-center justify-center gap-2"
          >
              <Icons.MessageCircle className="w-5 h-5" /> 开始对话 (INITIALIZE)
          </button>
      </div>
    </div>
  );
};

export default CharacterDetail;