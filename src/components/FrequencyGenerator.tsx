import React from 'react';
import { Play, Pause, Volume2, Waves } from 'lucide-react';

interface FrequencyGeneratorProps {
  currentFrequency: number;
  setCurrentFrequency: (freq: number) => void;
  isPlaying: boolean;
  togglePlay: () => void;
  volume: number;
  setVolume: (vol: number) => void;
  playFrequency: (freq: number) => void;
}

const FrequencyGenerator: React.FC<FrequencyGeneratorProps> = ({
  currentFrequency,
  setCurrentFrequency,
  isPlaying,
  togglePlay,
  volume,
  setVolume,
  playFrequency,
}) => {
  const presetFrequencies = [
    { freq: 7.83, name: 'Schumann Resonance', desc: 'Earth\'s heartbeat' },
    { freq: 40, name: 'Gamma Focus', desc: 'Enhanced concentration' },
    { freq: 111, name: 'Holy Frequency', desc: 'Spiritual awakening' },
    { freq: 174, name: 'Pain Relief', desc: 'Natural anesthetic' },
    { freq: 285, name: 'Healing', desc: 'Tissue regeneration' },
    { freq: 396, name: 'Liberation', desc: 'Release fear & guilt' },
    { freq: 417, name: 'Change', desc: 'Facilitate transformation' },
    { freq: 432, name: 'Natural Tuning', desc: 'Harmonic resonance' },
    { freq: 528, name: 'Love Frequency', desc: 'DNA repair' },
    { freq: 639, name: 'Relationships', desc: 'Connection & love' },
    { freq: 741, name: 'Expression', desc: 'Self-expression' },
    { freq: 852, name: 'Intuition', desc: 'Third eye activation' },
  ];

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
      <div className="flex items-center space-x-3 mb-8">
        <Waves className="w-6 h-6 text-green-400" />
        <h2 className="text-2xl font-light text-white">Frequency Generator</h2>
      </div>

      {/* Main Frequency Display */}
      <div className="text-center mb-8">
        <div className="text-6xl font-light text-white mb-2">
          {currentFrequency}
          <span className="text-2xl text-blue-300 ml-2">Hz</span>
        </div>
        <div className="text-green-400 text-lg">
          {presetFrequencies.find(p => p.freq === currentFrequency)?.name || 'Custom Frequency'}
        </div>
      </div>

      {/* Frequency Slider */}
      <div className="mb-8">
        <label className="block text-white text-sm mb-4">Frequency Control</label>
        <input
          type="range"
          min="1"
          max="1000"
          step="0.01"
          value={currentFrequency}
          onChange={(e) => {
            const freq = parseFloat(e.target.value);
            setCurrentFrequency(freq);
            if (isPlaying) {
              playFrequency(freq);
            }
          }}
          className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
        />
        <div className="flex justify-between text-xs text-blue-300 mt-2">
          <span>1 Hz</span>
          <span>1000 Hz</span>
        </div>
      </div>

      {/* Volume Control */}
      <div className="mb-8">
        <label className="block text-white text-sm mb-4 flex items-center space-x-2">
          <Volume2 className="w-4 h-4" />
          <span>Volume</span>
        </label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
        />
      </div>

      {/* Play/Pause Button */}
      <button
        onClick={togglePlay}
        className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-medium py-4 px-6 rounded-2xl transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl transform hover:scale-105"
      >
        {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
        <span>{isPlaying ? 'Pause' : 'Play'} Frequency</span>
      </button>

      {/* Preset Frequencies */}
      <div className="mt-8">
        <h3 className="text-white text-lg mb-4">Sacred Frequencies</h3>
        <div className="grid grid-cols-2 gap-3">
          {presetFrequencies.map((preset) => (
            <button
              key={preset.freq}
              onClick={() => {
                setCurrentFrequency(preset.freq);
                if (isPlaying) {
                  playFrequency(preset.freq);
                }
              }}
              className={`p-3 rounded-xl text-left transition-all duration-200 ${
                currentFrequency === preset.freq
                  ? 'bg-green-500/30 border border-green-400'
                  : 'bg-white/5 hover:bg-white/10 border border-white/10'
              }`}
            >
              <div className="text-white font-medium text-sm">{preset.freq} Hz</div>
              <div className="text-blue-200 text-xs">{preset.name}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FrequencyGenerator;