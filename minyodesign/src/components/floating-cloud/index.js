'use client';
import React, { useState, useEffect } from 'react';
// Example: a custom hook that detects mobile screens, or you can implement your own logic.
import useIsMobile from "@/hooks/UseIsMobile"

export default function FloatingClouds({
  cloudNumber = 5,
  minSize = 0.7,
  maxSize = 1.2,
  minSpeed = 10,
  maxSpeed = 20
}) {
  const [clouds, setClouds] = useState([]);
  const isMobile = useIsMobile(); 
  // Or any mobile check you prefer (screen width < 768, etc.)

  // Adjust values if we're in mobile/tablet mode
  const finalCloudNumber = isMobile ? Math.floor(cloudNumber * 0.3) : cloudNumber;
  const finalMinSize = isMobile ? minSize * 0.4 : minSize;
  const finalMaxSize = isMobile ? maxSize * 0.4 : maxSize;

  useEffect(() => {
    const arr = [];
    for (let i = 0; i < finalCloudNumber; i++) {
      // Random size & speed, within user-supplied range
      const size = Math.random() * (finalMaxSize - finalMinSize) + finalMinSize;
      const speed = Math.random() * (maxSpeed - minSpeed) + minSpeed;

      // Only spawn vertical positions from 20% to 80%
      const verticalPosition = 20 + Math.random() * 60; 
      // Horizontal can remain 0–100% if you like
      const horizontalPosition = Math.random() * 100; 

      arr.push({
        id: i,
        size,
        speed,
        direction: Math.random() < 0.5 ? 1 : -1,
        initialPosition: horizontalPosition,
        verticalPosition
      });
    }
    setClouds(arr);
  }, [
    finalCloudNumber,
    finalMinSize,
    finalMaxSize,
    minSpeed,
    maxSpeed,
    isMobile
  ]);

  return (
    <div
      className="absolute top-0 left-0 w-full h-full pointer-events-none"
      style={{
        // Use 'overflow: hidden' if you want to hide them as they exit
        // or 'visible' to see the full shape even if it overflows
        overflow: 'hidden',
      }}
    >
      {clouds.map(({ id, size, speed, direction, initialPosition, verticalPosition }) => (
        <div
          key={id}
          style={{
            position: 'absolute',
            top: `${verticalPosition}%`,
            left: `${initialPosition}%`,
            width: `${size * 200}px`,
            height: `${size * 100}px`,
            animation: `floatClouds ${speed}s linear infinite`,
            animationDirection: direction === 1 ? 'normal' : 'reverse',
            // For debugging, you can add a visible border:
            // border: '1px solid red',
            boxSizing: 'border-box'
          }}
        >
          {/* SVG with drop shadow */}
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1080 713.62"
            width="100%"
            height="100%"
            style={{
              transform: `scale(${size})`,
              transformOrigin: 'center',
              filter: 'drop-shadow(4px 4px 10px rgba(0, 0, 0, 0.2))'
            }}
          >
            <style>{`.st0{fill:#fff}`}</style>
            <path
              className="st0"
              d="M1046.62 461.54c0 61.74-50.12 111.86-111.86 111.86-17.04 0-33.24-3.84-47.69-10.67-25 25.06-59.6 40.52-97.75 40.52-21.22 0-41.26-4.8-59.2-13.26-9.26 5.61-31.88 17.61-62.98 17.33-28.35-.26-49.2-10.61-58.59-16.03-21.22 13.32-46.33 20.99-73.2 20.99-24.1 0-46.79-6.21-66.54-17.04h-.06c-2.64 1.88-10.7 7.08-22.23 6.96-11.48-.11-19.4-5.43-22.02-7.36-21.56 13.94-47.24 22.01-74.83 22.01-46.16 0-86.97-22.63-112.03-57.4-20.71 19.41-48.87 31.38-79.91 31.38-63.89 0-115.64-50.51-115.64-112.76s51.75-112.76 115.64-112.76c7.17 0 14.17.62 20.94 1.86 10.16-66.31 67.38-117.1 136.52-117.1 7.56 0 15.01.62 22.29 1.81 4.4-44.58 29.91-84.71 71.34-104.07 57.51-26.86 126.19-4.51 163.1 49.83 8.63-2.03 17.72-3.1 27.09-3.1 50.91 0 93.12 31.6 101.47 73.14 6.38-1.24 12.92-1.86 19.64-1.86 43.4 0 80.59 26.36 96.45 63.89 24.94 4.97 47.46 16.7 65.58 33.18h.06c15.63-8.41 33.52-13.15 52.54-13.15 61.76 0 111.87 50.06 111.87 111.8"
            />
            <path
              className="st0"
              d="M1021.85 413.06c-2.31 33.86-41.71 58.75-88.04 55.59-13.21-.9-25.57-3.95-36.4-8.69-21.39 29.63-68.29 40.52-113.49 23.87-13.21-4.85-24.94-11.63-34.93-19.64-24.04 31.83-66.99 52.99-116.03 52.99-53.78 0-100.29-25.51-122.47-62.59-23.2 39.79-81.15 51.3-131.78 25.51-11.68-5.98-22.01-13.43-30.7-21.9-55.65 31.38-123.43 19.75-154.92-28.05-33.13-50.28-13.66-121.56 43.46-159.21 30.98-20.43 66.71-26.75 98.2-20.2-.23-2.6-.34-5.19-.34-7.84 0-60.22 55.48-109.03 123.88-109.03 49.55 0 92.33 25.62 112.14 62.59 46.33-10.84 93.91 4.29 118.8 42.1a98.4 98.4 0 0 1 11.23 23.31c16.31-1.24 33.86 1.07 51.19 7.45 32.79 12.08 56.89 35.72 66.48 61.8 6.66 1.24 13.32 3.1 19.98 5.53 16.03 5.93 29.97 14.56 41.2 24.89 16.14-11 38.55-17.04 62.81-15.41 46.32 3.16 82.04 33.13 79.73 66.93"
            />
          </svg>
        </div>
      ))}

      <style jsx>{`
        @keyframes floatClouds {
          0% {
            transform: translateX(-100vw);
          }
          100% {
            transform: translateX(100vw);
          }
        }
      `}</style>
    </div>
  );
}
