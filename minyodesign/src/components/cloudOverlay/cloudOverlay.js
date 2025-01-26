'use client'
import React from 'react';
import Image from 'next/image';
import './cloudOverlay.css'; // Import CSS for animations

const CloudyOverlay = ({ children, mode = 'down' }) => {
  return (
    <div className="relative w-full h-screen overflow-hidden pointer-events-none">
      {/* Cloud Layers */}
      <div className="absolute inset-0">
        {(mode === 'down' || mode === 'double') && (
          <div className="absolute inset-0">
            {[3, 2, 1].map((layer) => (
              <div
                key={layer}
                className={`absolute inset-0 z-[${layer}] cloud-layer cloud-layer-${layer} ${
                  layer < 3 ? "drop-shadow-[10px_-10px_15px_rgba(0,0,0,0.1)]" : ""
                }`}
              >
                <Image
                  src={`/images/nor-${layer}.png`}
                  alt={`Cloud overlay ${layer}`}
                  width={1920}
                  height={1080}
                  className="cloud-image"
                />
              </div>
            ))}
          </div>
        )}

        {(mode === 'up' || mode === 'double') && (
          <div className="absolute inset-0 rotate-180">
            {[3, 2, 1].map((layer) => (
              <div
                key={layer}
                className={`absolute inset-0 z-[${layer}] cloud-layer cloud-layer-${layer} ${
                  layer < 3 ? "drop-shadow-[10px_-10px_15px_rgba(0,0,0,0.1)]" : ""
                }`}
              >
                <Image
                  src={`/images/nor-${layer}.png`}
                  alt={`Cloud overlay ${layer}`}
                  width={1920}
                  height={1080}
                  className="cloud-image"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="relative z-[4] pointer-events-auto">{children}</div>
    </div>
  );
};

export default CloudyOverlay;
