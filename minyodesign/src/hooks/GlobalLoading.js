'use client';

import { useEffect, useState } from 'react';
import { useProgress } from '@react-three/drei';

const useGlobalLoading = () => {
  const [isLoading, setIsLoading] = useState(true); // State to control loading status
  const { progress, active } = useProgress(); // Automatically tracks loading of 3D assets

  useEffect(() => {
    // Transition to `isLoading = false` when loading is complete
    if (!active && progress === 100) {
      const timer = setTimeout(() => {
        setIsLoading(false); // Set loading to false after assets are loaded
      }, 500); // Optional delay for smooth transition
      return () => clearTimeout(timer); // Cleanup timeout
    }
  }, [progress, active]);

  return isLoading; // Return only the isLoading state
};

export default useGlobalLoading;
