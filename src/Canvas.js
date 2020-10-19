import React, { Suspense, lazy } from "react";
import { Canvas } from "react-three-fiber";

import { useTransition, a } from "react-spring/three";
import { Html } from "@react-three/drei/Html";
import { useProgress } from "@react-three/drei/useProgress";

import Pointer from "./Pointer";
import Camera from "./Camera";
import Effects from "./Effects";
import Lights from "./Light";

const Wheel = lazy(() => import('./Wheel'));
const Particles = lazy(() => import('./Particles'));

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <span className="loader">{progress}</span>
    </Html>
  );
}

function CanvasRender() {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const pointerPos = isMobile ? [0, -1.05, 0.9] : [0, -1.3, 0.9];
  const transitions = useTransition(true, null, {
    initial: {
      position: [-0.5, 4, -4],
      rotation: [-1, 0, 30],
    },
    enter: {
      delay: 300,
      position: [0, 0, 0],
      rotation: [0.2, -0.4, 0],
    },
    config: { mass: 5, tension: 500, friction: 100 },
  });

  return (
    <Canvas
      gl={{ alpha: false }}
      onCreated={({ gl }) => gl.setClearColor("#FF4A89")}
      pixelRatio={Math.min(2, isMobile ? window.devicePixelRatio : 1)}
    >
      <Camera position={[0, 0, 3]} near={0.1} far={440} />
      <Effects />
      <Lights />
      {/* <Stats
        showPanel={0} // Start-up panel (default=0)
        className="stats" // Optional className to add to the stats container dom element
      /> */}
      <Suspense fallback={<Loader />}>
        {transitions.map(({ props, key }) => (
          <a.group
            key={key}
            rotation={props.rotation}
            position={props.position}
          >
            <Wheel />
          </a.group>
        ))}
        <Pointer position={pointerPos} rotation={[-0.5, 1.4, -0.5]} />
        {!isMobile && <Suspense fallback={null}><Particles count={800} /></Suspense>}
      </Suspense>
    </Canvas>
  );
}

export default CanvasRender;
