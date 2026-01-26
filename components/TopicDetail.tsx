import React from 'react';
import { Topic } from '../types';
import { Icons } from './ui/Icon';

interface TopicDetailProps {
  topic: Topic;
  onBack: () => void;
  onStart: () => void;
}

const TopicDetail: React.FC<TopicDetailProps> = ({ topic, onBack, onStart }) => {
  return (
    <div className="flex flex-col h-full bg-retro-cream relative">
       <header className="px-4 py-4 flex justify-between items-center border-b-2 border-retro-dark bg-retro-paper sticky top-0 z-10">
         <button onClick={onBack} className="p-2 hover:bg-retro-dark hover:text-white transition-colors border border-transparent">
             <Icons.ChevronLeft className="w-6 h-6" />
         </button>
         <button className="p-2 hover:text-retro-orange transition-colors">
             <Icons.Share className="w-5 h-5" />
         </button>
       </header>

       <div className="flex-1 overflow-y-auto p-6 pb-24">
           <div className="mb-6">
               <div className="flex gap-2 mb-3">
                   <span className="bg-retro-dark text-white text-[10px] font-bold px-2 py-0.5 uppercase">{topic.category}</span>
                   {topic.emotionTags.map(tag => (
                       <span key={tag} className="border border-retro-dark text-retro-dark text-[10px] font-mono px-2 py-0.5 uppercase">#{tag}</span>
                   ))}
               </div>
               <h1 className="text-3xl font-bold font-sans text-retro-dark uppercase leading-none mb-4">{topic.title}</h1>
               <div className="h-1 w-20 bg-retro-orange mb-6"></div>
               <p className="font-mono text-sm text-retro-dark leading-relaxed bg-white border-2 border-retro-dark p-4 shadow-hard">
                   {topic.description}
                   <br/><br/>
                   本话题旨在通过引导式对话，帮助你缓解情绪压力，重获内心平静。
               </p>
           </div>

           <div className="space-y-4">
               <h3 className="text-xs font-bold font-sans uppercase text-retro-grey">引导问题 (GUIDE)</h3>
               {['我想听听你最近的烦恼', '你觉得这种情绪从何而来？', '如果可以，你希望现在做些什么？'].map((q, i) => (
                   <div key={i} className="flex gap-3 items-start opacity-70">
                       <div className="w-5 h-5 rounded-full bg-retro-mustard/30 text-[10px] flex items-center justify-center font-bold border border-retro-dark shrink-0">{i+1}</div>
                       <p className="text-sm font-mono text-retro-dark">{q}</p>
                   </div>
               ))}
           </div>
       </div>

       <div className="p-4 pb-safe bg-white border-t-2 border-retro-dark fixed bottom-0 w-full max-w-md z-20">
          <button 
            onClick={onStart}
            className="w-full bg-retro-orange text-white font-bold font-sans uppercase py-4 text-sm shadow-hard border-2 border-retro-dark hover:translate-y-1 hover:shadow-none transition-all"
          >
              开始聊聊 (START)
          </button>
      </div>
    </div>
  );
};

export default TopicDetail;