import React from 'react';
import { motion } from 'motion/react';

interface DataParticlesProps {
  isTransitioning?: boolean;
}

export const DataParticles: React.FC<DataParticlesProps> = ({ isTransitioning }) => {
  const particleCount = isTransitioning ? 50 : 20;
  
  return (
    <div className="absolute inset-0 pointer-events-none">
      {Array.from({ length: particleCount }).map((_, i) => {
        const startX = Math.random() * 100;
        const startY = Math.random() * 100;
        const endX = 50; // converge to center
        const endY = 50;
        
        return (
          <motion.div
            key={i}
            className="absolute w-0.5 h-0.5 rounded-full bg-blue-400"
            initial={{
              left: `${startX}%`,
              top: `${startY}%`,
              opacity: 0,
            }}
            animate={{
              left: [`${startX}%`, `${endX}%`],
              top: [`${startY}%`, `${endY}%`],
              opacity: [0, 0.8, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: isTransitioning ? 1 : 3,
              delay: Math.random() * 2,
              repeat: isTransitioning ? 0 : Infinity,
              ease: 'easeInOut',
            }}
            style={{
              boxShadow: '0 0 4px rgba(59, 130, 246, 0.8)',
            }}
          />
        );
      })}
    </div>
  );
};
