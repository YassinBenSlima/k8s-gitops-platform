import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
interface ConfettiButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  color?: 'blue' | 'green' | 'amber' | 'indigo' | 'red';
}
const ConfettiButton: React.FC<ConfettiButtonProps> = ({
  onClick,
  children,
  className = '',
  color = 'blue'
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const colorClasses = {
    blue: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500',
    green: 'bg-green-600 hover:bg-green-700 focus:ring-green-500',
    amber: 'bg-amber-600 hover:bg-amber-700 focus:ring-amber-500',
    indigo: 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500',
    red: 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
  };
  const handleClick = () => {
    setIsAnimating(true);
    // Trigger confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: {
        y: 0.6
      }
    });
    if (onClick) onClick();
    setTimeout(() => setIsAnimating(false), 600);
  };
  return (
    <motion.button
      whileHover={{
        scale: 1.05
      }}
      whileTap={{
        scale: 0.95
      }}
      animate={
      isAnimating ?
      {
        scale: [1, 1.2, 1]
      } :
      {}
      }
      transition={{
        duration: 0.5
      }}
      onClick={handleClick}
      className={`inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 ${colorClasses[color]} ${className}`}>

      {children}
    </motion.button>);

};
export default ConfettiButton;