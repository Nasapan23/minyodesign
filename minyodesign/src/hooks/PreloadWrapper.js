import React, { lazy } from 'react';
import { useGLTF } from '@react-three/drei';

const preloadGLTF = (path) => {
  console.log(`[preloadGLTF]: Preloading GLTF asset at path: ${path}`);
  useGLTF.preload(path); // Preload GLTF files for progress tracking
};

// Wrapper to preload models before lazy loading the component
export const lazyWithPreload = (importCallback, preloadPaths = []) => {
  console.log(`[lazyWithPreload]: Preparing to preload assets for lazy-loaded component.`);
  
  // Preload each path and log the process
  preloadPaths.forEach((path) => {
    console.log(`[lazyWithPreload]: Preloading asset: ${path}`);
    preloadGLTF(path);
  });

  // Return the lazy-loaded component and log its dynamic import
  return lazy(async () => {
    console.log(`[lazyWithPreload]: Dynamically importing component.`);
    const module = await importCallback();
    console.log(`[lazyWithPreload]: Component imported successfully.`);
    return module;
  });
};
