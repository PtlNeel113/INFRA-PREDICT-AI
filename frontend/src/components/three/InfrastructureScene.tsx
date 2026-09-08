import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { DEMO_INFRASTRUCTURE_NODES, AI_INTELLIGENCE_LAYERS } from '../../data/demoProjects';
import { InfrastructureModel } from './InfrastructureModel';
import { DataParticles } from './DataParticles';
import { AIIntelligenceCore } from './AIIntelligenceCore';
import { ProjectNodeTooltip } from './ProjectNodeTooltip';

interface InfrastructureSceneProps {
  isTransitioning?: boolean;
}

export const InfrastructureScene: React.FC<InfrastructureSceneProps> = ({ isTransitioning }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredNode, setHoveredNode] = useState<typeof DEMO_INFRASTRUCTURE_NODES[0] | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const prefersReducedMotion = useReducedMotion();
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useSpring(mouseY, { stiffness: 50, damping: 20 });
  const rotateY = useSpring(mouseX, { stiffness: 50, damping: 20 });

  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Subtle parallax effect
      mouseX.set((x - 0.5) * 15);
      mouseY.set((y - 0.5) * -10);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY, prefersReducedMotion]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at 50% 40%, #0C1A2E 0%, #07111F 65%, #040912 100%)',
      }}
    >
      {/* Dark Blueprint / Grid */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(21, 87, 214, 0.3) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(21, 87, 214, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />
      </div>
      
      {/* Ambient Particles - Very Subtle */}
      {!prefersReducedMotion && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{
                background: 'rgba(21, 87, 214, 0.15)',
              }}
              initial={{
                x: `${Math.random() * 100}%`,
                y: `${Math.random() * 100}%`,
                opacity: 0.1,
              }}
              animate={{
                y: [
                  `${Math.random() * 100}%`,
                  `${Math.random() * 100}%`,
                ],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      )}
      
      {/* 3D Scene Container with Perspective */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          perspective: '1000px',
          perspectiveOrigin: '50% 50%',
        }}
      >
        <motion.div
          className="relative w-full h-full max-w-5xl max-h-[600px]"
          style={{
            transformStyle: 'preserve-3d',
            rotateX: prefersReducedMotion ? 0 : rotateX,
            rotateY: prefersReducedMotion ? 0 : rotateY,
          }}
        >
          {/* Infrastructure Platform Base */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
              width: '600px',
              height: '400px',
              transformStyle: 'preserve-3d',
              transform: 'rotateX(60deg) rotateZ(-15deg)',
            }}
          >
            {/* Platform Grid */}
            <div className="absolute inset-0">
              <svg width="100%" height="100%" className="opacity-40">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path
                      d="M 40 0 L 0 0 0 40"
                      fill="none"
                      stroke="#2563EB"
                      strokeWidth="0.75"
                    />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>
            
            {/* Infrastructure Models */}
            <InfrastructureModel />
            
            {/* Project Nodes */}
            {DEMO_INFRASTRUCTURE_NODES.map((node, index) => (
              <motion.div
                key={node.id}
                className="absolute cursor-pointer group"
                style={{
                  left: `${node.x * 100}%`,
                  top: `${node.y * 100}%`,
                  transform: `translateZ(${node.z * 100}px)`,
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                onMouseEnter={() => setHoveredNode(node)}
                onMouseLeave={() => setHoveredNode(null)}
              >
                {/* Node Glow */}
                <div
                  className={`absolute -inset-4 rounded-full blur-md transition-opacity ${
                    node.riskLevel === 'CRITICAL' ? 'bg-red-500' :
                    node.riskLevel === 'HIGH' ? 'bg-orange-500' :
                    node.riskLevel === 'WATCH' ? 'bg-amber-500' :
                    'bg-emerald-500'
                  } ${hoveredNode?.id === node.id ? 'opacity-80' : 'opacity-40'}`}
                />
                
                {/* Node Core */}
                <div
                  className={`relative w-4 h-4 rounded-full border-2 border-white transition-all shadow-md ${
                    node.riskLevel === 'CRITICAL' ? 'bg-red-600' :
                    node.riskLevel === 'HIGH' ? 'bg-orange-600' :
                    node.riskLevel === 'WATCH' ? 'bg-amber-600' :
                    'bg-emerald-600'
                  } ${hoveredNode?.id === node.id ? 'scale-150' : 'scale-100'}`}
                >
                  {node.riskLevel === 'CRITICAL' && (
                    <div className="absolute inset-0 rounded-full bg-red-600 animate-ping opacity-30" />
                  )}
                </div>
                
                {/* Data Connection Lines */}
                {index < DEMO_INFRASTRUCTURE_NODES.length - 1 && (
                  <svg
                    className="absolute top-0 left-0 pointer-events-none opacity-20"
                    style={{
                      width: `${Math.abs((DEMO_INFRASTRUCTURE_NODES[index + 1].x - node.x) * 600)}px`,
                      height: `${Math.abs((DEMO_INFRASTRUCTURE_NODES[index + 1].y - node.y) * 400)}px`,
                    }}
                  >
                    <line
                      x1="0"
                      y1="0"
                      x2="100%"
                      y2="100%"
                      stroke="#1557D6"
                      strokeWidth="1"
                      strokeDasharray="4 4"
                    />
                  </svg>
                )}
              </motion.div>
            ))}
            
            {/* AI Intelligence Core */}
            <AIIntelligenceCore isTransitioning={isTransitioning} />
          </div>
          
          {/* Floating AI Intelligence Labels */}
          {AI_INTELLIGENCE_LAYERS.map((layer, index) => (
            <motion.div
              key={layer.label}
              className="absolute left-0 font-bold text-sm tracking-wider"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 0.6, x: 0 }}
              transition={{ delay: 0.5 + index * 0.15 }}
              style={{
                top: `${layer.y * 100}%`,
                transform: 'translateZ(100px)',
                textShadow: `0 0 10px ${layer.color}40`,
                color: layer.color,
              }}
            >
              {layer.label}
            </motion.div>
          ))}
          
          {/* Data Particles Flowing Through System */}
          {!prefersReducedMotion && <DataParticles isTransitioning={isTransitioning} />}
        </motion.div>
      </motion.div>
      
      {/* Project Node Tooltip */}
      {hoveredNode && (
        <ProjectNodeTooltip
          node={hoveredNode}
          position={mousePosition}
        />
      )}
    </div>
  );
};
