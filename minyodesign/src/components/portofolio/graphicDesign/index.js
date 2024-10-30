'use client';

import React, { Suspense, useMemo } from 'react';
import Carousel from '@/components/portofolio/CarouselTemplate';  // Import the Carousel component
import TitluGD from '@/components/3d-components/proiecte/titlu/titlu-gd';  // The title component
import GraphicDesignMapping from './contentMapping';  // Import the content mapping
import LoadingScreen from '@/components/loadingScreen';

// Lazy loading 3D models
const DisketaAtelier = React.lazy(() => import('@/components/3d-components/proiecte/gd/disketa-atelier.js'));
const DisketaBlend = React.lazy(() => import('@/components/3d-components/proiecte/gd/disketa-blend.js'));
const DisketaCrypto = React.lazy(() => import('@/components/3d-components/proiecte/gd/disketa-crypto.js'));
const DisketaCulinary = React.lazy(() => import('@/components/3d-components/proiecte/gd/disketa-culinary.js'));
const DisketaLiftUp = React.lazy(() => import('@/components/3d-components/proiecte/gd/disketa-liftup.js'));
const DisketaOala = React.lazy(() => import('@/components/3d-components/proiecte/gd/disketa-oala.js'));
const DisketaPhotomad = React.lazy(() => import('@/components/3d-components/proiecte/gd/disketa-photomad'));
const DisketaPiggy = React.lazy(() => import('@/components/3d-components/proiecte/gd/disketa-piggy'));
const DisketaPizza = React.lazy(() => import('@/components/3d-components/proiecte/gd/disketa-pizza'));
const DisketaSteam = React.lazy(() => import('@/components/3d-components/proiecte/gd/disketa-steam'));
const DisketaTargoviste = React.lazy(() => import('@/components/3d-components/proiecte/gd/disketa-targoviste'));
const DisketaUnarte = React.lazy(() => import('@/components/3d-components/proiecte/gd/disketa-unarte'));

export default function GraphicDesignCarousel() {
  const graphicDesignModels = useMemo(() => [
    { component: DisketaAtelier, name: 'Atelier' },
    { component: DisketaBlend, name: 'Blend' },
    { component: DisketaCrypto, name: 'Crypto' },
    { component: DisketaCulinary, name: 'Culinary' },
    { component: DisketaLiftUp, name: 'LiftUp' },
    { component: DisketaOala, name: 'Oala' },
    { component: DisketaPhotomad, name: 'Photomad' },
    { component: DisketaPiggy, name: 'Piggy' },
    { component: DisketaPizza, name: 'Pizza' },
    { component: DisketaSteam, name: 'Steam' },
    { component: DisketaTargoviste, name: 'Targoviste' },
    { component: DisketaUnarte, name: 'Unarte' },
  ], []);

  return (
      <Carousel
        models={graphicDesignModels}  // Pass the models for graphic design
        mapping={GraphicDesignMapping}  // Pass the content mapping
        titleComponent={TitluGD}  // Pass the title component
      />
  );
}
