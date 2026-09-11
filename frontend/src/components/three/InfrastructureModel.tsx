import React from 'react';
import { motion } from 'motion/react';

export const InfrastructureModel: React.FC = () => {
  return (
    <div className="absolute inset-0" style={{ transformStyle: 'preserve-3d' }}>
      {/* Highway/Road System */}
      <motion.div
        className="absolute bg-gradient-to-r from-slate-400 via-slate-500 to-slate-400 rounded-sm"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        style={{
          left: '10%',
          top: '30%',
          width: '80%',
          height: '8px',
          transform: 'translateZ(5px)',
          boxShadow: '0 4px 12px rgba(21, 87, 214, 0.2)',
        }}
      >
        {/* Road Markings */}
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white opacity-80 transform -translate-y-1/2" 
          style={{ background: 'repeating-linear-gradient(to right, white 0px, white 20px, transparent 20px, transparent 40px)' }}
        />
      </motion.div>
      
      {/* Bridge Structure */}
      <motion.div
        className="absolute"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        style={{
          left: '40%',
          top: '25%',
          width: '20%',
          height: '3px',
          transform: 'translateZ(40px)',
        }}
      >
        <div className="w-full h-full bg-gradient-to-r from-slate-400 via-slate-500 to-slate-400 shadow-md" />
        {/* Bridge Supports */}
        {[0, 50, 100].map((pos) => (
          <div
            key={pos}
            className="absolute w-0.5 h-8 bg-slate-500"
            style={{
              left: `${pos}%`,
              bottom: '0',
              transform: 'translateY(100%)',
            }}
          />
        ))}
      </motion.div>
      
      {/* Railway Tracks */}
      <motion.div
        className="absolute"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        style={{
          left: '15%',
          top: '60%',
          width: '70%',
          height: '6px',
          transform: 'translateZ(10px)',
        }}
      >
        <div className="relative w-full h-full">
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-slate-500" />
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-500" />
          {/* Railway Sleepers */}
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-full bg-slate-400"
              style={{ left: `${(i / 15) * 100}%` }}
            />
          ))}
        </div>
      </motion.div>
      
      {/* Industrial Buildings */}
      {[
        { x: 20, y: 45, width: 30, height: 40, delay: 0.5 },
        { x: 60, y: 50, width: 25, height: 35, delay: 0.7 },
        { x: 75, y: 40, width: 20, height: 30, delay: 0.9 },
      ].map((building, index) => (
        <motion.div
          key={index}
          className="absolute bg-gradient-to-b from-slate-200 to-slate-300 border border-slate-300 rounded-xs"
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: building.delay }}
          style={{
            left: `${building.x}%`,
            top: `${building.y}%`,
            width: `${building.width}px`,
            height: `${building.height}px`,
            transformOrigin: 'bottom',
            transform: `translateZ(${15 + index * 5}px)`,
            boxShadow: '0 4px 14px rgba(166, 180, 200, 0.4)',
          }}
        >
          {/* Building Windows */}
          <div className="grid grid-cols-3 gap-1 p-1 h-full">
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                className="bg-blue-500/40 rounded-xs"
                style={{
                  animation: `windowBlink ${2 + Math.random() * 2}s infinite ${Math.random() * 2}s`,
                }}
              />
            ))}
          </div>
        </motion.div>
      ))}
      
      {/* Power/Transmission Towers */}
      {[35, 55].map((x, index) => (
        <motion.div
          key={index}
          className="absolute"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.5, delay: 0.8 + index * 0.2 }}
          style={{
            left: `${x}%`,
            top: '20%',
            width: '2px',
            height: '50px',
            transformOrigin: 'bottom',
            transform: `translateZ(25px)`,
          }}
        >
          <div className="w-full h-full bg-slate-400 relative">
            {/* Tower Cross Arms */}
            <div className="absolute top-1/4 left-1/2 w-8 h-0.5 bg-slate-400 -translate-x-1/2" />
            <div className="absolute top-1/2 left-1/2 w-12 h-0.5 bg-slate-400 -translate-x-1/2" />
            <div className="absolute top-3/4 left-1/2 w-10 h-0.5 bg-slate-400 -translate-x-1/2" />
          </div>
        </motion.div>
      ))}
      
      {/* Metro/Transport Hub */}
      <motion.div
        className="absolute"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
        style={{
          left: '45%',
          top: '70%',
          width: '40px',
          height: '40px',
          transform: 'translateZ(20px)',
        }}
      >
        <div className="relative w-full h-full">
          {/* Hub Circle */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 border-2 border-white shadow-md shadow-blue-500/30" />
          {/* Hub Center */}
          <div className="absolute inset-2 rounded-full bg-blue-700 border border-blue-300" />
          {/* Radiating Lines */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
            <div
              key={angle}
              className="absolute top-1/2 left-1/2 w-6 h-0.5 bg-blue-500 opacity-60"
              style={{
                transform: `translate(-50%, -50%) rotate(${angle}deg)`,
                transformOrigin: 'left center',
              }}
            />
          ))}
        </div>
      </motion.div>
      
      <style>{`
        @keyframes windowBlink {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </div>
  );
};
