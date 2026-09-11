import React from 'react';
import { motion } from 'motion/react';

interface AIIntelligenceCoreProps {
  isTransitioning?: boolean;
}

export const AIIntelligenceCore: React.FC<AIIntelligenceCoreProps> = ({ isTransitioning }) => {
  const riskMetrics = ['COST', 'TIME', 'EXECUTION'];
  
  return (
    <div
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      style={{
        transform: 'translate(-50%, -50%) translateZ(60px)',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Core Container */}
      <div className="relative w-32 h-32">
        {/* Outer Rings */}
        {[0, 1, 2].map((ring) => (
          <motion.div
            key={ring}
            className="absolute inset-0 rounded-full border border-blue-400/30"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3,
              delay: ring * 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              transform: `scale(${1 + ring * 0.15})`,
            }}
          />
        ))}
        
        {/* Central Core */}
        <motion.div
          className="absolute inset-6 rounded-full bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 shadow-2xl"
          animate={isTransitioning ? {
            scale: [1, 1.5, 1],
            boxShadow: [
              '0 0 40px rgba(59, 130, 246, 0.6)',
              '0 0 80px rgba(59, 130, 246, 1)',
              '0 0 40px rgba(59, 130, 246, 0.6)',
            ],
          } : {}}
          transition={{
            duration: 0.8,
            times: [0, 0.5, 1],
          }}
        >
          {/* Core Glow */}
          <div className="absolute inset-0 rounded-full bg-blue-400 opacity-50 blur-xl" />
          
          {/* Inner Details */}
          <div className="relative w-full h-full rounded-full border-2 border-blue-300/50">
            {/* Center Pulse */}
            <motion.div
              className="absolute inset-2 rounded-full bg-blue-300"
              animate={{
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </div>
        </motion.div>
        
        {/* Risk Metrics Orbiting */}
        {riskMetrics.map((metric, index) => {
          const angle = (index / riskMetrics.length) * 360;
          const radius = 70;
          const x = Math.cos((angle * Math.PI) / 180) * radius;
          const y = Math.sin((angle * Math.PI) / 180) * radius;
          
          return (
            <motion.div
              key={metric}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                x,
                y,
              }}
              transition={{
                delay: 0.5 + index * 0.2,
                duration: 0.5,
              }}
            >
              <div className="relative">
                {/* Metric Badge */}
                <div className="px-2 py-0.5 bg-[#FFFFFF]/95 backdrop-blur-sm border border-[rgba(190,205,222,0.6)] rounded-md text-[10px] font-black text-[#1557D6] whitespace-nowrap shadow-[2px_2px_6px_rgba(150,168,192,0.35)]">
                  {metric}
                </div>
                
                {/* Connection Line to Core */}
                <svg
                  className="absolute top-1/2 left-1/2 pointer-events-none"
                  style={{
                    width: Math.abs(x),
                    height: Math.abs(y),
                    transform: `translate(${x > 0 ? '-100%' : '0%'}, ${y > 0 ? '-100%' : '0%'})`,
                  }}
                >
                  <line
                    x1={x > 0 ? '100%' : '0%'}
                    y1={y > 0 ? '100%' : '0%'}
                    x2={x > 0 ? '0%' : '100%'}
                    y2={y > 0 ? '0%' : '100%'}
                    stroke="#60A5FA"
                    strokeWidth="1"
                    strokeDasharray="2 2"
                    opacity="0.4"
                  />
                </svg>
              </div>
            </motion.div>
          );
        })}
        
        {/* Output Labels */}
        {isTransitioning && (
          <motion.div
            className="absolute left-1/2 top-full mt-8 -translate-x-1/2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="text-center space-y-1">
              <div className="text-xs font-bold text-emerald-400 tracking-wider">
                PROJECT HEALTH
              </div>
              <div className="text-xs text-blue-300">↓</div>
              <div className="text-xs font-bold text-amber-400 tracking-wider">
                EARLY WARNING
              </div>
              <div className="text-xs text-blue-300">↓</div>
              <div className="text-xs font-bold text-emerald-400 tracking-wider">
                ACTION
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
