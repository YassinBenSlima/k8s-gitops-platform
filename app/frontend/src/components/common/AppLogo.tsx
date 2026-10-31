import React, { Component } from 'react';
import { motion } from 'framer-motion';
interface AppLogoProps {
  variant?: 'full' | 'icon';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animate?: boolean;
  className?: string;
  darkText?: boolean;
}
const sizeMap = {
  sm: {
    icon: 32,
    text: 'text-lg',
    gap: 'gap-2'
  },
  md: {
    icon: 44,
    text: 'text-2xl',
    gap: 'gap-2.5'
  },
  lg: {
    icon: 56,
    text: 'text-3xl',
    gap: 'gap-3'
  },
  xl: {
    icon: 80,
    text: 'text-4xl',
    gap: 'gap-4'
  }
};
export const AppLogo: React.FC<AppLogoProps> = ({
  variant = 'full',
  size = 'md',
  animate = true,
  className = '',
  darkText = false
}) => {
  const { icon: iconSize, text: textSize, gap } = sizeMap[size];
  const containerVariants = {
    hidden: {
      opacity: 0,
      scale: 0.6,
      rotate: -15
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 18,
        duration: 0.7
      }
    }
  };
  const textVariants = {
    hidden: {
      opacity: 0,
      x: -20
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.25,
        duration: 0.5,
        ease: 'easeOut'
      }
    }
  };
  const glowVariants = {
    initial: {
      opacity: 0.5,
      scale: 1
    },
    animate: {
      opacity: [0.5, 0.85, 0.5],
      scale: [1, 1.12, 1],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  };
  const sparkleVariants = {
    initial: {
      opacity: 0,
      scale: 0,
      rotate: 0
    },
    animate: {
      opacity: [0, 1, 0],
      scale: [0.5, 1.2, 0.5],
      rotate: [0, 180, 360],
      transition: {
        duration: 2.5,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: 0.8
      }
    }
  };
  const heartVariants = {
    hidden: {
      pathLength: 0,
      opacity: 0
    },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: 'easeInOut',
        delay: 0.1
      }
    }
  };
  const ecgVariants = {
    hidden: {
      pathLength: 0,
      opacity: 0
    },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: 1.5,
        ease: 'easeInOut',
        delay: 0.6
      }
    }
  };
  const scale = iconSize / 64;
  const IconComponent =
  <motion.div
    className="relative flex-shrink-0"
    style={{
      width: iconSize,
      height: iconSize
    }}
    variants={animate ? containerVariants : undefined}
    initial={animate ? 'hidden' : undefined}
    animate={animate ? 'visible' : undefined}>

      {/* Outer glow ring */}
      <motion.div
      className="absolute inset-0 rounded-2xl"
      style={{
        background:
        'linear-gradient(135deg, rgba(220,38,38,0.4) 0%, rgba(244,63,94,0.4) 100%)',
        filter: 'blur(8px)',
        borderRadius: iconSize * 0.35
      }}
      variants={animate ? glowVariants : undefined}
      initial={animate ? 'initial' : undefined}
      animate={animate ? 'animate' : undefined} />


      {/* Main icon container */}
      <div
      className="relative w-full h-full flex items-center justify-center overflow-hidden"
      style={{
        borderRadius: iconSize * 0.28,
        background:
        'linear-gradient(145deg, #b91c1c 0%, #dc2626 45%, #f43f5e 100%)',
        boxShadow:
        '0 4px 20px rgba(220,38,38,0.45), inset 0 1px 0 rgba(255,255,255,0.2)'
      }}>

        {/* Inner shine */}
        <div
        className="absolute top-0 left-0 right-0"
        style={{
          height: '45%',
          background:
          'linear-gradient(180deg, rgba(255,255,255,0.22) 0%, transparent 100%)',
          borderRadius: `${iconSize * 0.28}px ${iconSize * 0.28}px 50% 50%`
        }} />


        {/* Heart + ECG SVG */}
        <svg
        width={iconSize * 0.78}
        height={iconSize * 0.72}
        viewBox="0 0 50 46"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">

          {/* Heart shape */}
          <motion.path
          d="M25,40 C25,40 5,28 5,16 C5,10 10,6 16,6 C20,6 23,8 25,11 C27,8 30,6 34,6 C40,6 45,10 45,16 C45,28 25,40 25,40 Z"
          fill="rgba(255,255,255,0.92)"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="0.5"
          variants={animate ? heartVariants : undefined}
          initial={animate ? 'hidden' : undefined}
          animate={animate ? 'visible' : undefined} />

          {/* ECG waveform running through heart */}
          <motion.path
          d="M8,22 L14,22 L16,18 L18,26 L20,14 L22,30 L24,22 L28,22 L30,19 L32,25 L34,22 L42,22"
          stroke="rgba(220,38,38,0.85)"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          variants={animate ? ecgVariants : undefined}
          initial={animate ? 'hidden' : undefined}
          animate={animate ? 'visible' : undefined} />

        </svg>

        {/* Sparkle top-right */}
        <motion.div
        className="absolute"
        style={{
          top: iconSize * 0.08,
          right: iconSize * 0.1
        }}
        variants={animate ? sparkleVariants : undefined}
        initial={animate ? 'initial' : undefined}
        animate={animate ? 'animate' : undefined}>

          <svg
          width={iconSize * 0.22}
          height={iconSize * 0.22}
          viewBox="0 0 16 16"
          fill="none">

            <path
            d="M8 0L9.2 6.8L16 8L9.2 9.2L8 16L6.8 9.2L0 8L6.8 6.8L8 0Z"
            fill="rgba(253,224,71,0.95)" />

          </svg>
        </motion.div>

        {/* Small dot accent bottom-left */}
        <motion.div
        className="absolute rounded-full"
        style={{
          bottom: iconSize * 0.1,
          left: iconSize * 0.12,
          width: iconSize * 0.1,
          height: iconSize * 0.1,
          background: 'rgba(254,202,202,0.9)'
        }}
        initial={
        animate ?
        {
          scale: 0,
          opacity: 0
        } :
        undefined
        }
        animate={
        animate ?
        {
          scale: 1,
          opacity: 1,
          transition: {
            delay: 1.3,
            duration: 0.3
          }
        } :
        undefined
        } />

      </div>
    </motion.div>;

  if (variant === 'icon') return IconComponent;
  return (
    <div className={`flex items-center ${gap} ${className}`}>
      {IconComponent}
      <motion.div
        variants={animate ? textVariants : undefined}
        initial={animate ? 'hidden' : undefined}
        animate={animate ? 'visible' : undefined}
        className="flex flex-col leading-none">

        <span
          className={`${textSize} font-extrabold tracking-tight leading-none`}>

          <span className="text-red-500">Cardio</span>
          <span
            className={
            darkText ?
            'text-gray-800 dark:text-white' :
            'text-red-700 dark:text-red-300'
            }>

            Suite
          </span>
        </span>
      </motion.div>
    </div>);

};
export default AppLogo;