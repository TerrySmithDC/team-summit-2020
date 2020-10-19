import React from "react";

function Pointer(props) {
  return (
    <mesh {...props}>
      <planeBufferGeometry attach="geometry" args={[0.75, 0.75, 1]} />
      <meshStandardMaterial attach="material" color="#002D4D" />
    </mesh>
  );
}

export default Pointer;
