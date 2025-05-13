
// Animation utilities for the Ivy League theme
export const getRandomPosition = () => {
  return {
    x: Math.random() * 100,
    y: Math.random() * 100,
    rotation: Math.random() * 360,
    scale: 0.5 + Math.random() * 0.5
  };
};
