import React from "react";

const CircuitNode = ({ position }) => {
  return (
    <mesh position={position}>
      <sphereGeometry args={[0.03, 8, 8]} />
      <meshStandardMaterial
        color="#00C4FF"
        emissive="#00C4FF"
        emissiveIntensity={1.5}
        transparent
        opacity={0.8}
      />
    </mesh>
  );
};

export default CircuitNode;