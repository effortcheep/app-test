import React, { useState } from 'react';
import { Topic } from '../types';
import { Icons } from './ui/Icon';
import { MOCK_TOPICS, CATEGORY_LABELS } from '../constants';

interface FavoritesScreenProps {
    onBack: () => void;
    onSelect: (topic: Topic) => void;
}

const FavoritesScreen: React.FC<FavoritesScreenProps> = ({ onBack, onSelect }) => {
    // In a real app, this would filter based on actual saved state
    // For visual demo, we just assume the first 2 mock topics are saved or use existing 'isSaved' flag logic mock
    const [savedTopics, setSavedTopics] = useState<Topic[]>(MOCK_TOPICS.map((t, i) => i < 2 ? { ...t, isSaved: true } : t).filter(t => t.isSaved));

    const removeFavorite = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setSavedTopics(prev => prev.filter(t => t.id !== id));
    };

    return (
        <div className="flex flex-col h-full bg-retro-cream">
            <header className="px-4 py-4 border-b-2 border-retro-dark bg-retro-paper flex items-center gap-3 sticky top-0 z-10 shadow-hard-sm">
                <button onClick={onBack} className="p-1 -ml-1 hover:bg-retro-dark hover:text-white transition-colors rounded-sm">
                    <Icons.ChevronLeft className="w-6 h-6" />
                </button>
                <h1 className="text-lg font-bold font-sans uppercase">我的收藏 (SAVED)</h1>
            </header>

            <div className="flex-1 overflow-y-auto p-4 bg-grid-pattern bg-[length:40px_40px]">
                {savedTopics.length > 0 ? (
                    <div className="space-y-4">
                        {savedTopics.map(topic => (
                            <div key={topic.id} onClick={() => onSelect(topic)} className="bg-white border-2 border-retro-dark p-4 shadow-hard relative cursor-pointer hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-hard-lg transition-all group">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <div className="flex gap-2 mb-1">
                                            <span className="text-[9px] font-mono bg-retro-mustard/30 px-1 border border-retro-dark text-retro-dark uppercase">{CATEGORY_LABELS[topic.category]}</span>
                                            {topic.emotionTags.map(tag => (
                                                <span key={tag} className="text-[9px] font-mono bg-retro-grey/10 px-1 border border-retro-grey text-retro-grey uppercase">{tag}</span>
                                            ))}
                                        </div>
                                        <h3 className="text-sm font-bold font-sans text-retro-dark uppercase">{topic.title}</h3>
                                        <p className="text-xs font-mono text-retro-grey mt-1 leading-relaxed">{topic.description}</p>
                                    </div>
                                    <button onClick={(e) => removeFavorite(topic.id, e)} className="text-retro-orange hover:text-retro-dark p-1">
                                        <Icons.Heart className="w-5 h-5 fill-current" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-64 text-center">
                        <div className="w-16 h-16 border-2 border-dashed border-retro-grey flex items-center justify-center mb-4 rounded-full">
                            <Icons.Heart className="w-8 h-8 text-retro-grey" />
                        </div>
                        <p className="text-sm font-mono text-retro-grey mb-2">暂无收藏内容</p>
                        <button onClick={onBack} className="text-xs font-bold text-retro-dark underline">去话题库看看</button>
                    </div>
                )}
                 <div className="h-24 pb-safe"></div>
            </div>
        </div>
    );
};

export default FavoritesScreen;