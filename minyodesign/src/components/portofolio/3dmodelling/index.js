'use client';

import React, { Suspense, useMemo } from 'react';
import Carousel from '@/components/portofolio/CarouselTemplate';  // Import the Carousel component
import TitluM3D from '@/components/3d-components/proiecte/titlu/titlu-m3d';
// Lazy loading 3D models
const DisketaAtelier = React.lazy(() => import('@/components/3d-components/proiecte/gd/disketa-atelier.js'));
const DisketaBlend = React.lazy(() => import('@/components/3d-components/proiecte/gd/disketa-blend.js'));
const DisketaCrypto = React.lazy(() => import('@/components/3d-components/proiecte/gd/disketa-crypto.js'));
const DisketaCulinary = React.lazy(() => import('@/components/3d-components/proiecte/gd/disketa-culinary.js'));

export default function M3DCarousel() {
  const graphicDesignModels = useMemo(() => [
    { component: DisketaAtelier, name: 'Atelier' },
    { component: DisketaBlend, name: 'Blend' },
    { component: DisketaCrypto, name: 'Crypto' },
    { component: DisketaCulinary, name: 'Culinary' },
  ], []);

  return (
      <Carousel
        models={graphicDesignModels}  // Pass the models for graphic design
        titleComponent={TitluM3D}  // Pass the title component
      />
  );
}
