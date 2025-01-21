// pages/index.js or wherever your "Home" component resides
'use client';
import React, { useState, useEffect, lazy, Suspense } from 'react';
import useIsMobile from '@/hooks/UseIsMobile';
import LoadingScreen from '@/components/loadingScreen';
import CloudyOverlay from '../cloudOverlay/cloudOverlay';
// import M3DCarousel from '../portofolio/3dmodelling';

// Lazy load components
const LogoPart = lazy(() => import('@/components/logo-part'));
const Navigation = lazy(() => import('@/components/navigation'));
const Prezentare = lazy(() => import('@/components/presentation'));
const GraphicDesignCarousel = lazy(() => import('@/components/portofolio/graphicDesign'));
const M3DCarousel = lazy(() => import('@/components/portofolio/3dmodelling/'));
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
          <Navigation />
          <CloudyOverlay mode="double">
            <LogoPart />
          </CloudyOverlay>
          <Prezentare />
          <GraphicDesignCarousel />
          <M3DCarousel/>
        </Suspense>
      )}
    </div>
  );
};

export default Home;
