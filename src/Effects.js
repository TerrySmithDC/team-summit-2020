import React from "react";
import {
  EffectComposer,
  DepthOfField,
  Noise,
  Vignette,
} from "@react-three/postprocessing";

export default function Effects() {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  return (
    <EffectComposer>
      {!isMobile && (
        <DepthOfField
          focusDistance={0}
          focalLength={0.02}
          bokehScale={2}
          height={480}
        />
      )}
      <Noise opacity={0.02} />
      <Vignette eskil={false} offset={0.1} darkness={0.8} />
    </EffectComposer>
  );
}
