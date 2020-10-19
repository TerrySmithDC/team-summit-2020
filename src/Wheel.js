import React from "react";
import { useSpring, a, config } from "react-spring/three";
import { useDrag } from "react-use-gesture";
import { Math } from "three";
import { useTexture } from "@react-three/drei/useTexture";

import wheelTexture from "./wheelTexture.jpg";

const meshRotX = Math.degToRad(85);

function Wheel(props) {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const { ...meshprops } = props;
  const texture = useTexture(wheelTexture);
  const [spring, setSpring] = useSpring(() => ({
    from: {
      rotation: [meshRotX, Math.degToRad(90), 0],
    },
    config: config.molasses,
  }));

  const scale = isMobile ? [0.75, 0.75, 0.75] : [1, 1, 1];

  const bind = useDrag(
    ({ velocity, movement: [x], initial: [_, ty] }) => {
      let rotation;
      if (ty < window.innerHeight / 2) {
        rotation = Math.degToRad(velocity * x * -1);
      } else {
        rotation = Math.degToRad(velocity * x);
      }

      // if xy starts above half width or hight reverse so wheel spins in the correct direction
      setSpring(() => {
        return {
          rotation: [meshRotX, rotation, 0],
        };
      });
    },
    { domTarget: window }
  );

  return (
    <a.mesh {...bind()} rotation={spring.rotation} {...meshprops} scale={scale}>
      <cylinderBufferGeometry attach="geometry" args={[1, 1, 1, 16]} />
      <meshStandardMaterial
        attach="material"
        map={texture}
        roughnessMap={texture}
        roughness="0.1"
      />
    </a.mesh>
  );
}

export default Wheel;
