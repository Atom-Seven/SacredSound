import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, Waves, Heart, Zap, Music, Settings, Info } from 'lucide-react';
import FrequencyGenerator from './components/FrequencyGenerator';
import WaveVisualizer from './components/WaveVisualizer';
import HealingPresets from './components/HealingPresets';
import MeditationTimer from './components/MeditationTimer';
import EducationalContent from './components/EducationalContent';
import MusicLibrary from './components/MusicLibrary';

function App() {
  const [activeTab, setActiveTab] = useState('frequencies');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentFrequency, setCurrentFrequency] = useState(432);
  const [volume, setVolume] = useState(0.5);

  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  useEffect(() => {
    return () => {
      if (oscillatorRef.current) {
        oscillatorRef.current.stop();
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const initializeAudio = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    
    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }
  };

  const playFrequency = (frequency: number) => {
    initializeAudio();
    
    if (oscillatorRef.current) {
      oscillatorRef.current.stop();
    }

    const oscillator = audioContextRef.current!.createOscillator();
    const gainNode = audioContextRef.current!.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContextRef.current!.destination);
    
    oscillator.frequency.setValueAtTime(frequency, audioContextRef.current!.currentTime);
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0, audioContextRef.current!.currentTime);
    gainNode.gain.linearRampToValueAtTime(volume * 0.1, audioContextRef.current!.currentTime + 0.1);
    
    oscillator.start();
    
    oscillatorRef.current = oscillator;
    gainNodeRef.current = gainNode;
    setCurrentFrequency(frequency);
  };

  const stopFrequency = () => {
    if (oscillatorRef.current && gainNodeRef.current) {
      gainNodeRef.current.gain.linearRampToValueAtTime(0, audioContextRef.current!.currentTime + 0.1);
      setTimeout(() => {
        if (oscillatorRef.current) {
          oscillatorRef.current.stop();
        }
      }, 100);
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      stopFrequency();
    } else {
      playFrequency(currentFrequency);
    }
    setIsPlaying(!isPlaying);
  };

  const tabs = [
    { id: 'frequencies', label: 'Frequencies', icon: Waves },
    { id: 'music', label: 'AI Music', icon: Music },
    { id: 'presets', label: 'Healing Presets', icon: Heart },
    { id: 'meditation', label: 'Meditation', icon: Zap },
    { id: 'education', label: 'Learn', icon: Info },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center shadow-lg">
                <Waves className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                <Heart className="w-3 h-3 text-white" />
              </div>
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-light text-white mb-4">
            Sacred<span className="text-green-400">Sound</span>
          </h1>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto leading-relaxed">
            Healing frequencies and AI-composed music based on the work of Jonathan Goldman and Steven Halpern
          </p>
          <div className="mt-6 flex items-center justify-center space-x-4 text-sm text-blue-300">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>432Hz Tuning</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
              <span>Schumann Resonance</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
              <span>AI Healing Music</span>
            </div>
          </div>
        </header>

        {/* Navigation */}
        <nav className="mb-12">
          <div className="flex flex-wrap justify-center space-x-2 md:space-x-4">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 rounded-full transition-all duration-300 flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'bg-white text-blue-900 shadow-lg transform scale-105'
                      : 'bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* Main Content */}
        <main className="max-w-6xl mx-auto">
          {activeTab === 'frequencies' && (
            <div className="grid lg:grid-cols-2 gap-8">
              <FrequencyGenerator
                currentFrequency={currentFrequency}
                setCurrentFrequency={setCurrentFrequency}
                isPlaying={isPlaying}
                togglePlay={togglePlay}
                volume={volume}
                setVolume={setVolume}
                playFrequency={playFrequency}
              />
              <WaveVisualizer
                frequency={currentFrequency}
                isPlaying={isPlaying}
                volume={volume}
              />
            </div>
          )}

          {activeTab === 'music' && (
            <MusicLibrary
              playFrequency={playFrequency}
              stopFrequency={stopFrequency}
            />
          )}

          {activeTab === 'presets' && (
            <HealingPresets
              onPlayPreset={(frequency) => {
                setCurrentFrequency(frequency);
                playFrequency(frequency);
                setIsPlaying(true);
              }}
              onStopPreset={() => {
                stopFrequency();
                setIsPlaying(false);
              }}
              isPlaying={isPlaying}
            />
          )}

          {activeTab === 'meditation' && (
            <MeditationTimer
              playFrequency={playFrequency}
              stopFrequency={stopFrequency}
            />
          )}

          {activeTab === 'education' && <EducationalContent />}
        </main>

        {/* Footer */}
        <footer className="mt-16 text-center text-blue-300">
          <p className="text-sm">
            Inspired by the pioneering work of Jonathan Goldman and Steven Halpern
          </p>
          <p className="text-xs mt-2 opacity-70">
            Enhanced with AI-composed healing music • For educational and wellness purposes only
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;