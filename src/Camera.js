import React, { useRef, useEffect } from "react";

import "./App.css";
import { useThree, useFrame } from "react-three-fiber";

function Camera(props) {
  const ref = useRef();
  const { setDefaultCamera } = useThree();
  // Make the camera known to the system
  useEffect(() => void setDefaultCamera(ref.current));
  // Update it every frame
  useFrame(() => ref.current.updateMatrixWorld());
  return <perspectiveCamera ref={ref} {...props} />;
}

export default Camera;
