'use client';

import React, { useMemo } from 'react';
import Carousel from '@/components/portofolio/CarouselTemplate'; // Import the Carousel component
import TitluGD from '@/components/3d-components/proiecte/titlu/titlu-gd'; // Title component

// Directly import 3D components
import DisketaAtelier from '@/components/3d-components/proiecte/gd/disketa-atelier.js';
import DisketaCrypto from '@/components/3d-components/proiecte/gd/disketa-crypto.js';
import DisketaCulinary from '@/components/3d-components/proiecte/gd/disketa-culinary.js';
import DisketaOala from '@/components/3d-components/proiecte/gd/disketa-oala.js';
import DisketaPhotomad from '@/components/3d-components/proiecte/gd/disketa-photomad.js';
import DisketaPiggy from '@/components/3d-components/proiecte/gd/disketa-piggy.js';
import DisketaPizza from '@/components/3d-components/proiecte/gd/disketa-pizza.js';
import DisketaTargoviste from '@/components/3d-components/proiecte/gd/disketa-targoviste.js';
import DisketaUnarte from '@/components/3d-components/proiecte/gd/disketa-unarte.js';
import DisketaArtfun from '@/components/3d-components/proiecte/gd/disketa-artfun';
import DisketaComcaffee
 from '@/components/3d-components/proiecte/gd/disketa-comcaffee';
export default function GraphicDesignCarousel() {
  // Prepare model definitions
  const graphicDesignModels = useMemo(
    () => [
      { component: DisketaAtelier, name: 'Atelier' },
      { component: DisketaArtfun, name: 'Artfun' },
      { component: DisketaComcaffee, name: 'Comcaffee' },
      { component: DisketaCrypto, name: 'Crypto' },
      { component: DisketaCulinary, name: 'Culinary' },
      { component: DisketaOala, name: 'Oala' },
      { component: DisketaPhotomad, name: 'Photomad' },
      { component: DisketaPiggy, name: 'Piggy' },
      { component: DisketaPizza, name: 'Pizza' },
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
