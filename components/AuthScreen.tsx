import React, { useState } from 'react';
import { User } from '../types';

interface AuthScreenProps {
  onLogin: (user: User) => void;
}

const AuthScreen: React.FC<AuthScreenProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mockUser: User = {
      id: 'user_' + Date.now(),
      name: name || email.split('@')[0] || 'User',
      email: email,
      avatar: 'https://picsum.photos/seed/user/200/200',
    };
    onLogin(mockUser);
  };

  return (
    <div className="h-full bg-retro-cream flex flex-col items-center justify-center p-6 bg-grid-pattern bg-[length:40px_40px]">
      <div className="w-full border-4 border-retro-dark bg-retro-paper p-8 shadow-hard relative">
        {/* Decorative corner brackets */}
        <div className="absolute top-1 left-1 w-2 h-2 border-t-2 border-l-2 border-retro-dark"></div>
        <div className="absolute top-1 right-1 w-2 h-2 border-t-2 border-r-2 border-retro-dark"></div>
        <div className="absolute bottom-1 left-1 w-2 h-2 border-b-2 border-l-2 border-retro-dark"></div>
        <div className="absolute bottom-1 right-1 w-2 h-2 border-b-2 border-r-2 border-retro-dark"></div>

        <div className="mb-8 border-b-2 border-retro-dark pb-4">
          <h1 className="text-3xl font-sans font-bold text-retro-dark tracking-tighter uppercase">Healing Soul<span className="text-retro-orange">.AI</span></h1>
          <p className="text-retro-grey text-xs font-mono mt-2">{`> 系统就绪 SYSTEM_READY`}<br/>{`> 情感模块已加载 MODULE_LOADED`}</p>
        </div>

        <div className="flex border-2 border-retro-dark mb-8 bg-retro-cream">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-3 text-sm font-bold font-mono uppercase transition-all ${isLogin ? 'bg-retro-orange text-white' : 'text-retro-grey hover:bg-retro-dark/5'}`}
          >
            接入系统 (LOGIN)
          </button>
          <div className="w-0.5 bg-retro-dark"></div>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-3 text-sm font-bold font-mono uppercase transition-all ${!isLogin ? 'bg-retro-orange text-white' : 'text-retro-grey hover:bg-retro-dark/5'}`}
          >
            新用户注册 (REG)
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div className="relative">
              <label className="block text-xs font-bold text-retro-dark uppercase mb-1 bg-retro-paper w-max px-1 border-2 border-transparent ml-2">用户代号 (ID)</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 bg-white border-2 border-retro-dark focus:outline-none focus:shadow-hard-sm transition-shadow font-mono text-sm"
                placeholder="请输入昵称..."
              />
            </div>
          )}
          <div>
            <label className="block text-xs font-bold text-retro-dark uppercase mb-1 ml-2">通讯地址 (EMAIL)</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-white border-2 border-retro-dark focus:outline-none focus:shadow-hard-sm transition-shadow font-mono text-sm"
              placeholder="user@net.work"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-retro-dark uppercase mb-1 ml-2">访问密钥 (KEY)</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-white border-2 border-retro-dark focus:outline-none focus:shadow-hard-sm transition-shadow font-mono text-sm"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-retro-mustard border-2 border-retro-dark text-retro-dark font-bold py-4 shadow-hard hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard-sm transition-all mt-6 uppercase tracking-widest font-sans"
          >
            {isLogin ? '初始化会话 (INITIALIZE)' : '创建档案 (CREATE)'}
          </button>
        </form>
      </div>

      <div className="mt-8 text-[10px] font-mono text-retro-grey text-center">
        COPYRIGHT 202X HEALING_CORP<br/>
        保留所有权利 (ALL RIGHTS RESERVED)
      </div>
    </div>
  );
};

export default AuthScreen;