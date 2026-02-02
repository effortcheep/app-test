import React, { useState } from 'react';
import { Icons } from './ui/Icon';
import { User } from '../types';

interface SettingsScreenProps {
    onBack: () => void;
    user?: User | null;
    isMusicPlaying: boolean;
    onToggleMusic: () => void;
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({ onBack, user, isMusicPlaying, onToggleMusic }) => {
    const [activePage, setActivePage] = useState<string | null>(null);

    // Reusable Header
    const Header = ({ title, backAction }: { title: string, backAction: () => void }) => (
        <header className="px-4 py-4 flex items-center gap-3 border-b-2 border-retro-dark bg-retro-paper sticky top-0 z-10 shadow-hard-sm">
            <button onClick={backAction} className="p-1 -ml-1 hover:bg-retro-dark hover:text-white transition-colors"><Icons.ChevronLeft className="w-6 h-6" /></button>
            <h1 className="text-lg font-bold font-sans uppercase">{title}</h1>
        </header>
    );

    // Sub-Page Renderers
    const renderProfileSettings = () => (
        <div className="flex flex-col h-full bg-retro-cream">
            <Header title="个人资料" backAction={() => setActivePage(null)} />
            <div className="p-4 space-y-6">
                <div className="flex flex-col items-center py-6">
                    <img src={user?.avatar || "https://picsum.photos/200"} className="w-24 h-24 border-2 border-retro-dark object-cover rounded-sm mb-4" />
                    <button className="text-xs font-mono text-retro-orange border-b border-retro-orange pb-0.5">更换头像</button>
                </div>
                <div className="space-y-4">
                    <div>
                        <label className="text-[10px] font-bold text-retro-grey uppercase block mb-1">昵称 (Nickname)</label>
                        <input type="text" value={user?.name} readOnly className="w-full border-2 border-retro-dark p-3 bg-white font-mono text-sm text-retro-grey" />
                    </div>
                    <div>
                        <label className="text-[10px] font-bold text-retro-grey uppercase block mb-1">邮箱 (Email)</label>
                        <input type="text" value={user?.email} readOnly className="w-full border-2 border-retro-dark p-3 bg-white font-mono text-sm text-retro-grey" />
                    </div>
                </div>
            </div>
        </div>
    );

    const renderSecuritySettings = () => (
        <div className="flex flex-col h-full bg-retro-cream">
            <Header title="密码与安全" backAction={() => setActivePage(null)} />
            <div className="p-4 space-y-4">
                 <button className="w-full bg-white border-2 border-retro-dark p-4 flex justify-between items-center shadow-hard-sm">
                     <span className="font-mono text-sm">修改密码</span>
                     <Icons.ChevronRight className="w-4 h-4" />
                 </button>
                 <button className="w-full bg-white border-2 border-retro-dark p-4 flex justify-between items-center shadow-hard-sm">
                     <span className="font-mono text-sm">双重验证 (2FA)</span>
                     <div className="w-10 h-5 bg-retro-grey/30 rounded-full relative"><div className="w-5 h-5 bg-retro-grey rounded-full border border-retro-dark absolute left-0"></div></div>
                 </button>
            </div>
        </div>
    );

    const renderNotificationSettings = () => (
        <div className="flex flex-col h-full bg-retro-cream">
            <Header title="消息通知" backAction={() => setActivePage(null)} />
            <div className="p-4 space-y-4">
                {[
                    { l: '每日签到提醒', v: true },
                    { l: '新消息推送', v: true },
                    { l: '系统更新通知', v: false },
                    { l: '特别活动推荐', v: true }
                ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between border-b border-retro-dark/10 pb-4">
                        <span className="font-mono text-sm text-retro-dark">{item.l}</span>
                        <div className={`w-10 h-5 rounded-full relative transition-colors ${item.v ? 'bg-retro-green' : 'bg-retro-grey/30'}`}>
                            <div className={`w-5 h-5 bg-white border-2 border-retro-dark rounded-full absolute top-0 transition-all ${item.v ? 'right-0' : 'left-0'}`}></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderAbout = () => (
        <div className="flex flex-col h-full bg-retro-cream">
            <Header title="关于我们" backAction={() => setActivePage(null)} />
            <div className="p-8 text-center">
                <div className="w-20 h-20 bg-retro-dark mx-auto mb-6 flex items-center justify-center">
                    <span className="text-white font-bold text-2xl">H.AI</span>
                </div>
                <h2 className="text-xl font-bold font-sans uppercase mb-2">Healing Soul AI</h2>
                <p className="text-xs font-mono text-retro-grey mb-8">Version 1.0.5 (Beta)</p>
                
                <div className="text-left bg-white border-2 border-retro-dark p-4 shadow-hard text-xs font-mono leading-relaxed">
                    <p className="mb-2">我们致力于通过人工智能技术，为每一个孤独的灵魂提供温暖的港湾。</p>
                    <p>Designed with ❤️ by RetroFuturism Lab.</p>
                </div>
            </div>
        </div>
    );

    // Main List Render
    if (activePage === 'profile') return renderProfileSettings();
    if (activePage === 'security') return renderSecuritySettings();
    if (activePage === 'notifications') return renderNotificationSettings();
    if (activePage === 'about') return renderAbout();

    // Default List View
    const Section = ({ title, children }: any) => (
        <div className="mb-6">
            <h3 className="text-xs font-bold font-sans uppercase text-retro-grey mb-2 px-2">{title}</h3>
            <div className="bg-white border-y-2 border-retro-dark">
                {children}
            </div>
        </div>
    );

    const Item = ({ icon: Icon, label, value, isLast, onClick }: any) => (
        <div onClick={onClick} className={`flex items-center justify-between p-4 cursor-pointer hover:bg-retro-mustard/10 transition-colors ${!isLast ? 'border-b border-retro-dark/20' : ''}`}>
            <div className="flex items-center gap-3">
                <Icon className="w-5 h-5 text-retro-dark" />
                <span className="font-mono text-sm font-bold text-retro-dark">{label}</span>
            </div>
            <div className="flex items-center gap-2">
                {value && <span className="text-xs font-mono text-retro-grey">{value}</span>}
                <Icons.ChevronRight className="w-4 h-4 text-retro-grey" />
            </div>
        </div>
    );

    return (
        <div className="flex flex-col h-full bg-retro-cream">
            <Header title="系统设置 (CONFIG)" backAction={onBack} />

            <div className="flex-1 overflow-y-auto py-6">
                <Section title="账号安全">
                    <Item icon={Icons.User} label="个人资料" onClick={() => setActivePage('profile')} />
                    <Item icon={Icons.Shield} label="密码与安全" onClick={() => setActivePage('security')} />
                </Section>

                <Section title="通用">
                    {/* Music Toggle Item */}
                    <div onClick={onToggleMusic} className="flex items-center justify-between p-4 cursor-pointer hover:bg-retro-mustard/10 transition-colors border-b border-retro-dark/20">
                         <div className="flex items-center gap-3">
                             <Icons.Music className="w-5 h-5 text-retro-dark" />
                             <span className="font-mono text-sm font-bold text-retro-dark">背景音乐 (BGM)</span>
                         </div>
                         <div className={`w-10 h-5 rounded-full relative transition-colors ${isMusicPlaying ? 'bg-retro-green' : 'bg-retro-grey/30'}`}>
                             <div className={`w-5 h-5 bg-white border-2 border-retro-dark rounded-full absolute top-0 transition-all ${isMusicPlaying ? 'right-0' : 'left-0'}`}></div>
                         </div>
                    </div>

                    <Item icon={Icons.Bell} label="消息通知" value="已开启" onClick={() => setActivePage('notifications')} />
                    <Item icon={Icons.Moon} label="显示主题" value="复古亮色" />
                </Section>

                <Section title="支持">
                    <Item icon={Icons.HelpCircle} label="帮助中心" />
                    <Item icon={Icons.MessageCircle} label="意见反馈" />
                    <Item icon={Icons.Info} label="关于我们" value="v1.0.5" isLast onClick={() => setActivePage('about')} />
                </Section>

                <div className="p-4 text-center pb-8 safe-bottom mt-8">
                     <p className="font-mono text-[9px] text-retro-grey/50">HEALING SOUL AI SYSTEM // 2024</p>
                </div>
            </div>
        </div>
    );
};

export default SettingsScreen;