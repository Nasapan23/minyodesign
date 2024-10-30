"use client";
import React, { useState, useEffect, lazy, Suspense } from 'react';
import useIsMobile from '@/hooks/UseIsMobile';
import LoadingScreen from '@/components/loadingScreen';

// Lazy load components
const LogoPart = lazy(() => import('@/components/logo-part'));
const Navigation = lazy(() => import('@/components/navigation'));
const Prezentare = lazy(() => import('@/components/presentation'));
const GraphicDesignCarousel = lazy(() => import('@/components/portofolio/graphicDesign'));

const Home = () => {
  const isMobile = useIsMobile(); // Detect mobile view
  const [isLoading, setIsLoading] = useState(true); // Track loading state

  // Simulate a fixed 3-second loading delay
  useEffect(() => {
    const renderTimeout = setTimeout(() => {
      setIsLoading(false); // Hide the loading screen after 3 seconds
    }, 3000); // 3000 ms = 3 seconds

    return () => clearTimeout(renderTimeout); // Clean up timeout
  }, []);

  return (
    <div>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <Suspense fallback={<LoadingScreen />}>
          {isMobile && <Navigation />}
          <LogoPart />
          {!isMobile && <Navigation />}
          <Prezentare />
          <GraphicDesignCarousel />
        </Suspense>
      )}
    </div>
  );
};

export default Home;
