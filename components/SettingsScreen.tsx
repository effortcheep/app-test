import React from 'react';
import { Icons } from './ui/Icon';

const SettingsScreen: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const Section = ({ title, children }: any) => (
        <div className="mb-6">
            <h3 className="text-xs font-bold font-sans uppercase text-retro-grey mb-2 px-2">{title}</h3>
            <div className="bg-white border-y-2 border-retro-dark">
                {children}
            </div>
        </div>
    );

    const Item = ({ icon: Icon, label, value, isLast }: any) => (
        <div className={`flex items-center justify-between p-4 cursor-pointer hover:bg-retro-mustard/10 transition-colors ${!isLast ? 'border-b border-retro-dark/20' : ''}`}>
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
            <header className="px-4 py-4 flex items-center gap-3 border-b-2 border-retro-dark bg-retro-paper sticky top-0 z-10">
                <button onClick={onBack}><Icons.ChevronLeft className="w-6 h-6" /></button>
                <h1 className="text-lg font-bold font-sans uppercase">系统设置 (CONFIG)</h1>
            </header>

            <div className="flex-1 overflow-y-auto py-6">
                <Section title="账号安全">
                    <Item icon={Icons.User} label="个人资料" />
                    <Item icon={Icons.Shield} label="密码与安全" />
                </Section>

                <Section title="通用">
                    <Item icon={Icons.Bell} label="消息通知" value="已开启" />
                    <Item icon={Icons.Moon} label="显示主题" value="复古亮色" />
                </Section>

                <Section title="支持">
                    <Item icon={Icons.HelpCircle} label="帮助中心" />
                    <Item icon={Icons.MessageCircle} label="意见反馈" />
                    <Item icon={Icons.Info} label="关于我们" value="v1.0.4" isLast />
                </Section>
            </div>
            
            <div className="p-4 text-center pb-8">
                 <p className="font-mono text-[9px] text-retro-grey/50">HEALING SOUL AI SYSTEM // 2024</p>
            </div>
        </div>
    );
};

export default SettingsScreen;