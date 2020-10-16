import React from "react";

function Pointer(props) {
  return (
    <mesh {...props}>
      <coneBufferGeometry attach="geometry" args={[0.2, 0.5, 2]} />
      <meshStandardMaterial attach="material" color="#002D4D" />
    </mesh>
  );
}

export default Pointer;
