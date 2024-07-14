import React from 'react';

export function useScreenSize(ContainerSessionRef: HTMLDivElement) {
  const [screenSize, setScreenSize] = React.useState<{ x: number; y: number }>({
    x: 370 | 370,
    y: 720 | 720,
  });

  const updateScreenSize = () => {
    if (ContainerSessionRef.current) {
      const rect = ContainerSessionRef.current.getBoundingClientRect();
      setScreenSize({ x: rect.width, y: rect.height });
    }
  };
  React.useEffect(() => {
    updateScreenSize(); // Initial size update
    window.addEventListener('resize', updateScreenSize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', updateScreenSize);
    };
  }, []);

  return screenSize;
}
