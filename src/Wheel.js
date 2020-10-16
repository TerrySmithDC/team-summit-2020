import React from "react";
import { useSpring, a, config } from "react-spring/three";
import { useDrag } from "react-use-gesture";
import { useLoader } from "react-three-fiber";
import * as THREE from "three";

const meshRotX = THREE.Math.degToRad(85);

function Wheel(props) {
  const { src, ...meshprops } = props;
  const texture = useLoader(THREE.TextureLoader, src);
  const [spring, setSpring] = useSpring(() => ({
    from: {
      rotation: [meshRotX, THREE.Math.degToRad(90), 0],
    },
    config: config.molasses,
  }));

  const bind = useDrag(
    ({ velocity, initial, distance }) => {
      const [tx, ty] = initial;

      let rotation;
      let xmod = 1;
      let ymod = 1;

      if (tx > window.innerWidth / 2) {
        xmod = -1;
      }
      if (ty < window.innerHeight / 2) {
        ymod = -1;
      }

      if (xmod && ymod) {
        rotation = THREE.Math.degToRad(distance * velocity);
      } else if (ymod && !xmod) {
        rotation = THREE.Math.degToRad(distance * velocity);
      } else if (!ymod && xmod) {
        rotation = THREE.Math.degToRad(distance * velocity);
      } else {
        rotation = THREE.Math.degToRad(-distance * velocity);
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
      <meshStandardMaterial attach="material" map={texture} />
    </a.mesh>
  );
}

export default Wheel;
