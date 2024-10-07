'use client';  // Mark the component as client-side

import React from 'react';
import LogoPart from '@/components/logo-part';
import Navigation from '@/components/navigation';
import useIsMobile from '@/hooks/UseIsMobile'; // Import the custom hook
import Prezentare from '@/components/presentation';
import Portofoliu from '@/components/portofolio';

const Home = () => {
    const isMobile = useIsMobile(); // Using the custom hook

    return (
        <div>
            {/* Conditional rendering based on screen size */}
            {isMobile && <Navigation />}
            <LogoPart />
            {!isMobile && <Navigation />}
            <Prezentare />
            <Portofoliu />
        </div>
    );
};

export default Home;
