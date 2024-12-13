"use client";
import React, { useState, useEffect, lazy, Suspense } from 'react';
import useIsMobile from '@/hooks/UseIsMobile';
import LoadingScreen from '@/components/loadingScreen';
import CloudyOverlay from '../cloudOverlay/cloudOverlay';

// Lazy load components
const LogoPart = lazy(() => import('@/components/logo-part'));
const Navigation = lazy(() => import('@/components/navigation'));
const Prezentare = lazy(() => import('@/components/presentation'));
const GraphicDesignCarousel = lazy(() => import('@/components/portofolio/graphicDesign'));

const Home = () => {
  const isMobile = useIsMobile();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const renderTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(renderTimeout);
  }, []);

  return (
    <div>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <Suspense fallback={<LoadingScreen />}>
          <CloudyOverlay mode='double'>
          <Navigation />
          <LogoPart />
          </CloudyOverlay>
          <Prezentare />
          <GraphicDesignCarousel />
        </Suspense>
      )}
    </div>
  );
};

export default Home;
