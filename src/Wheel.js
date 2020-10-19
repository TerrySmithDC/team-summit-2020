import React from "react";
import { useSpring, a, config } from "react-spring/three";
import { useDrag } from "react-use-gesture";
import { useLoader } from "react-three-fiber";
import { Math, TextureLoader } from "three";

import wheelTexture from "./wheelTexture.jpg";

const meshRotX = Math.degToRad(85);

function Wheel(props) {
  const { ...meshprops } = props;
  const texture = useLoader(TextureLoader, wheelTexture);
  const [spring, setSpring] = useSpring(() => ({
    from: {
      rotation: [meshRotX, Math.degToRad(90), 0],
    },
    config: config.molasses
  }));

  const bind = useDrag(
    ({ velocity, movement: [x], initial: [_, ty] }) => {
      let rotation
      if (ty < window.innerHeight / 2) {	
        rotation = Math.degToRad(velocity * x * -1 );
      } else {
        rotation = Math.degToRad(velocity * x );
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
    <a.mesh {...bind()} rotation={spring.rotation} {...meshprops}>
      <cylinderBufferGeometry attach="geometry" args={[1, 1, 1, 16]} />
        <meshStandardMaterial attach="material" map={texture} roughnessMap={texture}  roughness="0.1" />
    </a.mesh>
  );
}

export default Wheel;
