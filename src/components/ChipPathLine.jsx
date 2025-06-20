import React, { useRef } from "react";
import { CatmullRomCurve3, Vector3 } from "three";
import { useFrame } from "@react-three/fiber";

const ChipPathLine = ({ points, color = "#00ffff", glow = 1 }) => {
  const lineRef = useRef();

  // Create the curve
  const curve = new CatmullRomCurve3(points.map((p) => new Vector3(...p)));

  useFrame((state, delta) => {
    if (lineRef.current) {
      // Animate dash offset for flow
      lineRef.current.material.dashOffset -= delta * 0.5;
    }
  });

  return (
    <mesh ref={lineRef}>
      <tubeGeometry args={[curve, 100, 0.02, 8, false]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={glow}
        transparent
        opacity={1}
      />
    </mesh>
  );
};

export default ChipPathLine;
