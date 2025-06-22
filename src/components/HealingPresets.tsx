import React, { useState } from 'react';
import { Heart, Play, Pause, Star, Zap } from 'lucide-react';

interface HealingPresetsProps {
  onPlayPreset: (frequency: number) => void;
  onStopPreset: () => void;
  isPlaying: boolean;
}

const HealingPresets: React.FC<HealingPresetsProps> = ({ onPlayPreset, onStopPreset, isPlaying }) => {
  const [activePreset, setActivePreset] = useState<string | null>(null);

  const presets = [
    {
      id: 'grounding',
      name: 'Grounding & Stability',
      frequency: 7.83,
      description: 'Connect with Earth\'s natural frequency',
      color: 'from-green-600 to-emerald-600',
      icon: '🌍',
      duration: '15 min',
      benefits: ['Reduces anxiety', 'Improves focus', 'Enhances meditation']
    },
    {
      id: 'healing',
      name: 'Deep Healing',
      frequency: 528,
      description: 'The frequency of love and DNA repair',
      color: 'from-pink-600 to-rose-600',
      icon: '💚',
      duration: '20 min',
      benefits: ['DNA repair', 'Emotional healing', 'Cellular regeneration']
    },
    {
      id: 'transformation',
      name: 'Transformation',
      frequency: 417,
      description: 'Facilitate positive change and growth',
      color: 'from-orange-600 to-amber-600',
      icon: '🦋',
      duration: '18 min',
      benefits: ['Breaks negative patterns', 'Promotes change', 'Clears energy blocks']
    },
    {
      id: 'intuition',
      name: 'Third Eye Activation',
      frequency: 852,
      description: 'Enhance intuition and spiritual insight',
      color: 'from-purple-600 to-indigo-600',
      icon: '👁️',
      duration: '25 min',
      benefits: ['Enhances intuition', 'Spiritual awakening', 'Higher consciousness']
    },
    {
      id: 'liberation',
      name: 'Fear Release',
      frequency: 396,
      description: 'Release fear, guilt, and negative emotions',
      color: 'from-red-600 to-pink-600',
      icon: '🕊️',
      duration: '12 min',
      benefits: ['Releases fear', 'Emotional freedom', 'Guilt dissolution']
    },
    {
      id: 'expression',
      name: 'Throat Chakra',
      frequency: 741,
      description: 'Enhance communication and self-expression',
      color: 'from-blue-600 to-cyan-600',
      icon: '🎵',
      duration: '16 min',
      benefits: ['Improves communication', 'Self-expression', 'Creative flow']
    }
  ];

  const handlePresetClick = (preset: any) => {
    if (activePreset === preset.id && isPlaying) {
      onStopPreset();
      setActivePreset(null);
    } else {
      onPlayPreset(preset.frequency);
      setActivePreset(preset.id);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <Heart className="w-8 h-8 text-pink-400" />
          <h2 className="text-3xl font-light text-white">Healing Presets</h2>
        </div>
        <p className="text-blue-200 max-w-2xl mx-auto">
          Curated healing frequencies based on the research of Jonathan Goldman and Steven Halpern
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {presets.map((preset) => (
          <div
            key={preset.id}
            className={`relative overflow-hidden rounded-3xl p-6 transition-all duration-300 cursor-pointer transform hover:scale-105 ${
              activePreset === preset.id && isPlaying
                ? 'ring-2 ring-white/50 shadow-xl'
                : 'hover:shadow-lg'
            }`}
            style={{
              background: `linear-gradient(135deg, ${preset.color.replace('from-', '').replace('to-', ', ')})`,
              opacity: 0.9
            }}
            onClick={() => handlePresetClick(preset)}
          >
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="text-3xl">{preset.icon}</div>
                <div className="flex items-center space-x-2">
                  {activePreset === preset.id && isPlaying ? (
                    <Pause className="w-6 h-6 text-white" />
                  ) : (
                    <Play className="w-6 h-6 text-white" />
                  )}
                  <span className="text-sm text-white/80">{preset.duration}</span>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-white mb-2">{preset.name}</h3>
              <p className="text-white/80 text-sm mb-4">{preset.description}</p>

              <div className="flex items-center space-x-4 mb-4">
                <div className="bg-white/20 rounded-full px-3 py-1">
                  <span className="text-white text-sm font-medium">{preset.frequency} Hz</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-300 fill-current" />
                  <span className="text-white/80 text-sm">Recommended</span>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-white font-medium text-sm">Benefits:</h4>
                <ul className="text-white/80 text-xs space-y-1">
                  {preset.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <Zap className="w-3 h-3 text-yellow-300" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {activePreset === preset.id && isPlaying && (
                <div className="mt-4 p-3 bg-white/10 rounded-xl">
                  <div className="flex items-center justify-between">
                    <span className="text-white text-sm">Now Playing</span>
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
        <h3 className="text-white text-xl font-light mb-4">About These Frequencies</h3>
        <p className="text-blue-200 leading-relaxed">
          These healing presets are based on the Solfeggio frequencies and research by sound healing pioneers 
          Jonathan Goldman and Steven Halpern. Each frequency is carefully selected for its specific therapeutic 
          properties and ability to promote healing, balance, and spiritual growth.
        </p>
      </div>
    </div>
  );
};

export default HealingPresets;