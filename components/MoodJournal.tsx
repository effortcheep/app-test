import React from 'react';
import { Icons } from './ui/Icon';

interface MoodJournalProps {
    onBack: () => void;
}

const MoodJournal: React.FC<MoodJournalProps> = ({ onBack }) => {
    // Mapping emotions to numeric values (1-5 scale) for equalizer visual
    // 5: Joy (High Energy)
    // 3: Neutral (Mid)
    // 1-2: Negative (Low Energy)
    const history = [
        { date: '10/24', mood: 'Joy', value: 5, label: 'Joy' },
        { date: '10/25', mood: 'Anxiety', value: 2, label: 'Anx' },
        { date: '10/26', mood: 'Neutral', value: 3, label: 'Mid' },
        { date: '10/27', mood: 'Sadness', value: 1, label: 'Sad' },
        { date: '10/28', mood: 'Anger', value: 2, label: 'Ang' },
        { date: 'Today', mood: 'Joy', value: 5, label: 'Joy' },
    ];

    const logs = [
        { time: '14:30', mood: '焦虑', note: '工作压力大', response: 'AI建议深呼吸' },
        { time: '09:15', mood: '平静', note: '晨间对话', response: 'AI分享了诗歌' },
    ];

    return (
        <div className="flex flex-col h-full bg-retro-cream">
            <header className="px-4 py-4 border-b-2 border-retro-dark bg-retro-paper flex items-center justify-between sticky top-0 z-10 shadow-hard-sm flex-none">
                <div className="flex items-center gap-3">
                    <button onClick={onBack} className="p-1 -ml-1 hover:bg-retro-dark hover:text-white transition-colors rounded-sm">
                        <Icons.ChevronLeft className="w-6 h-6" />
                    </button>
                    <h1 className="text-lg font-bold font-sans uppercase">情绪日记</h1>
                </div>
                <button className="text-[10px] font-mono border-2 border-retro-dark px-2 py-1 hover:bg-retro-mustard bg-white">最近7天</button>
            </header>

            <div className="flex-1 overflow-y-auto p-4 bg-grid-pattern bg-[length:40px_40px]">

                {/* Volume/Equalizer Style Chart */}
                <div className="bg-white border-2 border-retro-dark p-4 shadow-hard mb-6">
                    <h3 className="text-xs font-bold font-sans uppercase mb-4 text-retro-grey border-b border-dashed border-retro-grey pb-2 flex justify-between">
                        <span>情绪律动 (RHYTHM)</span>
                        <span className="text-[10px]">EQ-Visualizer</span>
                    </h3>

                    <div className="flex justify-between items-end h-48 gap-2 px-1">
                        {history.map((h, i) => (
                            <div key={i} className="flex flex-col items-center justify-end h-full gap-2 flex-1 group min-w-0">
                                {/* Label Bubble */}
                                <div className={`px-1 py-0.5 border border-retro-dark text-[9px] font-mono font-bold uppercase mb-auto whitespace-nowrap overflow-hidden text-ellipsis max-w-full ${
                                    h.value >= 4 ? 'bg-retro-orange text-white' : 'bg-retro-cream text-retro-dark'
                                }`}>
                                    {h.label}
                                </div>

                                {/* The Equalizer Bar */}
                                <div className="flex flex-col gap-1 w-full max-w-[28px]">
                                    {/* Generate 5 blocks */}
                                    {Array.from({ length: 5 }).map((_, blockIndex) => {
                                        // 0 is top, 4 is bottom
                                        // If value is 5, we fill all. If 1, we fill index 4.
                                        const threshold = 5 - h.value;
                                        const isActive = blockIndex >= threshold;

                                        // Determine color based on position
                                        let bgClass = "bg-retro-grey/10 border border-retro-grey/20"; // Inactive
                                        if (isActive) {
                                            if (blockIndex === 0) bgClass = "bg-retro-orange border border-retro-dark"; // Peak
                                            else if (blockIndex <= 2) bgClass = "bg-retro-mustard border border-retro-dark"; // Mid
                                            else bgClass = "bg-retro-dark border border-retro-dark"; // Base
                                        }

                                        return (
                                            <div
                                                key={blockIndex}
                                                className={`h-4 w-full rounded-[1px] transition-all duration-300 ${bgClass}`}
                                            ></div>
                                        );
                                    })}
                                </div>

                                {/* Date */}
                                <span className="text-[9px] font-mono text-retro-grey uppercase tracking-tighter truncate w-full text-center">{h.date}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-retro-mustard/20 border-2 border-retro-dark p-3">
                         <div className="text-[10px] font-mono uppercase text-retro-dark/60">开心 (JOY)</div>
                         <div className="text-2xl font-bold font-sans text-retro-dark">12 <span className="text-xs font-normal">次</span></div>
                    </div>
                    <div className="bg-blue-100 border-2 border-retro-dark p-3">
                         <div className="text-[10px] font-mono uppercase text-retro-dark/60">焦虑 (ANX)</div>
                         <div className="text-2xl font-bold font-sans text-retro-dark">5 <span className="text-xs font-normal">次</span></div>
                    </div>
                </div>

                {/* Logs List */}
                <div className="space-y-3">
                    <h3 className="text-xs font-bold font-sans uppercase mb-2 border-b-2 border-retro-dark inline-block">今日记录</h3>
                    {logs.map((log, i) => (
                        <div key={i} className="bg-white border-2 border-retro-dark p-3 shadow-hard-sm flex gap-3">
                            <div className="flex flex-col items-center justify-center w-12 border-r border-dashed border-retro-grey pr-2">
                                <span className="text-lg font-bold font-sans">{log.mood}</span>
                                <span className="text-[9px] font-mono text-retro-grey">{log.time}</span>
                            </div>
                            <div>
                                <p className="text-xs font-mono text-retro-dark mb-1">{log.note}</p>
                                <p className="text-[10px] font-mono text-retro-grey bg-retro-cream px-1 inline-block">{`>> ${log.response}`}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Spacer for Floating Music Button & Safe Area */}
                <div className="h-24 pb-safe"></div>
            </div>
        </div>
    );
};

export default MoodJournal;