'use client';

import React, { useMemo } from 'react';
import Carousel from '@/components/portofolio/CarouselTemplate'; // Import the Carousel component
import TitluGD from '@/components/3d-components/proiecte/titlu/titlu-gd'; // Title component

// Directly import 3D components
import DisketaAtelier from '@/components/3d-components/proiecte/gd/disketa-atelier.js';
import DisketaBlend from '@/components/3d-components/proiecte/gd/disketa-blend.js';
import DisketaCrypto from '@/components/3d-components/proiecte/gd/disketa-crypto.js';
import DisketaCulinary from '@/components/3d-components/proiecte/gd/disketa-culinary.js';
import DisketaLiftUp from '@/components/3d-components/proiecte/gd/disketa-liftup.js';
import DisketaOala from '@/components/3d-components/proiecte/gd/disketa-oala.js';
import DisketaPhotomad from '@/components/3d-components/proiecte/gd/disketa-photomad.js';
import DisketaPiggy from '@/components/3d-components/proiecte/gd/disketa-piggy.js';
import DisketaPizza from '@/components/3d-components/proiecte/gd/disketa-pizza.js';
import DisketaSteam from '@/components/3d-components/proiecte/gd/disketa-steam.js';
import DisketaTargoviste from '@/components/3d-components/proiecte/gd/disketa-targoviste.js';
import DisketaUnarte from '@/components/3d-components/proiecte/gd/disketa-unarte.js';

export default function GraphicDesignCarousel() {
  // Prepare model definitions
  const graphicDesignModels = useMemo(
    () => [
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
    ],
    []
  );

  return (
    <Carousel
      models={graphicDesignModels} // Pass the models for graphic design
      titleComponent={TitluGD} // Pass the title component
    />
  );
}
