'use client';

import React, { useEffect } from 'react';
import useGlobalLoading from '@/hooks/GlobalLoading';
import LoadingScreen from '@/components/loadingScreen';
import CloudyOverlay from '../cloudOverlay/cloudOverlay';
import LogoPart from '@/components/logo-part';
import Navigation from '@/components/navigation';
import Prezentare from '@/components/presentation';
import GraphicDesignCarousel from '@/components/portofolio/graphicDesign';
import M3DCarousel from '@/components/portofolio/3dmodelling';

const Home = () => {
  const isLoading = useGlobalLoading(); // Hook to track global loading
  console.log(isLoading); // Debugging loading state

  // Disable scrolling while loading
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = ''; // Restore scrolling
    }
    return () => (document.body.style.overflow = ''); // Cleanup
  }, [isLoading]);

  return (
    <div style={{ position: 'relative' }}>
      {isLoading && <LoadingScreen />} {/* Show loading overlay */}
      
      {/* Render app content behind the loading screen */}
      <Navigation />
      <CloudyOverlay mode="double">
        <LogoPart />
      </CloudyOverlay>
      <Prezentare />
      <GraphicDesignCarousel />
      <M3DCarousel />
    </div>
  );
};

export default Home;
