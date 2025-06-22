import React, { useState } from 'react';
import { BookOpen, Lightbulb, Users, Zap, Heart, Waves } from 'lucide-react';

const EducationalContent: React.FC = () => {
  const [activeSection, setActiveSection] = useState('pioneers');

  const sections = [
    { id: 'pioneers', title: 'The Pioneers', icon: Users },
    { id: 'science', title: 'The Science', icon: Lightbulb },
    { id: 'frequencies', title: 'Sacred Frequencies', icon: Waves },
    { id: 'practice', title: 'Practice Guide', icon: Heart },
  ];

  const pioneerInfo = [
    {
      name: 'Jonathan Goldman',
      role: 'Sound Healer & Author',
      contribution: 'Frequency + Intent = Healing',
      description: 'Pioneer in sound healing who developed the formula that healing occurs through the combination of frequency and intention. Author of "Healing Sounds" and founder of the Sound Healers Association.',
      keyWorks: ['Healing Sounds', 'The 7 Secrets of Sound Healing', 'Sound Healing for Beginners'],
      principles: [
        'Frequency + Intent = Healing',
        'Vocalization as therapy',
        'Chakra toning techniques',
        'Psychoacoustic healing'
      ]
    },
    {
      name: 'Steven Halpern',
      role: 'Composer & Researcher',
      contribution: 'Anti-Frantic Alternative Music',
      description: 'Grammy-nominated composer who created "Anti-Frantic Alternative" music specifically designed for healing and relaxation. Pioneer in the field of sound healing and therapeutic music.',
      keyWorks: ['Spectrum Suite', 'Deep Alpha', 'Chakra Suite'],
      principles: [
        'Music as medicine',
        'Brainwave entrainment',
        'Frequency-specific healing',
        'Psychoacoustic principles'
      ]
    }
  ];

  const frequencyData = [
    {
      frequency: '7.83 Hz',
      name: 'Schumann Resonance',
      description: 'The Earth\'s natural electromagnetic frequency, often called the "heartbeat of the Earth". This frequency is associated with deep meditation states and connection to nature.',
      effects: ['Grounding', 'Reduced anxiety', 'Enhanced meditation', 'Improved focus'],
      chakra: 'Root Chakra',
      color: 'Red'
    },
    {
      frequency: '432 Hz',
      name: 'Natural Tuning',
      description: 'Considered the natural tuning frequency that resonates with the golden ratio and natural patterns. Said to promote healing and reduce stress.',
      effects: ['Harmonic resonance', 'Stress reduction', 'Enhanced creativity', 'Emotional balance'],
      chakra: 'Heart Chakra',
      color: 'Green'
    },
    {
      frequency: '528 Hz',
      name: 'Love Frequency',
      description: 'Known as the "Love Frequency" or "Miracle Tone", this frequency is associated with DNA repair and transformation.',
      effects: ['DNA repair', 'Emotional healing', 'Increased love', 'Spiritual growth'],
      chakra: 'Heart Chakra',
      color: 'Green'
    },
    {
      frequency: '741 Hz',
      name: 'Expression',
      description: 'Associated with self-expression, creativity, and solving problems. Helps in cleansing infections and toxins.',
      effects: ['Enhanced expression', 'Problem solving', 'Detoxification', 'Awakening intuition'],
      chakra: 'Throat Chakra',
      color: 'Blue'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <BookOpen className="w-8 h-8 text-blue-400" />
          <h2 className="text-3xl font-light text-white">Sound Healing Education</h2>
        </div>
        <p className="text-blue-200 max-w-2xl mx-auto">
          Explore the science and practice of sound healing through the work of leading pioneers
        </p>
      </div>

      {/* Navigation */}
      <div className="flex flex-wrap justify-center space-x-2 mb-8">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`px-6 py-3 rounded-full transition-all duration-300 flex items-center space-x-2 ${
                activeSection === section.id
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{section.title}</span>
            </button>
          );
        })}
      </div>

      {/* Content Sections */}
      {activeSection === 'pioneers' && (
        <div className="space-y-8">
          {pioneerInfo.map((pioneer, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-light text-white mb-2">{pioneer.name}</h3>
                  <p className="text-blue-300 mb-4">{pioneer.role}</p>
                  <div className="bg-gradient-to-r from-blue-500/20 to-green-500/20 rounded-2xl p-4 mb-6">
                    <p className="text-green-400 font-medium text-lg">"{pioneer.contribution}"</p>
                  </div>
                  <p className="text-blue-200 leading-relaxed">{pioneer.description}</p>
                </div>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-white font-medium mb-3">Key Works</h4>
                    <ul className="space-y-2">
                      {pioneer.keyWorks.map((work, i) => (
                        <li key={i} className="flex items-center space-x-2">
                          <BookOpen className="w-4 h-4 text-blue-400" />
                          <span className="text-blue-200">{work}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-3">Core Principles</h4>
                    <ul className="space-y-2">
                      {pioneer.principles.map((principle, i) => (
                        <li key={i} className="flex items-center space-x-2">
                          <Zap className="w-4 h-4 text-green-400" />
                          <span className="text-blue-200">{principle}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeSection === 'science' && (
        <div className="space-y-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
            <h3 className="text-2xl font-light text-white mb-6">The Science of Sound Healing</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-green-400 font-medium mb-4">Resonance & Entrainment</h4>
                <p className="text-blue-200 mb-4">
                  Everything in the universe vibrates at specific frequencies. When we expose our bodies to healing frequencies, 
                  our cells begin to resonate with these vibrations, promoting balance and healing.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center space-x-2">
                    <Waves className="w-4 h-4 text-blue-400" />
                    <span className="text-blue-200">Cellular resonance alignment</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Waves className="w-4 h-4 text-blue-400" />
                    <span className="text-blue-200">Brainwave entrainment</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Waves className="w-4 h-4 text-blue-400" />
                    <span className="text-blue-200">Sympathetic vibration</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-purple-400 font-medium mb-4">Neurological Effects</h4>
                <p className="text-blue-200 mb-4">
                  Sound frequencies directly influence brainwave patterns, potentially inducing states of relaxation, 
                  focus, or healing through brainwave entrainment.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center space-x-2">
                    <Zap className="w-4 h-4 text-yellow-400" />
                    <span className="text-blue-200">Alpha waves (8-12 Hz) - Relaxation</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Zap className="w-4 h-4 text-yellow-400" />
                    <span className="text-blue-200">Theta waves (4-8 Hz) - Meditation</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Zap className="w-4 h-4 text-yellow-400" />
                    <span className="text-blue-200">Gamma waves (30+ Hz) - Focus</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
            <h3 className="text-2xl font-light text-white mb-6">Schumann Resonance</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="col-span-2">
                <p className="text-blue-200 mb-4">
                  The Schumann resonances are a set of spectrum peaks in the extremely low frequency (ELF) portion of the Earth's 
                  electromagnetic field spectrum. These resonances are excited by lightning discharges in the cavity formed by the 
                  Earth's surface and the ionosphere.
                </p>
                <p className="text-blue-200">
                  The fundamental frequency of 7.83 Hz is often called the Earth's "heartbeat" and has been shown to influence human 
                  brainwave patterns, potentially promoting states of calm and connection with nature.
                </p>
              </div>
              <div className="bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-2xl p-6">
                <h4 className="text-green-400 font-medium mb-4">Key Frequencies</h4>
                <ul className="space-y-2 text-sm">
                  <li className="text-blue-200">7.83 Hz - Fundamental</li>
                  <li className="text-blue-200">14.3 Hz - Second mode</li>
                  <li className="text-blue-200">20.8 Hz - Third mode</li>
                  <li className="text-blue-200">27.3 Hz - Fourth mode</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeSection === 'frequencies' && (
        <div className="grid md:grid-cols-2 gap-6">
          {frequencyData.map((freq, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-light text-white">{freq.name}</h3>
                <div className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {freq.frequency}
                </div>
              </div>
              <p className="text-blue-200 mb-4 text-sm">{freq.description}</p>
              <div className="space-y-3">
                <div>
                  <h4 className="text-green-400 font-medium mb-2">Effects</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {freq.effects.map((effect, i) => (
                      <div key={i} className="flex items-center space-x-2">
                        <Heart className="w-3 h-3 text-pink-400" />
                        <span className="text-blue-200 text-sm">{effect}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-white/10">
                  <span className="text-blue-300 text-sm">Chakra: {freq.chakra}</span>
                  <div className={`w-4 h-4 rounded-full bg-${freq.color.toLowerCase()}-500`}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeSection === 'practice' && (
        <div className="space-y-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
            <h3 className="text-2xl font-light text-white mb-6">Getting Started with Sound Healing</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <h4 className="text-green-400 font-medium">Beginner</h4>
                <ul className="space-y-2 text-sm">
                  <li className="text-blue-200">• Start with 5-10 minute sessions</li>
                  <li className="text-blue-200">• Use 432 Hz for relaxation</li>
                  <li className="text-blue-200">• Focus on breathing</li>
                  <li className="text-blue-200">• Keep a journal</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="text-blue-400 font-medium">Intermediate</h4>
                <ul className="space-y-2 text-sm">
                  <li className="text-blue-200">• Extend to 15-20 minutes</li>
                  <li className="text-blue-200">• Experiment with different frequencies</li>
                  <li className="text-blue-200">• Practice visualization</li>
                  <li className="text-blue-200">• Combine with meditation</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="text-purple-400 font-medium">Advanced</h4>
                <ul className="space-y-2 text-sm">
                  <li className="text-blue-200">• 30+ minute sessions</li>
                  <li className="text-blue-200">• Binaural beats practice</li>
                  <li className="text-blue-200">• Chakra-specific work</li>
                  <li className="text-blue-200">• Intention setting</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
            <h3 className="text-2xl font-light text-white mb-6">Best Practices</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-green-400 font-medium mb-4">Do's</h4>
                <ul className="space-y-2">
                  <li className="flex items-center space-x-2">
                    <Heart className="w-4 h-4 text-green-400" />
                    <span className="text-blue-200">Create a quiet, comfortable space</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Heart className="w-4 h-4 text-green-400" />
                    <span className="text-blue-200">Start with lower volumes</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Heart className="w-4 h-4 text-green-400" />
                    <span className="text-blue-200">Be consistent with practice</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Heart className="w-4 h-4 text-green-400" />
                    <span className="text-blue-200">Listen to your body</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-red-400 font-medium mb-4">Don'ts</h4>
                <ul className="space-y-2">
                  <li className="flex items-center space-x-2">
                    <Zap className="w-4 h-4 text-red-400" />
                    <span className="text-blue-200">Don't use high volumes initially</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Zap className="w-4 h-4 text-red-400" />
                    <span className="text-blue-200">Avoid during pregnancy without consultation</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Zap className="w-4 h-4 text-red-400" />
                    <span className="text-blue-200">Don't force experiences</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Zap className="w-4 h-4 text-red-400" />
                    <span className="text-blue-200">Avoid if you have epilepsy</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EducationalContent;