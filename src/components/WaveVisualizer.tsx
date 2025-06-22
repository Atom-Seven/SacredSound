import React, { useRef, useEffect } from 'react';
import { Activity } from 'lucide-react';

interface WaveVisualizerProps {
  frequency: number;
  isPlaying: boolean;
  volume: number;
}

const WaveVisualizer: React.FC<WaveVisualizerProps> = ({ frequency, isPlaying, volume }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const render = (time: number) => {
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);

      // Create gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, 'rgba(59, 130, 246, 0.1)');
      gradient.addColorStop(1, 'rgba(16, 185, 129, 0.1)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      if (isPlaying) {
        // Draw sine wave
        ctx.beginPath();
        ctx.strokeStyle = `rgba(34, 197, 94, ${0.8 * volume})`;
        ctx.lineWidth = 3;

        const amplitude = (height / 4) * volume;
        const wavelength = width / (frequency / 50);
        const offset = (time * 0.005) % (2 * Math.PI);

        for (let x = 0; x < width; x++) {
          const y = height / 2 + amplitude * Math.sin((x / wavelength) * 2 * Math.PI + offset);
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();

        // Draw frequency rings
        const centerX = width / 2;
        const centerY = height / 2;
        const maxRadius = Math.min(width, height) / 3;

        for (let i = 0; i < 3; i++) {
          const radius = (maxRadius / 3) * (i + 1) * (1 + 0.1 * Math.sin(time * 0.002 + i));
          const alpha = (0.3 - i * 0.1) * volume;
          
          ctx.beginPath();
          ctx.strokeStyle = `rgba(99, 102, 241, ${alpha})`;
          ctx.lineWidth = 2 - i * 0.5;
          ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
          ctx.stroke();
        }

        // Draw particles
        const numParticles = Math.floor(frequency / 50);
        for (let i = 0; i < numParticles; i++) {
          const angle = (i / numParticles) * 2 * Math.PI + time * 0.001;
          const radius = 50 + 30 * Math.sin(time * 0.003 + i);
          const x = centerX + radius * Math.cos(angle);
          const y = centerY + radius * Math.sin(angle);
          
          ctx.beginPath();
          ctx.fillStyle = `rgba(249, 115, 22, ${0.6 * volume})`;
          ctx.arc(x, y, 2, 0, 2 * Math.PI);
          ctx.fill();
        }
      }

      animationRef.current = requestAnimationFrame(render);
    };

    animationRef.current = requestAnimationFrame(render);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [frequency, isPlaying, volume]);

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
      <div className="flex items-center space-x-3 mb-8">
        <Activity className="w-6 h-6 text-blue-400" />
        <h2 className="text-2xl font-light text-white">Wave Visualization</h2>
      </div>

      <div className="relative">
        <canvas
          ref={canvasRef}
          width={400}
          height={300}
          className="w-full h-64 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900"
        />
        
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white/60">
              <Activity className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Press play to visualize sound waves</p>
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 grid grid-cols-3 gap-4 text-center">
        <div className="bg-white/5 rounded-xl p-4">
          <div className="text-2xl font-light text-green-400">{frequency}</div>
          <div className="text-sm text-blue-200">Frequency (Hz)</div>
        </div>
        <div className="bg-white/5 rounded-xl p-4">
          <div className="text-2xl font-light text-blue-400">
            {frequency > 100 ? Math.round(frequency / 10) : frequency.toFixed(1)}
          </div>
          <div className="text-sm text-blue-200">Amplitude</div>
        </div>
        <div className="bg-white/5 rounded-xl p-4">
          <div className="text-2xl font-light text-orange-400">
            {Math.round(volume * 100)}%
          </div>
          <div className="text-sm text-blue-200">Intensity</div>
        </div>
      </div>
    </div>
  );
};

export default WaveVisualizer;