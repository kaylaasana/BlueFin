import React from 'react';
import { Canvas } from '@react-three/fiber';
import { AudioAnalyser } from 'three';

function Visualizer() {
  return (
    <div>
      <Canvas
        style={{
          width: '100vw',
          height: 'calc(100vh - 80px)',
          backgroundColor: 'black',
        }}></Canvas>
    </div>
  );
}
