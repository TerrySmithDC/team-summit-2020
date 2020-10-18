import React from "react";

function Pointer(props) {
  return (
    <mesh {...props} castShadow>
      <planeBufferGeometry attach="geometry" args={[0.5, 0.5, 1]} />
      <meshStandardMaterial attach="material" color="#002D4D" />
    </mesh>
  );
}

export default Pointer;
