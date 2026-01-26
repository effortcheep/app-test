import React, { useState } from 'react';
import { Topic } from '../types';
import { MOCK_TOPICS, CATEGORY_LABELS } from '../constants';
import { Icons } from './ui/Icon';

interface TopicListProps {
    onSelect?: (topic: Topic) => void;
}

const TopicList: React.FC<TopicListProps> = ({ onSelect }) => {
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [topics, setTopics] = useState<Topic[]>(MOCK_TOPICS);

    const categories = ['All', 'Emotional', 'Life', 'Career', 'Study'];

    const filteredTopics = selectedCategory === 'All' 
        ? topics 
        : topics.filter(t => t.category === selectedCategory);

    const toggleSave = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setTopics(prev => prev.map(t => t.id === id ? {...t, isSaved: !t.isSaved} : t));
    };

    return (
        <div className="flex flex-col h-full bg-retro-cream">
            <header className="bg-retro-paper border-b-2 border-retro-dark px-6 py-6 sticky top-0 z-10 shadow-hard-sm">
                <div className="flex flex-col gap-4">
                    <h1 className="text-xl font-sans font-bold text-retro-dark uppercase tracking-tighter">治愈话题库</h1>
                    <div className="flex gap-2">
                        <div className="flex-1 relative">
                            <input type="text" placeholder="搜索数据库..." className="w-full pl-8 pr-3 py-2 bg-white border-2 border-retro-dark font-mono text-xs focus:outline-none focus:shadow-hard-sm" />
                            <Icons.Search className="w-4 h-4 text-retro-grey absolute left-2 top-2.5" />
                        </div>
                        <button className="bg-retro-mustard border-2 border-retro-dark p-2 hover:bg-retro-orange transition-colors shadow-hard-sm">
                            <Icons.Filter className="w-4 h-4 text-retro-dark" />
                        </button>
                    </div>
                </div>
            </header>

            <div className="flex-1 overflow-y-auto p-4 bg-grid-pattern bg-[length:20px_20px]">
                {/* Current Emotion Card */}
                <div className="bg-retro-dark p-4 shadow-hard-lg mb-6 relative overflow-hidden group">
                     <div className="absolute top-0 right-0 p-4 opacity-20"><Icons.Heart className="w-24 h-24 text-retro-orange transform rotate-12" /></div>
                     <h2 className="text-retro-cream font-mono text-xs uppercase mb-1">检测到当前情绪</h2>
                     <div className="text-3xl font-sans font-bold text-retro-orange uppercase tracking-widest mb-2">焦虑</div>
                     <p className="text-retro-grey font-mono text-xs max-w-[70%]">系统建议：执行平静协议，进行接地练习。</p>
                     <button className="mt-3 bg-retro-cream text-retro-dark border-2 border-transparent hover:border-retro-orange px-3 py-1 font-mono text-[10px] font-bold uppercase">查看建议</button>
                </div>

                <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar">
                    {categories.map(cat => (
                        <button 
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-3 py-1 border-2 border-retro-dark font-mono text-[10px] font-bold uppercase whitespace-nowrap transition-all ${selectedCategory === cat ? 'bg-retro-orange text-white shadow-hard-sm' : 'bg-white text-retro-dark hover:bg-retro-mustard'}`}
                        >
                            {CATEGORY_LABELS[cat] || cat}
                        </button>
                    ))}
                </div>

                <div className="space-y-4">
                    {filteredTopics.map(topic => (
                        <div key={topic.id} onClick={() => onSelect && onSelect(topic)} className="bg-white border-2 border-retro-dark p-4 shadow-hard relative cursor-pointer hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-hard-lg transition-all">
                            <div className="absolute top-1/2 -left-2 w-4 h-4 bg-retro-cream border-r-2 border-retro-dark rounded-full"></div>
                            <div className="flex justify-between items-start pl-2">
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
                                <button onClick={(e) => toggleSave(topic.id, e)} className="text-retro-orange hover:scale-110 transition-transform">
                                    <Icons.Heart className={`w-5 h-5 ${topic.isSaved ? 'fill-current' : ''}`} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TopicList;