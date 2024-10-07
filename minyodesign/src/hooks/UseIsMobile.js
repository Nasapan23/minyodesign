'use client';  // Mark the component as client-side
import { useState, useEffect } from 'react';

const useIsMobile = (breakpoint = 768) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Function to update state based on window size
        const checkIsMobile = () => {
            setIsMobile(window.innerWidth <= breakpoint);
        };

        // Initial check on component mount
        checkIsMobile();

        // Event listener for resizing window
        window.addEventListener('resize', checkIsMobile);

        // Cleanup the event listener on unmount
        return () => {
            window.removeEventListener('resize', checkIsMobile);
        };
    }, [breakpoint]);

    return isMobile;
};

export default useIsMobile;
