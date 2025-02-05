'use client';

import React, { useMemo } from 'react';
import Carousel from '@/components/portofolio/CarouselTemplate';
import TitluM3D from '@/components/3d-components/proiecte/titlu/titlu-m3d';
import Bench from '@/components/3d-components/proiecte/m3d/bench';
import Calle from '@/components/3d-components/proiecte/m3d/calle';
import Muzzle from '@/components/3d-components/proiecte/m3d/muzzle';
import UPS from '@/components/3d-components/proiecte/m3d/ups';
import Pistol from '@/components/3d-components/proiecte/m3d/pistol';
export default function M3DCarousel() {
  const graphicDesignModels = useMemo(() => [
    { component: Bench, name: 'Bench' },
    { component: Calle, name: 'Calle' },
    { component: Muzzle, name: 'Muzzle' },
    { component: UPS , name: 'UPS' },
  ],
[]);

  return (
    <Carousel
      models={graphicDesignModels}
      titleComponent={TitluM3D}
    />
  );
}
