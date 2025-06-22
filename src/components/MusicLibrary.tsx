import React, { useState, useRef, useEffect } from 'react';
import { Music, Play, Pause, SkipForward, SkipBack, Volume2, Heart, Zap, Waves, Clock, Star } from 'lucide-react';

interface Track {
  id: string;
  title: string;
  artist: string;
  duration: string;
  frequency: number;
  intention: string;
  category: 'goldman' | 'halpern' | 'fusion';
  description: string;
  benefits: string[];
  chakra?: string;
  brainwave?: string;
}

interface MusicLibraryProps {
  playFrequency: (frequency: number) => void;
  stopFrequency: () => void;
}

const MusicLibrary: React.FC<MusicLibraryProps> = ({ playFrequency, stopFrequency }) => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'goldman' | 'halpern' | 'fusion'>('all');
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const tracks: Track[] = [
    // Jonathan Goldman Inspired
    {
      id: 'jg-1',
      title: 'Sacred Vowel Harmonics',
      artist: 'AI Composer (Goldman Style)',
      duration: '12:34',
      frequency: 528,
      intention: 'DNA Healing & Love',
      category: 'goldman',
      description: 'Vocal toning sequences using sacred vowel sounds combined with 528Hz love frequency',
      benefits: ['DNA repair', 'Heart chakra activation', 'Emotional healing', 'Stress relief'],
      chakra: 'Heart',
      brainwave: 'Alpha'
    },
    {
      id: 'jg-2',
      title: 'Chakra Toning Symphony',
      artist: 'AI Composer (Goldman Style)',
      duration: '21:11',
      frequency: 432,
      intention: 'Chakra Alignment',
      category: 'goldman',
      description: 'Progressive toning through all seven chakras with harmonic overtones',
      benefits: ['Chakra balancing', 'Energy alignment', 'Spiritual awakening', 'Inner harmony'],
      chakra: 'All Chakras',
      brainwave: 'Theta'
    },
    {
      id: 'jg-3',
      title: 'Psychoacoustic Healing',
      artist: 'AI Composer (Goldman Style)',
      duration: '18:45',
      frequency: 741,
      intention: 'Expression & Detox',
      category: 'goldman',
      description: 'Frequency-specific healing tones for cellular detoxification and self-expression',
      benefits: ['Detoxification', 'Enhanced expression', 'Problem solving', 'Throat chakra healing'],
      chakra: 'Throat',
      brainwave: 'Beta'
    },

    // Steven Halpern Inspired
    {
      id: 'sh-1',
      title: 'Deep Alpha Resonance',
      artist: 'AI Composer (Halpern Style)',
      duration: '25:30',
      frequency: 432,
      intention: 'Deep Relaxation',
      category: 'halpern',
      description: 'Anti-frantic alternative music designed to induce alpha brainwave states',
      benefits: ['Deep relaxation', 'Stress reduction', 'Mental clarity', 'Peaceful sleep'],
      brainwave: 'Alpha'
    },
    {
      id: 'sh-2',
      title: 'Spectrum of Healing',
      artist: 'AI Composer (Halpern Style)',
      duration: '32:15',
      frequency: 528,
      intention: 'Holistic Healing',
      category: 'halpern',
      description: 'Full spectrum healing frequencies woven into ambient musical landscapes',
      benefits: ['Holistic healing', 'Emotional balance', 'Physical restoration', 'Spiritual connection'],
      brainwave: 'Theta'
    },
    {
      id: 'sh-3',
      title: 'Brainwave Entrainment Suite',
      artist: 'AI Composer (Halpern Style)',
      duration: '28:42',
      frequency: 7.83,
      intention: 'Consciousness Expansion',
      category: 'halpern',
      description: 'Psychoacoustic compositions designed for brainwave synchronization',
      benefits: ['Enhanced focus', 'Expanded consciousness', 'Meditation support', 'Mental coherence'],
      brainwave: 'Gamma'
    },

    // Fusion Compositions
    {
      id: 'fusion-1',
      title: 'Goldman-Halpern Synthesis',
      artist: 'AI Composer (Fusion)',
      duration: '35:20',
      frequency: 432,
      intention: 'Unified Healing',
      category: 'fusion',
      description: 'Combining vocal toning with ambient soundscapes for comprehensive healing',
      benefits: ['Complete healing', 'Mind-body integration', 'Spiritual awakening', 'Deep transformation'],
      chakra: 'Crown',
      brainwave: 'Theta'
    },
    {
      id: 'fusion-2',
      title: 'Schumann Earth Resonance',
      artist: 'AI Composer (Fusion)',
      duration: '41:33',
      frequency: 7.83,
      intention: 'Grounding & Connection',
      category: 'fusion',
      description: 'Earth frequency combined with healing vocals and ambient textures',
      benefits: ['Grounding', 'Earth connection', 'Anxiety relief', 'Natural rhythm alignment'],
      chakra: 'Root',
      brainwave: 'Alpha'
    },
    {
      id: 'fusion-3',
      title: 'Quantum Healing Frequencies',
      artist: 'AI Composer (Fusion)',
      duration: '29:17',
      frequency: 963,
      intention: 'Spiritual Awakening',
      category: 'fusion',
      description: 'High-frequency tones for pineal gland activation and spiritual awakening',
      benefits: ['Pineal activation', 'Spiritual insight', 'Higher consciousness', 'Divine connection'],
      chakra: 'Crown',
      brainwave: 'Gamma'
    }
  ];

  const filteredTracks = selectedCategory === 'all' 
    ? tracks 
    : tracks.filter(track => track.category === selectedCategory);

  const categories = [
    { id: 'all', name: 'All Tracks', icon: Music },
    { id: 'goldman', name: 'Goldman Style', icon: Waves },
    { id: 'halpern', name: 'Halpern Style', icon: Heart },
    { id: 'fusion', name: 'Fusion', icon: Zap }
  ];

  const playTrack = (track: Track) => {
    if (currentTrack?.id === track.id && isPlaying) {
      setIsPlaying(false);
      stopFrequency();
    } else {
      setCurrentTrack(track);
      setIsPlaying(true);
      playFrequency(track.frequency);
      setCurrentTime(0);
    }
  };

  const togglePlayPause = () => {
    if (currentTrack) {
      if (isPlaying) {
        setIsPlaying(false);
        stopFrequency();
      } else {
        setIsPlaying(true);
        playFrequency(currentTrack.frequency);
      }
    }
  };

  const nextTrack = () => {
    if (currentTrack) {
      const currentIndex = filteredTracks.findIndex(t => t.id === currentTrack.id);
      const nextIndex = (currentIndex + 1) % filteredTracks.length;
      playTrack(filteredTracks[nextIndex]);
    }
  };

  const previousTrack = () => {
    if (currentTrack) {
      const currentIndex = filteredTracks.findIndex(t => t.id === currentTrack.id);
      const prevIndex = currentIndex === 0 ? filteredTracks.length - 1 : currentIndex - 1;
      playTrack(filteredTracks[prevIndex]);
    }
  };

  // Simulate audio progress
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && currentTrack) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          const duration = parseInt(currentTrack.duration.split(':')[0]) * 60 + parseInt(currentTrack.duration.split(':')[1]);
          if (prev >= duration) {
            nextTrack();
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentTrack]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'goldman': return 'from-green-500 to-emerald-500';
      case 'halpern': return 'from-blue-500 to-indigo-500';
      case 'fusion': return 'from-purple-500 to-pink-500';
      default: return 'from-gray-500 to-slate-500';
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <Music className="w-8 h-8 text-green-400" />
          <h2 className="text-3xl font-light text-white">AI Healing Music Library</h2>
        </div>
        <p className="text-blue-200 max-w-2xl mx-auto">
          AI-composed healing music inspired by Jonathan Goldman and Steven Halpern's pioneering work
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center space-x-2 mb-8">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id as any)}
              className={`px-6 py-3 rounded-full transition-all duration-300 flex items-center space-x-2 ${
                selectedCategory === category.id
                  ? 'bg-green-500 text-white shadow-lg'
                  : 'bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{category.name}</span>
            </button>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Track List */}
        <div className="lg:col-span-2 space-y-4">
          {filteredTracks.map((track) => (
            <div
              key={track.id}
              className={`bg-white/10 backdrop-blur-lg rounded-2xl p-6 border transition-all duration-300 cursor-pointer hover:bg-white/15 ${
                currentTrack?.id === track.id
                  ? 'border-green-400 bg-green-500/10'
                  : 'border-white/20'
              }`}
              onClick={() => playTrack(track)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${getCategoryColor(track.category)} flex items-center justify-center`}>
                      {currentTrack?.id === track.id && isPlaying ? (
                        <Pause className="w-6 h-6 text-white" />
                      ) : (
                        <Play className="w-6 h-6 text-white" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-white font-medium">{track.title}</h3>
                      <p className="text-blue-300 text-sm">{track.artist}</p>
                    </div>
                  </div>
                  
                  <p className="text-blue-200 text-sm mb-3">{track.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs">
                      {track.frequency} Hz
                    </span>
                    <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full text-xs">
                      {track.intention}
                    </span>
                    {track.chakra && (
                      <span className="bg-purple-500/20 text-purple-400 px-2 py-1 rounded-full text-xs">
                        {track.chakra}
                      </span>
                    )}
                    {track.brainwave && (
                      <span className="bg-orange-500/20 text-orange-400 px-2 py-1 rounded-full text-xs">
                        {track.brainwave} Waves
                      </span>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap gap-1">
                    {track.benefits.slice(0, 3).map((benefit, index) => (
                      <span key={index} className="text-blue-300 text-xs">
                        {benefit}{index < 2 && index < track.benefits.length - 1 ? ' • ' : ''}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-blue-300 text-sm mb-2">{track.duration}</div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-yellow-400 text-sm">AI</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Now Playing & Controls */}
        <div className="space-y-6">
          {/* Current Track Info */}
          {currentTrack && (
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20">
              <h3 className="text-white font-medium mb-2">Now Playing</h3>
              <div className={`w-full h-32 rounded-2xl bg-gradient-to-br ${getCategoryColor(currentTrack.category)} mb-4 flex items-center justify-center`}>
                <Music className="w-12 h-12 text-white/80" />
              </div>
              <h4 className="text-white font-medium mb-1">{currentTrack.title}</h4>
              <p className="text-blue-300 text-sm mb-4">{currentTrack.artist}</p>
              
              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-xs text-blue-300 mb-2">
                  <span>{formatTime(currentTime)}</span>
                  <span>{currentTrack.duration}</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-green-400 to-blue-400 h-2 rounded-full transition-all duration-1000"
                    style={{ 
                      width: `${(currentTime / (parseInt(currentTrack.duration.split(':')[0]) * 60 + parseInt(currentTrack.duration.split(':')[1]))) * 100}%` 
                    }}
                  ></div>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center space-x-4 mb-4">
                <button
                  onClick={previousTrack}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <SkipBack className="w-5 h-5 text-white" />
                </button>
                <button
                  onClick={togglePlayPause}
                  className="p-3 rounded-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 transition-all"
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6 text-white" />
                  ) : (
                    <Play className="w-6 h-6 text-white" />
                  )}
                </button>
                <button
                  onClick={nextTrack}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <SkipForward className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Volume */}
              <div className="flex items-center space-x-3">
                <Volume2 className="w-4 h-4 text-white" />
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="flex-1 h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>
            </div>
          )}

          {/* Healing Principles */}
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20">
            <h3 className="text-white font-medium mb-4">Healing Principles</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Waves className="w-5 h-5 text-green-400 mt-1" />
                <div>
                  <h4 className="text-green-400 font-medium text-sm">Goldman Formula</h4>
                  <p className="text-blue-200 text-xs">Frequency + Intent = Healing</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Heart className="w-5 h-5 text-blue-400 mt-1" />
                <div>
                  <h4 className="text-blue-400 font-medium text-sm">Halpern Method</h4>
                  <p className="text-blue-200 text-xs">Anti-Frantic Alternative Music</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Zap className="w-5 h-5 text-purple-400 mt-1" />
                <div>
                  <h4 className="text-purple-400 font-medium text-sm">AI Synthesis</h4>
                  <p className="text-blue-200 text-xs">Combined wisdom in new compositions</p>
                </div>
              </div>
            </div>
          </div>

          {/* Track Benefits */}
          {currentTrack && (
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20">
              <h3 className="text-white font-medium mb-4">Track Benefits</h3>
              <div className="space-y-2">
                {currentTrack.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Heart className="w-4 h-4 text-pink-400" />
                    <span className="text-blue-200 text-sm">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MusicLibrary;