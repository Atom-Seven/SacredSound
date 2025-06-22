import React, { useState, useEffect, useRef } from 'react';
import { Clock, Play, Pause, RotateCcw, Waves } from 'lucide-react';

interface MeditationTimerProps {
  playFrequency: (frequency: number) => void;
  stopFrequency: () => void;
}

const MeditationTimer: React.FC<MeditationTimerProps> = ({ playFrequency, stopFrequency }) => {
  const [duration, setDuration] = useState(10); // minutes
  const [timeLeft, setTimeLeft] = useState(duration * 60); // seconds
  const [isActive, setIsActive] = useState(false);
  const [selectedFrequency, setSelectedFrequency] = useState(432);
  const [phase, setPhase] = useState<'preparation' | 'meditation' | 'completion'>('preparation');
  
  const intervalRef = useRef<NodeJS.Timeout>();

  const frequencies = [
    { value: 7.83, name: 'Schumann Resonance', desc: 'Earth frequency' },
    { value: 40, name: 'Gamma Waves', desc: 'Enhanced focus' },
    { value: 432, name: 'Natural Tuning', desc: 'Harmonic healing' },
    { value: 528, name: 'Love Frequency', desc: 'Heart chakra' },
    { value: 639, name: 'Connection', desc: 'Relationships' },
    { value: 741, name: 'Expression', desc: 'Throat chakra' },
  ];

  useEffect(() => {
    setTimeLeft(duration * 60);
  }, [duration]);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsActive(false);
            setPhase('completion');
            stopFrequency();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, timeLeft, stopFrequency]);

  const startTimer = () => {
    setIsActive(true);
    setPhase('meditation');
    playFrequency(selectedFrequency);
  };

  const pauseTimer = () => {
    setIsActive(false);
    stopFrequency();
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(duration * 60);
    setPhase('preparation');
    stopFrequency();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((duration * 60 - timeLeft) / (duration * 60)) * 100;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <Clock className="w-8 h-8 text-indigo-400" />
          <h2 className="text-3xl font-light text-white">Meditation Timer</h2>
        </div>
        <p className="text-blue-200">
          Guided meditation sessions with healing frequencies
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Timer Display */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
          <div className="text-center">
            <div className="relative w-48 h-48 mx-auto mb-8">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="2"
                  fill="none"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke={phase === 'meditation' ? '#10b981' : '#6366f1'}
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 45}`}
                  strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl font-light text-white mb-2">
                    {formatTime(timeLeft)}
                  </div>
                  <div className="text-sm text-blue-300 capitalize">{phase}</div>
                </div>
              </div>
            </div>

            {/* Phase Indicators */}
            <div className="flex justify-center space-x-6 mb-8">
              {['preparation', 'meditation', 'completion'].map((p) => (
                <div
                  key={p}
                  className={`flex items-center space-x-2 ${
                    phase === p ? 'text-green-400' : 'text-blue-300'
                  }`}
                >
                  <div
                    className={`w-3 h-3 rounded-full ${
                      phase === p ? 'bg-green-400' : 'bg-blue-300/30'
                    }`}
                  />
                  <span className="text-sm capitalize">{p}</span>
                </div>
              ))}
            </div>

            {/* Controls */}
            <div className="flex justify-center space-x-4">
              <button
                onClick={isActive ? pauseTimer : startTimer}
                disabled={phase === 'completion'}
                className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-2xl transition-all duration-300 flex items-center space-x-2"
              >
                {isActive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                <span>{isActive ? 'Pause' : 'Start'}</span>
              </button>
              <button
                onClick={resetTimer}
                className="bg-white/10 hover:bg-white/20 text-white font-medium py-3 px-6 rounded-2xl transition-all duration-300 flex items-center space-x-2"
              >
                <RotateCcw className="w-5 h-5" />
                <span>Reset</span>
              </button>
            </div>
          </div>
        </div>

        {/* Settings */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
          <h3 className="text-xl font-light text-white mb-6">Session Settings</h3>

          {/* Duration */}
          <div className="mb-6">
            <label className="block text-white text-sm mb-4">Duration (minutes)</label>
            <div className="flex space-x-2">
              {[5, 10, 15, 20, 30, 45].map((min) => (
                <button
                  key={min}
                  onClick={() => setDuration(min)}
                  disabled={isActive}
                  className={`px-4 py-2 rounded-xl text-sm transition-all duration-200 ${
                    duration === min
                      ? 'bg-blue-500 text-white'
                      : 'bg-white/10 text-blue-200 hover:bg-white/20'
                  } ${isActive ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {min}m
                </button>
              ))}
            </div>
          </div>

          {/* Frequency Selection */}
          <div className="mb-6">
            <label className="block text-white text-sm mb-4">Healing Frequency</label>
            <div className="space-y-2">
              {frequencies.map((freq) => (
                <button
                  key={freq.value}
                  onClick={() => setSelectedFrequency(freq.value)}
                  disabled={isActive}
                  className={`w-full p-3 rounded-xl text-left transition-all duration-200 ${
                    selectedFrequency === freq.value
                      ? 'bg-green-500/30 border border-green-400'
                      : 'bg-white/5 hover:bg-white/10 border border-white/10'
                  } ${isActive ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-white font-medium">{freq.name}</div>
                      <div className="text-blue-200 text-sm">{freq.desc}</div>
                    </div>
                    <div className="text-green-400 font-medium">{freq.value} Hz</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Current Session Info */}
          {phase === 'meditation' && (
            <div className="bg-green-500/20 border border-green-400/30 rounded-xl p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Waves className="w-4 h-4 text-green-400" />
                <span className="text-green-400 font-medium">Active Session</span>
              </div>
              <div className="text-white text-sm">
                Playing {selectedFrequency} Hz - {frequencies.find(f => f.value === selectedFrequency)?.name}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Guidance */}
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
        <h3 className="text-white text-xl font-light mb-4">Meditation Guidance</h3>
        <div className="grid md:grid-cols-3 gap-6 text-sm">
          <div>
            <h4 className="text-green-400 font-medium mb-2">Preparation</h4>
            <p className="text-blue-200">
              Find a comfortable position, close your eyes, and take three deep breaths. 
              Set your intention for this healing session.
            </p>
          </div>
          <div>
            <h4 className="text-blue-400 font-medium mb-2">Meditation</h4>
            <p className="text-blue-200">
              Focus on the healing frequency. Let the sound waves flow through your body. 
              Notice any sensations or emotions that arise.
            </p>
          </div>
          <div>
            <h4 className="text-purple-400 font-medium mb-2">Integration</h4>
            <p className="text-blue-200">
              Slowly return to awareness. Take a moment to integrate the healing energy 
              before opening your eyes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeditationTimer;