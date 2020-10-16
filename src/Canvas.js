import React, { Suspense } from "react";
import { Canvas } from "react-three-fiber";
import {
  EffectComposer,
  DepthOfField,
  Noise,
  Vignette,
} from "@react-three/postprocessing";
import Wheel from "./Wheel";
import Pointer from "./Pointer";
import Camera from "./Camera";
import wheelimage from "./skin.jpeg";

function CanvasRender() {
  return (
    <Canvas
      gl={{ alpha: false }}
      onCreated={({ gl }) => gl.setClearColor("#FF4A89")}
    >
      <Camera position={[0, 0, 3]} near={0.1} far={440} />
      <EffectComposer>
        <DepthOfField
          focusDistance={0}
          focalLength={0.03}
          bokehScale={2}
          height={480}
        />
        <Noise opacity={0.02} />
        <Vignette eskil={false} offset={0.1} darkness={0.8} />
      </EffectComposer>
      <ambientLight />
      <pointLight position={[150, 150, 150]} intensity={0.55} />
      <group rotation={[0.2, -0.4, 0]}>
        <Suspense fallback={null}>
          <Wheel position={[0, 0, 0]} src={wheelimage} />
        </Suspense>
        <Pointer position={[0.2, -1, 0.9]} rotation={[1.7, 0, 0]} />
      </group>
    </Canvas>
  );
}

export default CanvasRender;
