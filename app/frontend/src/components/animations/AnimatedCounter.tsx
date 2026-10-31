import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
interface AnimatedCounterProps {
  value: number;
  duration?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
  decimalPlaces?: number;
}
const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  duration = 1.5,
  className = '',
  prefix = '',
  suffix = '',
  decimalPlaces = 0
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const controls = useAnimation();
  useEffect(() => {
    let startTimestamp: number | null = null;
    const startValue = displayValue;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min(
        (timestamp - startTimestamp) / (duration * 1000),
        1
      );
      const currentValue = progress * (value - startValue) + startValue;
      setDisplayValue(currentValue);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
    controls.start({
      scale: [1, 1.1, 1],
      transition: {
        duration: 0.3
      }
    });
  }, [value, duration, controls, displayValue]);
  const formatValue = (val: number) => {
    return val.toFixed(decimalPlaces);
  };
  return (
    <motion.span animate={controls} className={className}>
      {prefix}
      {formatValue(displayValue)}
      {suffix}
    </motion.span>);

};
export default AnimatedCounter;