'use client';

import React, { useMemo } from 'react';
import Carousel from '@/components/portofolio/CarouselTemplate';
import TitluM3D from '@/components/3d-components/proiecte/titlu/titlu-m3d';
import Bench from '@/components/3d-components/proiecte/m3d/bench';
import Calle from '@/components/3d-components/proiecte/m3d/calle';
import Pistol from '@/components/3d-components/proiecte/m3d/pistol';

export default function M3DCarousel() {
  const graphicDesignModels = useMemo(() => [
    { component: Bench, name: 'Bench' },
    { component: Calle, name: 'Calle' },
    { component: Pistol, name: 'Pistol' },
  ], []);

  return (
    <Carousel
      models={graphicDesignModels}
      titleComponent={TitluM3D}
    />
  );
}
