import React from 'react';
import { Icons } from './ui/Icon';

const MoodJournal: React.FC = () => {
    // Mock Data
    const history = [
        { date: '10/24', mood: 'Joy', count: 5 },
        { date: '10/25', mood: 'Anxiety', count: 8 },
        { date: '10/26', mood: 'Neutral', count: 3 },
        { date: '10/27', mood: 'Sadness', count: 6 },
        { date: '10/28', mood: 'Joy', count: 4 },
        { date: 'Today', mood: 'Joy', count: 7 },
    ];

    const logs = [
        { time: '14:30', mood: '焦虑', note: '工作压力大', response: 'AI建议深呼吸' },
        { time: '09:15', mood: '平静', note: '晨间对话', response: 'AI分享了诗歌' },
    ];

    return (
        <div className="flex flex-col h-full bg-retro-cream">
            <header className="px-6 py-6 border-b-2 border-retro-dark bg-retro-paper">
                <div className="flex justify-between items-center">
                    <h1 className="text-xl font-bold font-sans uppercase">情绪日记</h1>
                    <button className="text-xs font-mono border border-retro-dark px-2 py-1 hover:bg-retro-mustard">最近7天</button>
                </div>
            </header>

            <div className="flex-1 overflow-y-auto p-4 bg-grid-pattern bg-[length:40px_40px]">
                {/* Chart Mockup */}
                <div className="bg-white border-2 border-retro-dark p-4 shadow-hard mb-6">
                    <h3 className="text-xs font-bold font-sans uppercase mb-4 text-retro-grey">趋势分析 (TREND)</h3>
                    <div className="flex items-end justify-between h-32 gap-2 px-2">
                        {history.map((h, i) => (
                            <div key={i} className="flex flex-col items-center gap-2 flex-1 group">
                                <div
                                    className={`w-full bg-retro-dark transition-all group-hover:bg-retro-orange relative`}
                                    style={{ height: `${h.count * 10}%` }}
                                >
                                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] opacity-0 group-hover:opacity-100 font-mono bg-retro-dark text-white px-1">{h.mood}</div>
                                </div>
                                <span className="text-[9px] font-mono text-retro-grey uppercase">{h.date}</span>
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
                <div className="space-y-3 pb-24">
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
            </div>
        </div>
    );
};

export default MoodJournal;