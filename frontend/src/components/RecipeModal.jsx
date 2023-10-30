import React from 'react';
import { animated, useSpring } from '@react-spring/web';

function RecipeModal({ isOpen, children, onClose }) {
  const springStyles = useSpring({
    opacity: isOpen ? 1 : 0,
    transform: isOpen ? 'translateY(0)' : 'translateY(-50px)',
    config: { tension: 220, friction: 120 }
  });

  if (!isOpen) return null;

  return (
    <div onClick={onClose} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <animated.div style={springStyles}>
        {children}
      </animated.div>
    </div>
  );
}

export default RecipeModal;
