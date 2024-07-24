import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';

interface LottieAnimationProps {
  isOpen: boolean;
  onClose: () => void;
}

const LottieAnimation: React.FC<LottieAnimationProps> = ({ isOpen, onClose }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current && isOpen) {
      const animation = lottie.loadAnimation({
        container: containerRef.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'https://lottie.host/d9bf7daa-fa56-4fb0-b506-51b08365f622/5pllNsW3UB.json',
      });

      return () => animation.destroy();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 1000
    }}>
      <div ref={containerRef} style={{ width: 200, height: 200 }}></div>
      <button onClick={onClose} style={{
        position: 'absolute',
        top: 20,
        right: 20,
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer'
      }}>
        Close
      </button>
    </div>
  );
};

export default LottieAnimation;