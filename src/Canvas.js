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
import { KeyLight, FillLight, RimLight } from "./Light"
import wheelTexture from "./wheelTexture.jpg";

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
      <KeyLight brightness={5.6} color="#ffbdf4" />
      <FillLight brightness={2.6} color="#bdefff" />
      <RimLight brightness={54} color="#fff" />
      {/* <ambientLight /> */}
      {/* <pointLight position={[150, 150, 150]} intensity={0.55} /> */}
      <group rotation={[0.2, -0.4, 0]}>
        <Suspense fallback={null}>
          <Wheel position={[0, 0, 0]} src={wheelTexture} />
        </Suspense>
      </group>
      <Pointer position={[0, -1.1, 0.9]} rotation={[-0.5, 1.25, -0.5]} />
    </Canvas>
  );
}

export default CanvasRender;
