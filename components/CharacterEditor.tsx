import React, { useState, useEffect } from 'react';
import { Character, Gender } from '../types';
import { Icons } from './ui/Icon';
import { DEFAULT_AVATARS } from '../constants';

interface CharacterEditorProps {
  initialData?: Character;
  onSave: (char: Character) => void;
  onCancel: () => void;
}

const CharacterEditor: React.FC<CharacterEditorProps> = ({ initialData, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Partial<Character>>({
    name: '',
    gender: Gender.Female,
    age: '',
    role: '',
    personality: '',
    tone: '',
    background: '',
    avatar: DEFAULT_AVATARS[0]
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (key: keyof Character, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.role) return;
    
    const char: Character = {
        id: initialData?.id || `char_${Date.now()}`,
        name: formData.name!,
        gender: formData.gender as Gender,
        age: formData.age || '未知',
        role: formData.role!,
        personality: formData.personality || '友好',
        tone: formData.tone || '礼貌',
        background: formData.background || '一位新朋友。',
        avatar: formData.avatar || DEFAULT_AVATARS[0],
        specialties: [] // Initialize with empty array as per type definition
    };
    onSave(char);
  };

  const InputField = ({ label, value, onChange, placeholder }: any) => (
      <div className="space-y-1">
          <label className="text-[10px] font-bold text-retro-dark uppercase tracking-wider bg-retro-mustard/20 px-1 inline-block">{label}</label>
          <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="w-full px-3 py-2 bg-white border-2 border-retro-dark font-mono text-sm focus:outline-none focus:shadow-hard-sm focus:border-retro-orange transition-all placeholder:text-retro-grey/50"
              placeholder={placeholder}
          />
      </div>
  );

  return (
    <div className="flex flex-col h-full bg-retro-cream">
      <header className="px-6 py-4 flex items-center justify-between border-b-2 border-retro-dark bg-retro-paper">
        <div className="flex items-center gap-3">
            <button onClick={onCancel} className="p-1 border border-retro-dark hover:bg-retro-dark hover:text-white transition-colors">
            <Icons.ChevronLeft className="w-5 h-5" />
            </button>
            <h2 className="text-lg font-sans font-bold uppercase tracking-tight">{initialData ? '修改单元参数' : '新建单元条目'}</h2>
        </div>
        <div className="text-[10px] font-mono text-retro-grey">模式: 编辑 (EDIT)</div>
      </header>

      <div className="flex-1 overflow-y-auto p-6 bg-grid-pattern bg-[length:20px_20px]">
        <form onSubmit={handleSubmit} className="space-y-6 max-w-sm mx-auto">
          {/* Avatar Selection */}
          <div className="space-y-2 border-2 border-retro-dark p-3 bg-white shadow-hard-sm">
            <label className="text-xs font-bold font-mono uppercase text-retro-dark block mb-2 border-b border-dashed border-retro-grey pb-1">视觉表征 (AVATAR)</label>
            <div className="flex gap-3 overflow-x-auto py-1 no-scrollbar">
              {DEFAULT_AVATARS.map((url) => (
                <button
                  key={url}
                  type="button"
                  onClick={() => handleChange('avatar', url)}
                  className={`relative p-0.5 border-2 transition-all ${formData.avatar === url ? 'border-retro-orange shadow-hard-sm' : 'border-transparent opacity-60 grayscale'}`}
                >
                  <img src={url} alt="avatar" className="w-12 h-12 object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <InputField label="代号 (Name)" value={formData.name} onChange={(v: string) => handleChange('name', v)} placeholder="输入名称" />
            <InputField label="功能 (Role)" value={formData.role} onChange={(v: string) => handleChange('role', v)} placeholder="例如：树洞" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
               <label className="text-[10px] font-bold text-retro-dark uppercase tracking-wider bg-retro-mustard/20 px-1 inline-block">分类 (Type)</label>
               <select 
                value={formData.gender}
                onChange={(e) => handleChange('gender', e.target.value)}
                className="w-full px-3 py-2 bg-white border-2 border-retro-dark font-mono text-sm focus:outline-none focus:shadow-hard-sm focus:border-retro-orange"
               >
                 <option value={Gender.Female}>女性 (F-TYPE)</option>
                 <option value={Gender.Male}>男性 (M-TYPE)</option>
                 <option value={Gender.NonBinary}>非二元 (N-TYPE)</option>
               </select>
            </div>
            <InputField label="运行时长 (Age)" value={formData.age} onChange={(v: string) => handleChange('age', v)} placeholder="设定年龄" />
          </div>

          <InputField label="行为矩阵 (Personality)" value={formData.personality} onChange={(v: string) => handleChange('personality', v)} placeholder="例如：温柔，幽默" />
          <InputField label="语音调制 (Tone)" value={formData.tone} onChange={(v: string) => handleChange('tone', v)} placeholder="例如：活泼，冷静" />

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-retro-dark uppercase tracking-wider bg-retro-mustard/20 px-1 inline-block">数据日志 (Backstory)</label>
            <textarea
              value={formData.background}
              onChange={(e) => handleChange('background', e.target.value)}
              className="w-full px-3 py-2 bg-white border-2 border-retro-dark font-mono text-sm focus:outline-none focus:shadow-hard-sm focus:border-retro-orange min-h-[120px]"
              placeholder="输入角色背景故事..."
            />
          </div>

        </form>
      </div>

      <div className="p-6 border-t-2 border-retro-dark bg-retro-paper">
        <button
          onClick={handleSubmit}
          className="w-full bg-retro-dark text-white font-bold font-mono uppercase tracking-widest py-3 border-2 border-retro-dark shadow-hard hover:bg-retro-orange hover:border-retro-dark transition-all"
        >
          保存配置 (SAVE)
        </button>
      </div>
    </div>
  );
};

export default CharacterEditor;