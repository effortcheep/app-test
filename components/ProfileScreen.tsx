import React from 'react';
import { User } from '../types';
import { Icons } from './ui/Icon';

interface ProfileScreenProps {
    user: User;
    onLogout: () => void;
    onOpenMood?: () => void;
    onOpenSettings?: () => void;
    onOpenFavorites?: () => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ user, onLogout, onOpenMood, onOpenSettings, onOpenFavorites }) => {
    return (
        <div className="flex flex-col h-full bg-retro-cream">
            {/* Header / ID Card */}
            <div className="bg-retro-paper border-b-2 border-retro-dark p-6 shadow-hard-sm relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-24 h-24 bg-retro-mustard/20 rounded-bl-full"></div>
                 <div className="flex items-center gap-4 relative z-10">
                     <div className="w-20 h-20 border-2 border-retro-dark bg-retro-cream p-0.5 shadow-hard-sm">
                         <img src={user.avatar} alt="me" className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all" />
                     </div>
                     <div>
                         <h1 className="text-xl font-sans font-bold text-retro-dark uppercase tracking-wide">{user.name}</h1>
                         <p className="font-mono text-xs text-retro-grey mb-2">{user.email}</p>
                         <span className="bg-retro-dark text-white text-[9px] font-mono px-2 py-0.5 uppercase tracking-widest">等级 1 // 初始者</span>
                     </div>
                 </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 bg-grid-pattern bg-[length:40px_40px]">
                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                    <div className="bg-white border-2 border-retro-dark p-2 shadow-hard text-center">
                        <div className="text-xl font-bold font-mono text-retro-orange">12</div>
                        <div className="text-[8px] font-sans font-bold text-retro-dark uppercase">对话总数</div>
                    </div>
                    <div className="bg-white border-2 border-retro-dark p-2 shadow-hard text-center">
                        <div className="text-xl font-bold font-mono text-retro-orange">3.5h</div>
                        <div className="text-[8px] font-sans font-bold text-retro-dark uppercase">时长</div>
                    </div>
                    <div className="bg-white border-2 border-retro-dark p-2 shadow-hard text-center">
                        <div className="text-xl font-bold font-mono text-retro-orange">5</div>
                        <div className="text-[8px] font-sans font-bold text-retro-dark uppercase">活跃天数</div>
                    </div>
                </div>

                {/* Function List */}
                <div className="space-y-3 mb-8">
                    <div onClick={onOpenFavorites} className="bg-white border-2 border-retro-dark p-4 shadow-hard flex items-center justify-between cursor-pointer hover:bg-retro-paper transition-colors group">
                        <div className="flex items-center gap-3">
                            <div className="p-1.5 bg-retro-mustard/20 border border-retro-dark group-hover:bg-retro-mustard transition-colors">
                                <Icons.Heart className="w-4 h-4 text-retro-dark" />
                            </div>
                            <span className="font-mono text-sm font-bold text-retro-dark uppercase">收藏夹 (FAVORITES)</span>
                        </div>
                        <Icons.ChevronRight className="w-4 h-4 text-retro-grey" />
                    </div>

                    <div onClick={onOpenMood} className="bg-white border-2 border-retro-dark p-4 shadow-hard flex items-center justify-between cursor-pointer hover:bg-retro-paper transition-colors group">
                        <div className="flex items-center gap-3">
                            <div className="p-1.5 bg-retro-mustard/20 border border-retro-dark group-hover:bg-retro-mustard transition-colors">
                                <Icons.BarChart className="w-4 h-4 text-retro-dark" />
                            </div>
                            <span className="font-mono text-sm font-bold text-retro-dark uppercase">情绪日记 (MOOD LOG)</span>
                        </div>
                        <Icons.ChevronRight className="w-4 h-4 text-retro-grey" />
                    </div>

                    <div onClick={onOpenSettings} className="bg-white border-2 border-retro-dark p-4 shadow-hard flex items-center justify-between cursor-pointer hover:bg-retro-paper transition-colors group">
                        <div className="flex items-center gap-3">
                            <div className="p-1.5 bg-retro-mustard/20 border border-retro-dark group-hover:bg-retro-mustard transition-colors">
                                <Icons.Settings className="w-4 h-4 text-retro-dark" />
                            </div>
                            <span className="font-mono text-sm font-bold text-retro-dark uppercase">系统设置</span>
                        </div>
                        <Icons.ChevronRight className="w-4 h-4 text-retro-grey" />
                    </div>
                </div>

                <div className="mt-8 text-center pb-8">
                    <button onClick={onLogout} className="text-xs text-red-600 font-mono uppercase hover:underline flex items-center justify-center gap-2 mx-auto">
                        <Icons.LogOut className="w-4 h-4" /> 终止会话 (LOGOUT)
                    </button>
                    <p className="font-mono text-[9px] text-retro-grey mt-4">VERSION 1.0.5 // BUILD 2085</p>
                </div>
            </div>
        </div>
    );
};

export default ProfileScreen;