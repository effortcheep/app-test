import React, { useState } from 'react';
import { Character, Gender } from '../types';
import { Icons } from './ui/Icon';
import { DEFAULT_AVATARS } from '../constants';

interface CharacterWizardProps {
  initialData?: Character;
  onSave: (char: Character) => void;
  onCancel: () => void;
}

const CharacterWizard: React.FC<CharacterWizardProps> = ({ initialData, onSave, onCancel }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<Character>>(initialData || {
    name: '',
    gender: Gender.Female,
    age: '20',
    role: '',
    personality: '',
    tone: '温暖',
    background: '',
    specialties: [],
    avatar: DEFAULT_AVATARS[0]
  });

  const totalSteps = 4;

  const handleNext = () => {
    if (step < totalSteps) setStep(step + 1);
    else {
        const char: Character = {
            id: initialData?.id || `char_${Date.now()}`,
            name: formData.name!,
            gender: formData.gender as Gender,
            age: formData.age || '未知',
            role: formData.role || '伙伴',
            personality: formData.personality || '友好',
            tone: formData.tone || '平和',
            background: formData.background || '暂无详细背景。',
            avatar: formData.avatar || DEFAULT_AVATARS[0],
            specialties: formData.specialties || []
        };
        onSave(char);
    }
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
    else onCancel();
  };

  const handleRandomize = () => {
     setFormData({
         ...formData,
         name: 'Nova',
         gender: Gender.Female,
         age: '25',
         role: '情感治愈师',
         personality: '富有同情心，善于倾听，温和',
         tone: '轻柔，鼓励性，温暖',
         background: '来自未来的情感陪伴型AI，专门为了治愈人类的孤独而设计。喜欢听雨声和阅读人类的诗歌。',
         specialties: ['情感疏导', '深夜陪伴']
     });
  };

  const renderStep1 = () => (
      <div className="space-y-6 animate-fade-in">
          <div className="text-center mb-6">
              <div className="w-24 h-24 mx-auto border-2 border-retro-dark bg-retro-cream p-1 mb-4 relative group">
                  <img src={formData.avatar} alt="avatar" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/50 hidden group-hover:flex items-center justify-center text-white text-xs cursor-pointer" onClick={() => {
                      const idx = DEFAULT_AVATARS.indexOf(formData.avatar!) + 1;
                      const next = DEFAULT_AVATARS[idx % DEFAULT_AVATARS.length];
                      setFormData({...formData, avatar: next});
                  }}>
                      点击切换
                  </div>
              </div>
              <p className="text-[10px] font-mono text-retro-grey uppercase">点击图片切换样式</p>
          </div>

          <div className="space-y-4">
              <div>
                  <label className="text-xs font-bold font-sans uppercase mb-1 block">代号 (Name)</label>
                  <input 
                    type="text" 
                    value={formData.name} 
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full border-2 border-retro-dark px-3 py-2 font-mono focus:shadow-hard-sm focus:outline-none"
                    placeholder="输入角色名称"
                  />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="text-xs font-bold font-sans uppercase mb-1 block">型号 (Gender)</label>
                    <select 
                        value={formData.gender}
                        onChange={e => setFormData({...formData, gender: e.target.value as Gender})}
                        className="w-full border-2 border-retro-dark px-3 py-2 font-mono bg-white focus:shadow-hard-sm focus:outline-none"
                    >
                        <option value={Gender.Female}>女性 (F)</option>
                        <option value={Gender.Male}>男性 (M)</option>
                        <option value={Gender.NonBinary}>非二元 (N)</option>
                    </select>
                </div>
                <div>
                    <label className="text-xs font-bold font-sans uppercase mb-1 block">运行周期 (Age)</label>
                    <input 
                        type="text" 
                        value={formData.age} 
                        onChange={e => setFormData({...formData, age: e.target.value})}
                        className="w-full border-2 border-retro-dark px-3 py-2 font-mono focus:shadow-hard-sm focus:outline-none"
                        placeholder="24"
                    />
                </div>
              </div>
          </div>
      </div>
  );

  const renderStep2 = () => (
      <div className="space-y-6 animate-fade-in">
          <div>
              <label className="text-xs font-bold font-sans uppercase mb-3 block">性格预设模板</label>
              <div className="grid grid-cols-2 gap-3">
                  {['温柔治愈', '理性分析', '幽默风趣', '倾听陪伴'].map(trait => (
                      <button
                        key={trait}
                        onClick={() => setFormData({...formData, personality: trait})}
                        className={`p-3 border-2 border-retro-dark text-xs font-bold text-left hover:bg-retro-mustard transition-colors ${formData.personality?.includes(trait) ? 'bg-retro-orange text-white' : 'bg-white'}`}
                      >
                          {trait}
                      </button>
                  ))}
              </div>
          </div>

          <div>
               <label className="text-xs font-bold font-sans uppercase mb-1 block">自定义详细描述</label>
               <textarea
                  value={formData.personality}
                  onChange={e => setFormData({...formData, personality: e.target.value})}
                  className="w-full h-24 border-2 border-retro-dark px-3 py-2 font-mono focus:shadow-hard-sm focus:outline-none resize-none"
                  placeholder="例如：稍微有点傲娇，但是内心很关心人..."
               />
          </div>

          <div>
              <label className="text-xs font-bold font-sans uppercase mb-1 block">语气风格</label>
              <input 
                type="text"
                value={formData.tone}
                onChange={e => setFormData({...formData, tone: e.target.value})}
                className="w-full border-2 border-retro-dark px-3 py-2 font-mono focus:shadow-hard-sm focus:outline-none"
                placeholder="例如：像大姐姐一样..."
              />
          </div>
      </div>
  );

  const renderStep3 = () => (
      <div className="space-y-6 animate-fade-in">
          <div>
              <label className="text-xs font-bold font-sans uppercase mb-1 block">角色身份 (Role)</label>
              <input 
                type="text"
                value={formData.role}
                onChange={e => setFormData({...formData, role: e.target.value})}
                className="w-full border-2 border-retro-dark px-3 py-2 font-mono focus:shadow-hard-sm focus:outline-none"
                placeholder="例如：心理咨询师"
              />
          </div>

          <div>
               <label className="text-xs font-bold font-sans uppercase mb-1 block">背景故事 (Data Log)</label>
               <textarea
                  value={formData.background}
                  onChange={e => setFormData({...formData, background: e.target.value})}
                  className="w-full h-32 border-2 border-retro-dark px-3 py-2 font-mono focus:shadow-hard-sm focus:outline-none resize-none"
                  placeholder="输入角色的过去、经历和专长..."
               />
          </div>

          <div>
              <label className="text-xs font-bold font-sans uppercase mb-2 block">治愈专长 (Tags)</label>
              <div className="flex flex-wrap gap-2">
                  {['情感疏导', '人生建议', '轻松陪伴', '树洞'].map(tag => (
                      <button
                        key={tag}
                        onClick={() => {
                            const current = formData.specialties || [];
                            const next = current.includes(tag) 
                                ? current.filter(t => t !== tag)
                                : [...current, tag];
                            setFormData({...formData, specialties: next});
                        }}
                        className={`px-3 py-1 border border-retro-dark text-[10px] font-mono ${
                            formData.specialties?.includes(tag) ? 'bg-retro-dark text-white' : 'bg-transparent text-retro-dark'
                        }`}
                      >
                          #{tag}
                      </button>
                  ))}
              </div>
          </div>
      </div>
  );

  const renderStep4 = () => (
      <div className="space-y-4 animate-fade-in">
          <div className="bg-white border-2 border-retro-dark p-4 shadow-hard">
              <div className="flex gap-4 border-b border-dashed border-retro-grey pb-4 mb-4">
                  <img src={formData.avatar} className="w-16 h-16 border-2 border-retro-dark object-cover" />
                  <div>
                      <h3 className="text-xl font-bold font-sans uppercase">{formData.name}</h3>
                      <p className="text-xs font-mono text-retro-grey">{formData.gender} // {formData.age}岁</p>
                      <div className="mt-1">
                        <span className="bg-retro-orange text-white text-[9px] px-1 font-mono">{formData.role}</span>
                      </div>
                  </div>
              </div>
              <div className="space-y-3">
                  <div>
                      <span className="text-[10px] font-bold text-retro-grey uppercase">性格:</span>
                      <p className="text-sm font-mono text-retro-dark">{formData.personality}</p>
                  </div>
                  <div>
                      <span className="text-[10px] font-bold text-retro-grey uppercase">背景:</span>
                      <p className="text-xs font-mono text-retro-dark leading-relaxed">{formData.background}</p>
                  </div>
              </div>
          </div>
          
          <button 
            onClick={handleRandomize}
            className="w-full py-2 border-2 border-dashed border-retro-grey text-retro-grey text-xs font-mono hover:border-retro-orange hover:text-retro-orange transition-colors flex items-center justify-center gap-2"
          >
              <Icons.Refresh className="w-3 h-3" /> 随机生成配置
          </button>
      </div>
  );

  return (
    <div className="flex flex-col h-full bg-retro-cream">
        <header className="px-6 py-4 border-b-2 border-retro-dark bg-retro-paper flex items-center justify-between">
            <h2 className="text-lg font-bold font-sans uppercase">创建我的AI</h2>
            <div className="text-xs font-mono font-bold bg-retro-dark text-white px-2 py-0.5">
                STEP {step}/{totalSteps}
            </div>
        </header>

        {/* Progress Bar */}
        <div className="flex h-1 bg-retro-dark/10">
            <div className="bg-retro-orange transition-all duration-300" style={{ width: `${(step/totalSteps)*100}%` }}></div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 bg-grid-pattern bg-[length:20px_20px]">
            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
            {step === 3 && renderStep3()}
            {step === 4 && renderStep4()}
        </div>

        <footer className="p-4 bg-retro-paper border-t-2 border-retro-dark flex gap-4">
            <button 
                onClick={handlePrev}
                className="flex-1 py-3 border-2 border-retro-dark font-bold font-mono text-xs uppercase hover:bg-retro-grey/10 transition-colors"
            >
                {step === 1 ? '取消' : '上一步'}
            </button>
            <button 
                onClick={handleNext}
                className="flex-[2] py-3 bg-retro-dark text-white border-2 border-retro-dark font-bold font-sans text-xs uppercase shadow-hard hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-hard-sm transition-all"
            >
                {step === 4 ? '确认创建 (FINISH)' : '下一步 (NEXT)'}
            </button>
        </footer>
    </div>
  );
};

export default CharacterWizard;