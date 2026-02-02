import React from 'react';
import { Character } from '../types';
import { Icons } from './ui/Icon';

interface CharacterListProps {
  characters: Character[];
  onSelectCharacter: (char: Character) => void;
  onAddNew: () => void;
  onEdit: (char: Character) => void;
  onDelete: (id: string) => void;
}

const CharacterList: React.FC<CharacterListProps> = ({ characters, onSelectCharacter, onAddNew, onEdit, onDelete }) => {
  return (
    <div className="flex flex-col h-full bg-retro-cream">
      {/* Tab 2 Header */}
      <header className="bg-retro-paper border-b-2 border-retro-dark px-6 py-6 sticky top-0 z-10 shadow-hard-sm">
        <div className="flex justify-between items-center">
          <div>
             <h1 className="text-xl font-sans font-bold text-retro-dark uppercase tracking-tighter">我的AI伙伴</h1>
             <p className="text-[10px] font-mono text-retro-orange mt-1">{`> 数据库访问授权 GRANTED`}</p>
          </div>
          <button
            onClick={onAddNew}
            className="bg-retro-orange text-white border-2 border-retro-dark p-2 hover:bg-retro-dark transition-colors shadow-hard-sm active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
          >
             <Icons.Plus className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Grid Area */}
      <div className="flex-1 overflow-y-auto p-4 bg-grid-pattern bg-[length:40px_40px]">
        <div className="grid grid-cols-2 gap-4 pb-24">
            {/* Guide Card */}
            <div className="col-span-2 bg-retro-mustard/20 border-2 border-dashed border-retro-dark p-4 rounded-sm flex items-center gap-3">
                <div className="bg-retro-dark text-white p-2 rounded-full">
                    <Icons.MessageCircle className="w-5 h-5" />
                </div>
                <div>
                    <h3 className="text-xs font-bold font-sans uppercase">快速开始 (Quick Start)</h3>
                    <p className="text-[10px] font-mono text-retro-dark/70">选择一个单元以初始化会话。</p>
                </div>
            </div>

            {characters.map((char) => (
            <div key={char.id} className="relative bg-white border-2 border-retro-dark flex flex-col shadow-hard hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-hard-lg transition-all group cursor-pointer" onClick={() => onSelectCharacter(char)}>

                {/* Active Indicator Mock */}
                <div className="absolute top-2 right-2 w-2 h-2 bg-retro-green rounded-full border border-retro-dark animate-pulse"></div>

                {/* Avatar Section */}
                <div className="w-full aspect-square border-b-2 border-retro-dark overflow-hidden relative bg-retro-cream">
                    <img src={char.avatar} alt={char.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 filter grayscale group-hover:grayscale-0" />
                    <div className="absolute bottom-0 left-0 bg-retro-dark text-white text-[10px] font-mono px-2 py-0.5">
                        {char.gender === 'Female' ? 'F-型' : char.gender === 'Male' ? 'M-型' : 'N-型'}
                    </div>
                </div>

                {/* Info Section */}
                <div className="p-3 flex flex-col flex-1">
                    <h3 className="text-sm font-bold font-sans text-retro-dark uppercase truncate">{char.name}</h3>
                    <span className="text-[9px] font-mono bg-retro-cream border border-retro-dark px-1 w-max my-1 text-retro-grey truncate max-w-full">{char.role}</span>

                    <div className="mt-auto pt-2 border-t border-dotted border-retro-grey flex justify-between items-end">
                        <span className="text-[9px] font-mono text-retro-orange">运行: {char.usageCount || 0}</span>
                        <div className="flex gap-2">
                             <button onClick={(e) => {e.stopPropagation(); onEdit(char);}} className="text-retro-grey hover:text-retro-dark">
                                <Icons.Edit className="w-3 h-3" />
                             </button>
                             <button onClick={(e) => {e.stopPropagation(); onDelete(char.id);}} className="text-retro-grey hover:text-red-600">
                                <Icons.Trash className="w-3 h-3" />
                             </button>
                        </div>
                    </div>
                </div>
            </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CharacterList;