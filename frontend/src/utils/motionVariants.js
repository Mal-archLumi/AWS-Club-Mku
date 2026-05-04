/**
 * Global Motion System
 * - Duration: 200–500ms
 * - Easing: cubic-bezier(.2,.8,.2,1)
 * - GPU transforms only (translate, scale, opacity)
 */

import React from 'react';

export const EASING = [0.2, 0.8, 0.2, 1]; // cubic-bezier(.2,.8,.2,1)

// ============================================
// 1. PAGE FLOW - Section Entry Animations
// ============================================

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: EASING },
  },
};

export const slideInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASING },
  },
};



// ============================================
// 2. ELEMENT ENTRY - Staggered Card/Text Entry
// ============================================

export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: EASING },
  },
};

export const scaleInVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: EASING },
  },
};

export const textItemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: EASING },
  },
};

// ============================================
// 3. INTERACTION - Hover/Click States
// ============================================

export const buttonHoverVariants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: { duration: 0.2, ease: EASING },
  },
  tap: {
    scale: 0.98,
    transition: { duration: 0.1, ease: EASING },
  },
};

export const cardHoverVariants = {
  rest: { y: 0, scale: 1 },
  hover: {
    y: -6,
    scale: 1.03,
    transition: { duration: 0.3, ease: EASING },
  },
};

// ============================================
// 4. TIMELINE - For About/How It Works Section
// ============================================

export const timelineContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

export const timelineItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: EASING },
  },
};

export const timelineLineVariants = {
  hidden: { scaleY: 0, opacity: 0 },
  visible: {
    scaleY: 1,
    opacity: 1,
    transition: { duration: 0.6, ease: EASING },
  },
};

// ============================================
// 5. GRID - For Projects/Portfolio
// ============================================

export const gridContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
};

export const gridItemVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.4, ease: EASING },
  },
};

// ============================================
// 6. AMBIENT MOTION - For Background Elements
// ============================================

export const ambientFloatVariants = {
  float: {
    y: [-10, 10, -10],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

export const ambientGlowVariants = {
  pulse: {
    opacity: [0.3, 0.6, 0.3],
    scale: [1, 1.05, 1],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

export const ambientGradientVariants = {
  move: {
    backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
    transition: {
      duration: 15,
      repeat: Infinity,
      ease: 'linear',
    },
  },
};

// ============================================
// 7. SCROLL-LINKED ANIMATIONS
// ============================================

export const useScrollAnimation = (ref, options = {}) => {
  const {
    threshold = 0.3,
    rootMargin = '0px',
  } = options;

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute('data-visible', 'true');
          }
        });
      },
      { threshold, rootMargin }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, threshold, rootMargin]);
};

// ============================================
// 8. STAGGER HELPERS
// ============================================

export const staggerDelay = (index, baseDelay = 0) => ({
  transition: {
    delay: baseDelay + index * 0.08,
    duration: 0.4,
    ease: EASING,
  },
});

export const createStaggerVariants = (count, baseDelay = 0) => {
  const variants = {};
  for (let i = 0; i < count; i++) {
    variants[`item-${i}`] = {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          delay: baseDelay + i * 0.08,
          duration: 0.4,
          ease: EASING,
        },
      },
    };
  }
  return variants;
};
