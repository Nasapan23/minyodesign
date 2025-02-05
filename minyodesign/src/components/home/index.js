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
import CarteDeVizitaPart from '../carte-vizita';
import Footer from '../footer';

const Home = () => {
  const isLoading = useGlobalLoading();

  useEffect(() => {
    if (!isLoading) {
      const hash = window.location.hash;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  }, [isLoading]);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => (document.body.style.overflow = '');
  }, [isLoading]);

  return (
    <div style={{ position: 'relative' }}>
      {isLoading && <LoadingScreen />}
      <Navigation />
      <div id="acasa">
        <CloudyOverlay mode="double">
          <LogoPart />
        </CloudyOverlay>
      </div>
      <div id="desprenoi">
        <Prezentare />
      </div>
      <div id="portofoliu">
        <GraphicDesignCarousel />
        <M3DCarousel />
      </div>
      <CarteDeVizitaPart />
      <Footer/>
    </div>
  );
};

export default Home;