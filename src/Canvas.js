import React, { Suspense } from "react";
import { Canvas } from "react-three-fiber";
import {
  EffectComposer,
  Noise,
  Vignette,
} from "@react-three/postprocessing";

import { useTransition, a } from "react-spring/three";


import Wheel from "./Wheel";
import Pointer from "./Pointer";
import Camera from "./Camera";
import { KeyLight, FillLight, RimLight } from "./Light"

function CanvasRender() {
  const transitions = useTransition(true, null, {
    initial: {
      position: [-2, 0.4, 0],
      rotation: [-0.5, 0, 5]
    },
    enter: {
      position: [0, 0, 0],
      rotation: [0.2, -0.4, 0]
    }
  });


  return (
    <Canvas
      gl={{ alpha: false }}
      onCreated={({ gl }) => gl.setClearColor("#FF4A89")}
    >
      <Camera position={[0, 0, 3]} near={0.1} far={440} />
      <EffectComposer>
        <Noise opacity={0.02} />
        <Vignette eskil={false} offset={0.1} darkness={0.8} />
      </EffectComposer>
      <KeyLight brightness={5.6} color="#ffbdf4" />
      <FillLight brightness={2.6} color="#bdefff" />
      <RimLight brightness={54} color="#fff" />
      {transitions.map(({  props, key }) => 
        <a.group key={key} rotation={props.rotation}  position={props.position}>
          <Suspense fallback={null}>
            <Wheel position={[0, 0, 0]} />
          </Suspense>
        </a.group>
      )}
      <Pointer position={[0, -1.1, 0.9]} rotation={[-0.5, 1.4, -0.5]} />
    </Canvas>
  );
}

export default CanvasRender;
