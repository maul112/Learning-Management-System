import { Variants } from 'framer-motion';

export const containerVariant: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.5,
    },
  },
};

export const itemFadeUpVariant: Variants = {
  hidden: { y: 20, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      type: 'spring',
      stiffness: 200,
      damping: 20,
    },
  },
};

export const itemFadeRightVariant: Variants = {
  hidden: { x: -20, opacity: 0 },
  show: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      type: 'spring',
      stiffness: 200,
      damping: 20,
    },
  },
};

export const itemZoomVariant: Variants = {
  hidden: { scale: 0, opacity: 0 },
  show: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.5,
      type: 'spring',
      stiffness: 200,
      damping: 20,
    },
  },
};
