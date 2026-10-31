import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
interface SuccessAnimationProps {
  message: string;
  onComplete?: () => void;
}
const SuccessAnimation: React.FC<SuccessAnimationProps> = ({
  message,
  onComplete
}) => {
  const controls = useAnimation();
  useEffect(() => {
    const animateSequence = async () => {
      await controls.start({
        scale: [0, 1.2, 1],
        opacity: [0, 1],
        transition: {
          duration: 0.5
        }
      });
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await controls.start({
        scale: [1, 1.2, 0],
        opacity: [1, 1, 0],
        transition: {
          duration: 0.5
        }
      });
      if (onComplete) onComplete();
    };
    animateSequence();
  }, [controls, onComplete]);
  return (
    <motion.div
      initial={{
        opacity: 0
      }}
      animate={{
        opacity: 1
      }}
      exit={{
        opacity: 0
      }}
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">

      <motion.div
        animate={controls}
        className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full mx-4 flex flex-col items-center">

        <motion.div
          initial={{
            scale: 0
          }}
          animate={{
            scale: 1,
            rotate: [0, 15, -15, 0]
          }}
          transition={{
            delay: 0.2,
            duration: 0.5
          }}
          className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-4">

          <svg
            className="h-10 w-10 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">

            <motion.path
              initial={{
                pathLength: 0
              }}
              animate={{
                pathLength: 1
              }}
              transition={{
                delay: 0.3,
                duration: 0.5
              }}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7" />

          </svg>
        </motion.div>
        <motion.h3
          initial={{
            opacity: 0,
            y: 10
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            delay: 0.4
          }}
          className="text-lg font-medium text-gray-900 text-center">

          Félicitations!
        </motion.h3>
        <motion.p
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1
          }}
          transition={{
            delay: 0.6
          }}
          className="mt-2 text-center text-sm text-gray-500">

          {message}
        </motion.p>
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.8
          }}
          animate={{
            opacity: 1,
            scale: 1
          }}
          transition={{
            delay: 0.7
          }}
          className="mt-4">

          <motion.div
            className="mt-3 flex justify-center"
            initial={{
              opacity: 0
            }}
            animate={{
              opacity: 1
            }}
            transition={{
              delay: 0.8
            }}>

            <motion.div
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none"
              whileHover={{
                scale: 1.05
              }}
              whileTap={{
                scale: 0.95
              }}
              onClick={onComplete}>

              Continuer
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>);

};
export default SuccessAnimation;